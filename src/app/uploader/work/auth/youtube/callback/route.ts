import { NextRequest, NextResponse } from 'next/server';
import * as PlatformAuth from '@/app/api/users/connected-platforms/platformAuth';
import { connect } from '@/app/dbmongo/route';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const tokenData = await PlatformAuth.exchangeYouTubeCode(code);
    
    const client = await connect();
    const db = client.db("uplaoder");
    await PlatformAuth.storeTokenInDatabase(db, tokenData, 'youtube');

    // Redirect to the profile page
    return NextResponse.redirect(new URL('/profile', request.url));
  } catch (error) {
    console.error('Error in YouTube OAuth callback:', error);
    return NextResponse.json({ error: 'Failed to authenticate with YouTube' }, { status: 500 });
  }
}