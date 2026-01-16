import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import FormData from "form-data";
import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/app/dbmongo/route';
import { Db, MongoClient as MongoDbClient } from 'mongodb';
import * as PlatformAuth from '@/app/api/users/connected-platforms/instagram-facebook/PlatformAuth';
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

    

    
  // For platforms other than YouTube
  if (["instagram", "facebook", ].includes(platform)) {
    const response = await axios.post(apiUrl, formData, {
      headers: { ...formData.getHeaders(), Authorization: `Bearer ${token.accessToken}` },
    });
    return response.data;
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
          const token = await PlatformAuth.fetchTokenFromDatabase(db, platform);
          return uploadToPlatform(videoBuffer, platform, token, title, description, privacy);
        })
      );

      return NextResponse.json({ success: true, message: "Video uploaded successfully", results });
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
