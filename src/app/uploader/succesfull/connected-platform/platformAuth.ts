import axios from 'axios';
import { Db } from 'mongodb';
import { google } from 'googleapis';

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
    case 'youtube':
      return exchangeYouTubeCode(code);
    case 'reddit':
      return exchangeRedditCode(code);
    case 'pinterest':
      return exchangePinterestCode(code);
    case 'twitter':
      return exchangeTwitterCode(code);
    case 'linkedin':
      return exchangeLinkedInCode(code);
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

const YOUTUBE_REDIRECT_URI = 'http://localhost:3000/api/users/auth/youtube/callback';

export async function createAccountAndAuthorize(platform: string): Promise<{ redirectUrl: string }> {
  const clientId = process.env[`${platform.toUpperCase()}_CLIENT_ID`];
  const redirectUri = `${process.env.APP_URL}/api/users/auth/youtube${platform}/callback`;

  switch (platform) {
    case "instagram":
      const instagramClientId = process.env.INSTAGRAM_CLIENT_ID;
      const instagramRedirectUri = `${process.env.APP_URL}/api/users/auth/instagram/callback`;
      return {
        redirectUrl: `https://api.instagram.com/oauth/authorize?client_id=${instagramClientId}&redirect_uri=${instagramRedirectUri}&scope=user_profile,user_media&response_type=code`
      };
    case "youtube":
      const oauth2Client = new google.auth.OAuth2(
        process.env.YOUTUBE_CLIENT_ID,
        process.env.YOUTUBE_CLIENT_SECRET,
        YOUTUBE_REDIRECT_URI
      );

      const scopes = [
        'https://www.googleapis.com/auth/youtube.upload',
        'https://www.googleapis.com/auth/youtube'
      ];

      const authorizationUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        include_granted_scopes: true
      });

      return { redirectUrl: authorizationUrl };
    case "reddit":
      return {
        redirectUrl: `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=randomstring&redirect_uri=${redirectUri}&duration=permanent&scope=submit`
      };
    case "pinterest":
      return {
        redirectUrl: `https://www.pinterest.com/oauth/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=boards:read,pins:read,pins:write`
      };
    case "twitter":
      return {
        redirectUrl: `https://twitter.com/i/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=tweet.read%20tweet.write%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`
      };
    case "linkedin":
      return {
        redirectUrl: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=foobar&scope=r_liteprofile%20w_member_social`
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
  // Placeholder for Instagram-specific code exchange implementation
  return { accessToken: "instagram_access_token", refreshToken: "instagram_refresh_token" };
}


async function exchangeRedditCode(code: string): Promise<PlatformTokenData> {
  // Placeholder for Reddit-specific code exchange implementation
  return { accessToken: "reddit_access_token", refreshToken: "reddit_refresh_token" };
}

async function exchangePinterestCode(code: string): Promise<PlatformTokenData> {
  // Placeholder for Pinterest-specific code exchange implementation
  return { accessToken: "pinterest_access_token", refreshToken: "pinterest_refresh_token" };
  // Implement Pinterest-specific code exchange
}

async function exchangeTwitterCode(code: string): Promise<PlatformTokenData> {
  // Placeholder for Twitter-specific code exchange implementation
  return { accessToken: "twitter_access_token", refreshToken: "twitter_refresh_token" };
}

async function exchangeLinkedInCode(code: string): Promise<PlatformTokenData> {
  // Placeholder for LinkedIn-specific code exchange implementation
  return { accessToken: "linkedin_access_token", refreshToken: "linkedin_refresh_token" };
  // Implement LinkedIn-specific code exchange
}

async function exchangeFacebookCode(code: string): Promise<PlatformTokenData> {
  // Placeholder for Facebook-specific code exchange implementation
  return { accessToken: "facebook_access_token", refreshToken: "facebook_refresh_token" };
}

export async function exchangeYouTubeCode(code: string): Promise<PlatformTokenData> {
  const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    YOUTUBE_REDIRECT_URI
  );

  try {
    const { tokens } = await oauth2Client.getToken({
      code: code,
      redirect_uri: YOUTUBE_REDIRECT_URI
    });

    return {
      accessToken: tokens.access_token!,
      refreshToken: tokens.refresh_token!,
      expiresAt: new Date(Date.now() + (tokens.expiry_date || 0)),
      platform: 'youtube'
    };
  } catch (error) {
    console.error('Error exchanging YouTube code:', error);
    throw error;
  }
}
//in this file i have uploaded video and it worked