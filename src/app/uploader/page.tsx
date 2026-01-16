'use client'
import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useRouter, useSearchParams } from 'next/navigation';
import Instagramandfacebook from "@/app/uploader/instagramandfacebook/page"
import Sidebar from './components/sidebar'

import { Bell, Plus, Search, Share2, BarChart2, Users, FileText } from 'lucide-react'

type Platform = "instagram" | "facebook" | "twitter" | "youtube" | "linkedin" | "pinterest" | "reddit";

export default function Component() {
  const [posts, setPosts] = useState<Array<{
    title: string;
    video: string;
    status: string;
    views: string;
    engagement: string;
  }>>([]);

  const [userId, setUserId] = useState<string | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [connectedPlatforms, setConnectedPlatforms] = useState<Platform[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoPrivacy, setVideoPrivacy] = useState('private');

  const router = useRouter();
  const searchParams = useSearchParams();

  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await fetch("/api/users/me");
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUserId(data.data._id);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setConnectionError(true);
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
      // Don't set connection error here necessarily, as it might just be empty
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
        router.push('/dashboard'); // Remove query params from URL
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
    if (!userId || !video || selectedPlatforms.length === 0) {
      setMessage("Please ensure you're logged in, a video is selected, and at least one platform is chosen.");
      return;
    }

    setUploading(true);
    setMessage("Uploading video...");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("video", video);
    formData.append("platforms", JSON.stringify(selectedPlatforms));
    formData.append("action", "upload_video");
    formData.append("title", videoTitle);
    formData.append("description", videoDescription);
    formData.append("privacy", videoPrivacy);

    try {
      const response = await axios.post("/api/users/connected-platforms", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        },
      });

      console.log('Upload response:', response.data);
      setMessage(response.data.message);

      if (response.data.success) {
        const newPost = {
          title: videoTitle,
          video: video.name,
          status: videoPrivacy,
          views: '0',
          engagement: '0%'
        };
        setPosts(prevPosts => [newPost, ...prevPosts]);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          setMessage("Authentication failed. Please log out and log in again.");
        } else {
          setMessage(`Upload failed: ${error.response.data.message || 'Unknown error'}`);
        }
      } else {
        setMessage("Failed to upload video. Please try again.");
      }
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input type="text" placeholder="Search..." className="pl-8 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
            </div>
            <Bell className="text-gray-400 hover:text-gray-600 cursor-pointer" />
            <button className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300">
              <Plus size={20} />
            </button>
          </div>
        </header>

        {connectionError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 m-8 mb-0">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  <strong className="font-medium">Database Connection Error:</strong> We couldn't connect to the server. This is likely because your IP address is not whitelisted in MongoDB Atlas.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Posts" value="42" icon={<FileText size={24} className="text-blue-500" />} />
            <StatCard title="Total Authors" value="12" icon={<Users size={24} className="text-green-500" />} />
            <StatCard title="Total Views" value="15,234" icon={<BarChart2 size={24} className="text-purple-500" />} />
            <StatCard title="Engagement Rate" value="8.7%" icon={<Share2 size={24} className="text-orange-500" />} />
          </div>

          {/* Video Upload Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Upload Video</h2>
            </div>
            <div className="p-4">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="mb-4"
              />
              <input
                type="text"
                placeholder="Video Title"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="mb-4 w-full p-2 border rounded"
              />
              <textarea
                placeholder="Video Description"
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
                className="mb-4 w-full p-2 border rounded"
              />
              <select
                value={videoPrivacy}
                onChange={(e) => setVideoPrivacy(e.target.value)}
                className="mb-4 w-full p-2 border rounded"
              >
                <option value="private">Private</option>
                <option value="public">Public</option>
                <option value="unlisted">Unlisted</option>
              </select>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                {["instagram", "facebook", "twitter", "youtube", "linkedin", "pinterest", "reddit"].map((platform) => (
                  <div key={platform} className="flex flex-col items-center p-2 border rounded">
                    <img src={`/icons/${platform}.svg`} alt={platform} className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium mb-2">{platform}</span>
                    {connectedPlatforms.includes(platform as Platform) ? (
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedPlatforms.includes(platform as Platform)}
                          onChange={() => handlePlatformChange(platform as Platform)}
                          className="mr-2"
                        />
                        <span className="text-xs">Select</span>
                      </label>
                    ) : (
                      <button
                        onClick={(e) => handleConnect(platform as Platform, e)}
                        className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Connect
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
              >
                {uploading ? "Uploading..." : "Upload Video"}
              </button>
              {uploading && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-center mt-2">{uploadProgress.toFixed(2)}% Uploaded</p>
                </div>
              )}
              {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
            </div>
          </div>

          {/* Recent Posts Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Recent Posts</h2>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:shadow-md transition-all duration-300 flex items-center space-x-2">
                <Plus size={20} />
                <span>New Post</span>
              </button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Title</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Video</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Views</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Engagement</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={index} className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                    <td className="p-4 flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-md flex items-center justify-center">
                        <FileText size={20} className="text-blue-500" />
                      </div>
                      <span className="font-medium text-gray-800">{post.title}</span>
                    </td>
                    <td className="p-4 text-gray-600">{post.video}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${post.status === 'Public' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{post.views}</td>
                    <td className="p-4 text-gray-600">{post.engagement}</td>
                    <td className="p-4">
                      <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}



interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  )
}

