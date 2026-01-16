import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import FormData from "form-data";
import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/app/dbmongo/route';
import { Db, MongoClient as MongoDbClient } from 'mongodb';
import * as PlatformAuth from '@/app/api/users/connected-platforms/platformAuth';

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

const uploadToPlatform = async (videoBuffer: Buffer, platform: string, token: string) => {
  let apiUrl: string;
  const formData = new FormData();

  switch (platform) {
    case "instagram":
      apiUrl = `https://graph.facebook.com/v14.0/{user_id}/media`; // Update with your endpoint
      formData.append("file", videoBuffer, { filename: "video.mp4" });
      formData.append("access_token", token);
      break;

    case "facebook":
      apiUrl = `https://graph.facebook.com/{page_id}/videos`; // Update with your endpoint
      formData.append("file", videoBuffer, { filename: "video.mp4" });
      formData.append("access_token", token);
      break;

    case "twitter":
      apiUrl = `https://upload.twitter.com/1.1/media/upload.json`;
      formData.append("media", videoBuffer);
      break;

    case "youtube":
      apiUrl = `https://www.googleapis.com/upload/youtube/v3/videos`;
      formData.append("video", videoBuffer, { filename: "video.mp4" });
      break;

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

  if (platform === "pinterest") {
    // Pinterest requires a two-step process: upload media, then create pin
    
    // Step 1: Upload media
    const mediaUploadUrl = 'https://api.pinterest.com/v5/media';
    const mediaFormData = new FormData();
    mediaFormData.append('media_type', 'video');
    mediaFormData.append('video', videoBuffer, 'video.mp4');

    const mediaResponse = await axios.post(mediaUploadUrl, mediaFormData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        ...mediaFormData.getHeaders()
      }
    });

    const mediaId = mediaResponse.data.media_id;

    // Step 2: Create pin with the uploaded media
    const createPinUrl = 'https://api.pinterest.com/v5/pins';
    const pinData = {
      media_source: {
        source_type: "video_id",
        video_id: mediaId
      },
      board_id: "YOUR_BOARD_ID", // You'll need to get this from the user or your database
      title: "Video from My App",
      description: "This video was uploaded via My App"
    };

    const pinResponse = await axios.post(createPinUrl, pinData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return pinResponse.data;
  }

  // Upload video to the specified platform
  const response = await axios.post(apiUrl, formData, {
    headers: { ...formData.getHeaders(), Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export async function POST(req: NextRequest) {
  try {
    const db = await getDatabase();
    const body = await req.json();
    const { action, platforms, code, platform } = body;

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
      const formData = await req.formData();
      const video = formData.get('video') as File;
      const selectedPlatforms = JSON.parse(formData.get('platforms') as string);

      if (!video || !selectedPlatforms) {
        return NextResponse.json({ message: "Video and platforms are required." }, { status: 400 });
      }

      const videoBuffer = Buffer.from(await video.arrayBuffer());

      const results = await Promise.all(
        selectedPlatforms.map(async (platform: string) => {
          const token = await PlatformAuth.fetchTokenFromDatabase(db, platform);
          return uploadToPlatform(videoBuffer, platform, token.accessToken);
        })
      );

      return NextResponse.json({ message: "Video uploaded successfully", results });
    } else {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
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



///for pintrest