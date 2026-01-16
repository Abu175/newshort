'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from 'next/navigation';

type Platform = "instagram" | "facebook" | "twitter" | "youtube" | "linkedin" | "pinterest" | "reddit";

const VideoUpload: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [connectedPlatforms, setConnectedPlatforms] = useState<Platform[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await fetch("/api/users/me");
        const data = await res.json();
        setUserId(data.data._id);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getUserDetails();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchConnectedPlatforms();
      handleOAuthCallback();
    }
  }, [userId]);

  const fetchConnectedPlatforms = async () => {
    try {
      const response = await axios.get(`/api/users/connected-platforms?userId=${userId}`);
      setConnectedPlatforms(response.data.platforms);
    } catch (error) {
      console.error("Failed to fetch connected platforms", error);
    }
  };

  const handleOAuthCallback = async () => {
    const code = searchParams.get('code');
    const platform = searchParams.get('platform');
    if (code && platform && userId) {
      try {
        await axios.post("/api/users/connected-platforms", {
          action: "handle_oauth_callback",
          code,
          platform,
          userId
        });
        setMessage(`Successfully connected to ${platform}`);
        fetchConnectedPlatforms();
        router.push('/uploader'); // Remove query params from URL
      } catch (error) {
        setMessage(`Failed to connect to ${platform}. Please try again.`);
      }
    }
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setVideo(event.target.files[0]);
    }
  };

  const handlePlatformChange = (platform: Platform) => {
    setSelectedPlatforms((prevPlatforms) =>
      prevPlatforms.includes(platform)
        ? prevPlatforms.filter((p) => p !== platform)
        : [...prevPlatforms, platform]
    );
  };

  const handleConnect = async (platform: Platform, event: React.MouseEvent) => {
    event.stopPropagation();
    if (!userId) {
      setMessage("Please log in to connect platforms.");
      return;
    }
    try {
      const response = await axios.post("/api/users/connected-platforms", {
        action: "create_accounts",
        platforms: [platform],
        userId
      });
      window.location.href = response.data.redirectUrls[0].redirectUrl;
    } catch (error) {
      setMessage(`Failed to connect to ${platform}. Please try again.`);
    }
  };

  const handleUpload = async () => {
    if (!userId) {
      setMessage("Please log in to upload videos.");
      return;
    }
    if (!video) {
      setMessage("Please select a video file.");
      return;
    }
    if (selectedPlatforms.length === 0) {
      setMessage("Please select at least one platform to upload to.");
      return;
    }

    setUploading(true);
    setMessage("Uploading video...");

    const formData = new FormData();
    formData.append("video", video);
    formData.append("platforms", JSON.stringify(selectedPlatforms));
    formData.append("action", "upload_video");

    try {
      const response = await axios.post("/api/users/connected-platforms", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log('Upload response:', response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error uploading video:', error);
      setMessage("Failed to upload video. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '2rem' }}>Upload Your Video</h1>
      
      {userId ? (
        <>
          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="videoUpload" style={{
              display: 'block',
              width: '100%',
              padding: '1rem',
              textAlign: 'center',
              backgroundColor: '#f0f0f0',
              border: '2px dashed #ccc',
              borderRadius: '8px',
              cursor: 'pointer',
            }}>
              {video ? video.name : 'Choose a video file'}
              <input
                id="videoUpload"
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          <div>
            <h2 style={{ marginBottom: '1rem', color: '#555' }}>Select Platforms</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '1rem',
            }}>
              {["instagram", "facebook", "twitter", "youtube", "linkedin", "pinterest", "reddit"].map((platform) => (
                <div key={platform} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}>
                  <img src={`/icons/${platform}.svg`} alt={platform} style={{ width: '48px', height: '48px', marginBottom: '0.5rem' }} />
                  <span style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>{platform}</span>
                  {connectedPlatforms.includes(platform as Platform) ? (
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={selectedPlatforms.includes(platform as Platform)}
                        onChange={() => handlePlatformChange(platform as Platform)}
                        style={{ marginRight: '0.5rem' }}
                      />
                      Select
                    </label>
                  ) : (
                    <button 
                      onClick={(e) => handleConnect(platform as Platform, e)}
                      style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Connect
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handleUpload} 
            disabled={uploading}
            style={{
              display: 'block',
              width: '100%',
              padding: '1rem',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              marginTop: '2rem',
            }}
          >
            {uploading ? "Uploading..." : "Upload Video"}
          </button>
        </>
      ) : (
        <p style={{ textAlign: 'center', color: '#333' }}>Please log in to upload videos.</p>
      )}

      {message && <p style={{ marginTop: '1rem', textAlign: 'center', color: '#333' }}>{message}</p>}
    </div>
  );
};

export default VideoUpload;
//in this file i have uploaded video and it worked