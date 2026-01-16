import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import FormData from "form-data";
import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/app/dbmongo/route';
import { Db, MongoClient as MongoDbClient } from 'mongodb';
import * as PlatformAuth from './platformAuth';
import { Readable } from 'stream';

// MongoDB connection string
const uri = process.env.MONGODB_URI as string;
let client: MongoClient | null = null;
let db: Db | null = null;

// Connect to MongoDB
async function getDatabase() {
  if (!client) {
    client = await connect();
  }
  if (!db) {
    db = client.db("uplaoder"); // Make sure this is the correct database name
  }
  return db;
}

import { google } from 'googleapis';

async function uploadToPlatform(videoBuffer: Buffer, platform: string, token: PlatformAuth.PlatformTokenData, title: string, description: string, privacy: string) {
  switch (platform) {
    case "instagram":
      return uploadToInstagram(videoBuffer, token, title, description);
    case "facebook":
      return uploadToFacebook(videoBuffer, token, title, description, privacy);
    case "youtube":
      return uploadToYouTube(videoBuffer, token, title, description, privacy);
    // ... (keep other platform cases)
    default:
      throw new Error("Unsupported platform");
  }
}

async function uploadToInstagram(videoBuffer: Buffer, token: PlatformAuth.PlatformTokenData, caption: string, description: string) {
  try {
    // Get user ID
    const userResponse = await axios.get(`https://graph.instagram.com/v18.0/me?fields=id&access_token=${token.accessToken}`);
    const userId = userResponse.data.id;

    // Step 1: Create container
    const createContainerResponse = await axios.post(
      `https://graph.facebook.com/v18.0/${userId}/media`,
      {
        media_type: 'VIDEO',
        video_url: 'PENDING',
        caption: `${caption}\n\n${description}`,
      },
      {
        headers: { Authorization: `Bearer ${token.accessToken}` },
      }
    );

    const containerId = createContainerResponse.data.id;

    // Step 2: Upload video
    const formData = new FormData();
    formData.append('video_file', videoBuffer, { filename: 'video.mp4' });

    await axios.post(
      `https://graph.facebook.com/v18.0/${containerId}`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${token.accessToken}`,
        },
      }
    );

    // Step 3: Publish container
    const publishResponse = await axios.post(
      `https://graph.facebook.com/v18.0/${userId}/media_publish`,
      { creation_id: containerId },
      {
        headers: { Authorization: `Bearer ${token.accessToken}` },
      }
    );

    return publishResponse.data;
  } catch (error) {
    console.error('Error uploading to Instagram:', error);
    throw error;
  }
}

async function uploadToFacebook(videoBuffer: Buffer, token: PlatformAuth.PlatformTokenData, title: string, description: string, privacy: string) {
  const formData = new FormData();
  formData.append('source', videoBuffer, { filename: 'video.mp4' });
  formData.append('title', title);
  formData.append('description', description);
  formData.append('privacy', JSON.stringify({ value: privacy.toLowerCase() }));

  const response = await axios.post(
    `https://graph.facebook.com/v12.0/me/videos`,
    formData,
    {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${token.accessToken}`,
      },
    }
  );

  return response.data;
}

async function uploadToYouTube(videoBuffer: Buffer, token: PlatformAuth.PlatformTokenData, title: string, description: string, privacy: string) {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: token.accessToken });

  const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

  const fileMetadata = {
    snippet: {
      title: title,
      description: description,
    },
    status: {
      privacyStatus: privacy,
    },
  };

  const readableStream = new Readable();
  readableStream.push(videoBuffer);
  readableStream.push(null);

  try {
    const response = await youtube.videos.insert({
      part: ['snippet', 'status'],
      requestBody: fileMetadata,
      media: {
        body: readableStream,
      },
    });

    console.log('YouTube upload response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading video to YouTube:', error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = await getDatabase();
    let action, platforms, code, platform, video, title, description, privacy;

    const contentType = req.headers.get("content-type");
    if (contentType && contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      action = formData.get('action') as string;
      platforms = formData.get('platforms') ? JSON.parse(formData.get('platforms') as string) : undefined;
      code = formData.get('code') as string;
      platform = formData.get('platform') as string;
      video = formData.get('video') as File;
      title = formData.get('title') as string;
      description = formData.get('description') as string;
      privacy = formData.get('privacy') as string;
    } else {
      const body = await req.json();
      ({ action, platforms, code, platform, title, description, privacy } = body);
    }

    if (action === "create_accounts") {
      const redirectUrls = await Promise.all(
        platforms.map(async (platform: string) => {
          return PlatformAuth.createAccountAndAuthorize(platform);
        })
      );
      return NextResponse.json({ redirectUrls });
    } else if (action === "handle_oauth_callback") {
      const tokenData = await PlatformAuth.exchangeCodeForToken(code, platform);
      await PlatformAuth.storeTokenInDatabase(db, tokenData, platform);
      return NextResponse.json({ success: true, message: "Account connected successfully" });
    } else if (action === "upload_video") {
      if (!video || !platforms) {
        return NextResponse.json({ message: "Video and platforms are required." }, { status: 400 });
      }

      const videoBuffer = Buffer.from(await video.arrayBuffer());

      const results = await Promise.all(
        platforms.map(async (platform: string) => {
          try {
            const token = await PlatformAuth.fetchTokenFromDatabase(db, platform);
            return await uploadToPlatform(videoBuffer, platform, token, title, description, privacy);
          } catch (error: any) {
            return { platform, error: error.message };
          }
        })
      );

      const successfulUploads = results.filter((result: { error?: string }) => !result.error);
      const failedUploads = results.filter((result: { error?: string }) => result.error);

      let message = "Video upload completed.";
      if (failedUploads.length > 0) {
        message += ` Failed on: ${failedUploads.map((f: { platform: string }) => f.platform).join(', ')}.`;
      }

      return NextResponse.json({ 
        success: successfulUploads.length > 0, 
        message, 
        results: successfulUploads,
        errors: failedUploads
      });
    } else {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error in POST handler:', error);
    return NextResponse.json({ message: "Internal server error", error: error.toString() }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const db = await getDatabase();
    const collection = db.collection("platform_tokens");

    const connectedPlatforms = await collection.find({}).toArray();
    const platforms = connectedPlatforms.map(doc => doc.platform);

    return NextResponse.json({ platforms });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
//this for only facebook and isntggram only 