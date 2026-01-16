import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const imageCache = new Map<string, string>();

export async function POST(request: Request) {
  const { url } = await request.json();

  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  const id = uuidv4();
  imageCache.set(id, url);

  return NextResponse.json({ id });
}

export { imageCache };