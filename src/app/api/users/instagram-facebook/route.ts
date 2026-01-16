import axios from 'axios';
import { Db } from 'mongodb';

export interface PlatformTokenData {
  accessToken: string;
  userId?: string;
  expiresAt?: Date;
  refreshToken?: string;
  platform?: string;
}

export async function exchangeCodeForToken(code: string, platform: string): Promise<PlatformTokenData> {
  switch (platform) {
    case 'instagram':
      return exchangeInstagramCode(code);
    case 'facebook':
      return exchangeFacebookCode(code);
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
}

export async function storeTokenInDatabase(db: Db, tokenData: PlatformTokenData, platform: string): Promise<void> {
  const collection = db.collection("platform_tokens");
  await collection.updateOne(
    { platform: platform },
    { $set: { ...tokenData, updatedAt: new Date() } },
    { upsert: true }
  );
}

export async function fetchTokenFromDatabase(db: Db, platform: string): Promise<PlatformTokenData> {
  const collection = db.collection("platform_tokens");
  const result = await collection.findOne({ platform: platform });
  if (result) {
    return result as unknown as PlatformTokenData;
  } else {
    throw new Error(`No token found for platform: ${platform}`);
  }
}

export async function createAccountAndAuthorize(platform: string): Promise<{ redirectUrl: string }> {
  const clientId = process.env[`${platform.toUpperCase()}_CLIENT_ID`];
  const redirectUri = `${process.env.APP_URL}/api/users/auth/${platform}/callback`;

  switch (platform) {
    case "instagram":
      return {
        redirectUrl: `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`
      };
    case "facebook":
      return {
        redirectUrl: `https://www.facebook.com/v12.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&state=foobar&scope=public_profile,publish_video`
      };
    default:
      throw new Error("Unsupported platform");
  }
}

async function exchangeInstagramCode(code: string): Promise<PlatformTokenData> {
  const clientId = process.env.INSTAGRAM_CLIENT_ID;
  const clientSecret = process.env.INSTAGRAM_CLIENT_SECRET;
  const redirectUri = `${process.env.APP_URL}/api/users/auth/instagram/callback`;

  try {
    const response = await axios.post('https://api.instagram.com/oauth/access_token', 
      new URLSearchParams({
        client_id: clientId!,
        client_secret: clientSecret!,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        code: code
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    // Get long-lived token
    const longLivedTokenResponse = await axios.get('https://graph.instagram.com/access_token', {
      params: {
        grant_type: 'ig_exchange_token',
        client_secret: clientSecret,
        access_token: response.data.access_token
      }
    });

    return {
      accessToken: longLivedTokenResponse.data.access_token,
      userId: response.data.user_id,
      platform: 'instagram'
    };
  } catch (error) {
    console.error('Error exchanging Instagram code:', error);
    throw error;
  }
}

async function exchangeFacebookCode(code: string): Promise<PlatformTokenData> {
  const clientId = process.env.FACEBOOK_CLIENT_ID;
  const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;
  const redirectUri = `${process.env.APP_URL}/api/users/auth/facebook/callback`;

  const response = await axios.get('https://graph.facebook.com/v12.0/oauth/access_token', {
    params: {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code: code
    }
  });

  return {
    accessToken: response.data.access_token,
    platform: 'facebook'
  };
}

//this for  only faecbook and instagrm 