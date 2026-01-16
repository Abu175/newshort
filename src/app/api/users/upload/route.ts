import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import * as PlatformAuth from '@/app/api/users/connected-platforms/platformAuth';
import { connect } from '@/app/dbmongo/route';
import * as fs from 'fs';


// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const platforms = JSON.parse(formData.get('platforms') as string);

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Save the file temporarily
  const path = join('/tmp', file.name);
  await writeFile(path, buffer);

  const db = await connect();

  try {
    const results = await Promise.all(
      platforms.map(async (platform: string) => {
        const token = await PlatformAuth.fetchTokenFromDatabase(db as any, platform);
        const uploadToPlatform = require(`@/app/api/users/connected-platforms/${platform}/uploadToPlatform`);
        return uploadToPlatform(buffer, token);
      })
    );

    return NextResponse.json({ message: 'Video uploaded successfully', results });
  } catch (error) {
    console.error('Error uploading video:', error);
    return NextResponse.json({ error: 'Failed to upload video' }, { status: 500 });
  } finally {
    // Clean up the temporary file
    // Note: In a production environment, you might want to use a more robust cleanup mechanism
    await fs.promises.unlink(path);
  }
}
