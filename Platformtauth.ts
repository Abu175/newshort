import axios from 'axios';
import { Db } from 'mongodb';

export interface PlatformTokenData {
  accessToken: string;
  userId?: string;
  expiresAt?: Date;
  refreshToken?: string;
}

export async function exchangeCodeForToken(code: string, platform: string): Promise<PlatformTokenData> {
  if (platform === 'pinterest') {
    const response = await axios.post('https://api.pinterest.com/v5/oauth/token', {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: `${process.env.APP_URL}/auth/pinterest/callback`,
      client_id: process.env.PINTEREST_CLIENT_ID,
      client_secret: process.env.PINTEREST_CLIENT_SECRET
    });

    return {
      accessToken: response.data.access_token,
      expiresAt: new Date(Date.now() + response.data.expires_in * 1000),
      refreshToken: response.data.refresh_token
    };
  }

  // Implement for other platforms...

  throw new Error(`Unsupported platform: ${platform}`);
}

export async function storeTokenInDatabase(db: Db, tokenData: PlatformTokenData, platform: string): Promise<void> {
  const collection = db.collection("platform_tokens");

  await collection.updateOne(
    { platform: platform },
    { 
      $set: { 
        platform: platform,
        accessToken: tokenData.accessToken,
        userId: tokenData.userId,
        expiresAt: tokenData.expiresAt,
        refreshToken: tokenData.refreshToken,
        connectedAt: new Date(),
        updatedAt: new Date()
      }
    },
    { upsert: true }
  );
}

export async function fetchTokenFromDatabase(db: Db, platform: string): Promise<PlatformTokenData> {
  const collection = db.collection("platform_tokens");

  const result = await collection.findOne({ platform: platform });
  if (result) {
    return {
      accessToken: result.accessToken,
      userId: result.userId,
      expiresAt: result.expiresAt,
      refreshToken: result.refreshToken
    };
  } else {
    throw new Error(`No token found for platform: ${platform}`);
  }
}

export async function createAccountAndAuthorize(platform: string): Promise<{ redirectUrl: string }> {
  const clientId = process.env[`${platform.toUpperCase()}_CLIENT_ID`];
  const redirectUri = `${process.env.APP_URL}/auth/${platform}/callback`;

  switch (platform) {
    case "pinterest":
      return {
        redirectUrl: `https://www.pinterest.com/oauth/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=boards:read,pins:read,pins:write`
      };
    // Add cases for other platforms...
    default:
      throw new Error("Unsupported platform");
  }
}