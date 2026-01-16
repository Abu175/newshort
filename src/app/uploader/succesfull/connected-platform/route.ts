import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import FormData from "form-data";
import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/app/dbmongo/route';
import { Db, MongoClient as MongoDbClient } from 'mongodb';
import * as PlatformAuth from './platformAuth';
import { Readable } from 'stream';
import { google } from 'googleapis';


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

async function uploadToPlatform(videoBuffer: Buffer, platform: string, token: PlatformAuth.PlatformTokenData) {
  console.log(`Uploading to ${platform}`, { tokenInfo: token });

  let apiUrl: string;
  const formData = new FormData();

  switch (platform) {
    case "instagram":
      apiUrl = `https://graph.facebook.com/v14.0/{user_id}/media`; // Update with your endpoint
      formData.append("file", videoBuffer, { filename: "video.mp4" });
      formData.append("access_token", token.accessToken);
      break;

    case "facebook":
      apiUrl = `https://graph.facebook.com/{page_id}/videos`; // Update with your endpoint
      formData.append("file", videoBuffer, { filename: "video.mp4" });
      formData.append("access_token", token.accessToken);
      break;

    case "twitter":
      apiUrl = `https://upload.twitter.com/1.1/media/upload.json`;
      formData.append("media", videoBuffer);
      break;

    case "youtube":
      const oauth2Client = new google.auth.OAuth2();
      oauth2Client.setCredentials({ access_token: token.accessToken });

      const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

      const fileMetadata = {
        snippet: {
          title: 'Video uploaded via My App',
          description: 'This video was uploaded through My App',
        },
        status: {
          privacyStatus: 'private', // or 'public', 'unlisted'
        },
      };

      // Create a readable stream from the buffer
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

    case "linkedin":
      apiUrl = `https://api.linkedin.com/v2/assets?action=registerUpload`;
      formData.append("video", videoBuffer);
      break;

    case "pinterest":
      apiUrl = `https://api.pinterest.com/v5/pins`;
      formData.append("video", videoBuffer);
      break;

    case "reddit":
      apiUrl = `https://oauth.reddit.com/api/submit`;
      formData.append("video", videoBuffer);
      break;

    default:
      throw new Error("Unsupported platform");
  }
  // For platforms other than YouTube
  if (["instagram", "reddit", "pinterest", "twitter", "linkedin", "facebook"].includes(platform)) {
    const response = await axios.post(apiUrl, formData, {
      headers: { ...formData.getHeaders(), Authorization: `Bearer ${token.accessToken}` },
    });
    return response.data;
  }
  }


export async function POST(req: NextRequest) {
  try {
    const db = await getDatabase();
    const formData = await req.formData();
    const action = formData.get('action') as string;

    if (action === "create_accounts") {
      const platforms = JSON.parse(formData.get('platforms') as string);
      const redirectUrls = await Promise.all(
        platforms.map(async (platform: string) => {
          return PlatformAuth.createAccountAndAuthorize(platform);
        })
      );
      return NextResponse.json({ redirectUrls });
    } else if (action === "handle_oauth_callback") {
      const code = formData.get('code') as string;
      const platform = formData.get('platform') as string;
      const tokenData = await PlatformAuth.exchangeCodeForToken(code, platform);
      await PlatformAuth.storeTokenInDatabase(db, tokenData, platform);
      return NextResponse.json({ success: true, message: "Account connected successfully" });
    } else if (action === "upload_video") {
      const video = formData.get('video') as File;
      const selectedPlatforms = JSON.parse(formData.get('platforms') as string);

      if (!video || !selectedPlatforms) {
        return NextResponse.json({ message: "Video and platforms are required." }, { status: 400 });
      }

      const videoBuffer = Buffer.from(await video.arrayBuffer());

      const results = await Promise.all(
        selectedPlatforms.map(async (platform: string) => {
          const token = await PlatformAuth.fetchTokenFromDatabase(db, platform);
          return uploadToPlatform(videoBuffer, platform, token);
        })
      );

      return NextResponse.json({ message: "Video uploaded successfully", results });
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
