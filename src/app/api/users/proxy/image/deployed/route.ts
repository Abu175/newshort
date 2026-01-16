import { NextResponse } from 'next/server';
import { imageCache } from '@/app/api/users/generate/route';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Invalid image ID' }, { status: 400 });
  }

  const originalUrl = imageCache.get(id);

  if (!originalUrl) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }

  try {
    const response = await fetch(originalUrl);
    const arrayBuffer = await response.arrayBuffer();
    const headers = new Headers(response.headers);
    const contentType = response.headers.get('Content-Type');
    headers.set('Content-Type', contentType || 'image/jpeg');

    return new NextResponse(arrayBuffer, { 
      headers,
      status: 200,
    });
  } catch (error) {
    console.error('Error proxying image:', error);
    return NextResponse.json({ error: 'Failed to proxy image' }, { status: 500 });
  }
}

//in this code its not dispalying url 