import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import FormData from "form-data";
import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// MongoDB connection string
const uri = process.env.MONGODB_URI as string;
let client: MongoClient | null = null;

// Connect to MongoDB
async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db("uplaoder");
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
  let db;
  try {
    db = await connectToDatabase();
    const body = await req.json();
    const { action, platforms, code, platform } = body;

    if (action === "create_accounts") {
      const redirectUrls = await Promise.all(
        platforms.map(async (platform: string) => {
          return createAccountAndAuthorize(platform);
        })
      );
      return NextResponse.json({ redirectUrls });
    } else if (action === "handle_oauth_callback") {
      const token = await exchangeCodeForToken(code, platform);
      await storeTokenInDatabase(token, platform);
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
          const token = await fetchTokenFromDatabase(platform);
          return uploadToPlatform(videoBuffer, platform, token);
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

// New function to handle account creation and authorization
const createAccountAndAuthorize = async (platform: string) => {
  let authUrl: string;
  const clientId = process.env[`${platform.toUpperCase()}_CLIENT_ID`];
  const redirectUri = `${process.env.APP_URL}/auth/${platform}/callback`;

  switch (platform) {
    case "instagram":
    case "facebook":
      authUrl = `https://www.facebook.com/v14.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=public_profile,email,instagram_basic,instagram_content_publish`;
      break;
    case "twitter":
      authUrl = `https://twitter.com/i/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=tweet.read%20tweet.write%20users.read&response_type=code&code_challenge=challenge&code_challenge_method=plain`;
      break;
    case "youtube":
      authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=https://www.googleapis.com/auth/youtube.upload&response_type=code`;
      break;
    case "linkedin":
      authUrl = `https://www.linkedin.com/oauth/v2/authorization?client_id=${clientId}&redirect_uri=${redirectUri}&scope=r_liteprofile%20w_member_social&response_type=code`;
      break;
    case "pinterest":
      authUrl = `https://www.pinterest.com/oauth/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=boards:read,pins:read,pins:write`;
      break;
    case "reddit":
      authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=random_string&redirect_uri=${redirectUri}&duration=permanent&scope=submit`;
      break;
    default:
      throw new Error("Unsupported platform");
  }

  return { redirectUrl: authUrl };
};

// New function to exchange OAuth code for token
async function exchangeCodeForToken(code: string, platform: string): Promise<string> {
  // Implement the OAuth code exchange logic for each platform
  // This will vary depending on the platform's OAuth flow
  // Return the access token
  return "access_token_for_" + platform;
}

// New function to store token in database
async function storeTokenInDatabase(token: string, platform: string): Promise<void> {
  const db = await connectToDatabase();
  const collection = db.collection("platform_tokens");

  await collection.updateOne(
    { platform: platform },
    { $set: { token: token, updatedAt: new Date() } },
    { upsert: true }
  );
}

// Helper function to fetch tokens from your database
async function fetchTokenFromDatabase(platform: string): Promise<string> {
  const db = await connectToDatabase();
  const collection = db.collection("platform_tokens");

  const result = await collection.findOne({ platform: platform });
  if (result) {
    return result.token;
  } else {
    throw new Error(`No token found for platform: ${platform}`);
  }
}

export async function GET(req: NextRequest) {
  let db;
  try {
    db = await connectToDatabase();
    const collection = db.collection("platform_tokens");

    const connectedPlatforms = await collection.find({}).toArray();
    const platforms = connectedPlatforms.map(doc => doc.platform);

    return NextResponse.json({ platforms });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
