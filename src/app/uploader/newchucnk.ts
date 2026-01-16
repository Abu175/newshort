case "youtube":
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: token.accessToken });

  const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

  const fileMetadata = {
    snippet: {
      title: 'Video uploaded via My App',
      description: 'This video was uploaded through My App',
    },
    status: {
      privacyStatus: 'private', // or 'public', 'unlisted'
    },
  };

  // Create a readable stream from the buffer
  const readableStream = new Readable();
  readableStream.push(videoBuffer);
  readableStream.push(null);

  try {
    const res = await youtube.videos.insert(
      {
        part: ['snippet', 'status'],
        requestBody: fileMetadata,
        media: {
          body: readableStream,
        },
      },
      {
        // Use chunked uploading
        onUploadProgress: (evt) => {
          const progress = (evt.bytesRead / videoBuffer.length) * 100;
          console.log(`${progress.toFixed(2)}% complete`);
        },
      }
    );

    console.log('YouTube upload response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error uploading video to YouTube:', error);
    throw error;
  }

  ///this for large file uplaoded 