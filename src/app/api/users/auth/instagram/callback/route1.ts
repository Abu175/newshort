import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { connect } from '@/app/dbmongo/route';
import { Db } from 'mongodb';

let db: Db | null = null;

async function getDatabase() {
  if (!db) {
    const client = await connect();
    db = client.db("uplaoder");
  }
  return db;
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error('Error during Instagram authentication:', error);
      return NextResponse.redirect('/dashboard?error=instagram_auth_failed');
    }

    if (!code) {
      return NextResponse.redirect('/dashboard?error=no_code');
    }

    const tokenData = await exchangeCodeForToken(code);
    const db = await getDatabase();
    await storeTokenInDatabase(db, tokenData);

    return NextResponse.redirect('/dashboard?success=instagram_connected');
  } catch (error) {
    console.error('Error in Instagram callback:', error);
    return NextResponse.redirect('/dashboard?error=instagram_callback_failed');
  }
}

async function exchangeCodeForToken(code: string) {
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

async function storeTokenInDatabase(db: Db, tokenData: any) {
  const collection = db.collection("platform_tokens");
  await collection.updateOne(
    { platform: 'instagram' },
    { $set: { ...tokenData, updatedAt: new Date() } },
    { upsert: true }
  );
}