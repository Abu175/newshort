//api/users/profile

"use client";
import PricingUI from "@/app/pricing/page"; // Import the PricingUI component
import { Bell, Grid, Search, User } from "lucide-react"
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { UserIcon, CodeIcon, ImageIcon, SparklesIcon, HelpCircleIcon, PhoneIcon } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Webllix from "@/app/UI/webllix/page";
import Uploader from "@/app/uploader/page"
const crypto = require('crypto');


const generateSignature = (payload: string, secret: string): string => {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload, 'utf8');
  return hmac.digest('hex');
};



export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const [showProfileCard, setShowProfileCard] = useState(false);
    const [showPricing, setShowPricing] = useState(false); // New state to toggle PricingUI

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout Successfully");
            router.push("/login");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        setData(res.data.data._id);
    };

    const handleCancelSubscription = async () => {
        try {
            // First, get user details
            const userResponse = await axios.get("/api/users/me");
            const userData = userResponse.data.data;
            
            // Prepare the payload
            const payload = {
                event: "subscription_cancelled", // Add this line
                data: {
                    attributes: {
                        checkout: {
                            custom: {
                                user_id: userData._id
                            }
                        }
                    }
                }
            };

            // Generate signature
            const signature = generateSignature(JSON.stringify(payload), 'thechatpdf@786');

            // Now, send cancellation request with user data
            await axios.post("/api/users/cancel", payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Signature': signature,
                },
            });

            toast.success("Subscription cancellation request sent successfully");
        } catch (error: unknown) {
            console.error("Error in cancellation process:", error);
            if (error instanceof Error) {
                toast.error("Error cancelling subscription: " + error.message);
            } else if (typeof error === 'object' && error !== null && 'response' in error) {
                const axiosError = error as { response?: { data?: { error?: string } } };
                toast.error("Error cancelling subscription: " + (axiosError.response?.data?.error || "An unknown error occurred"));
            } else {
                toast.error("Error cancelling subscription: An unknown error occurred");
            }
        }
    };

    return (
        <div className="h-screen w-screen flex">
            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-full w-16 bg-white shadow-lg flex flex-col items-center py-4 space-y-8">
               
             
       
                   
                   
            </div>

            {/* Main content */}
            <div className="flex-1 ml-16">
                {/* Webllix background */}
                <Uploader />

                {/* Navigation Bar */}
                <nav className="fixed top-0 left-16 right-0 z-10 bg-white p-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <Image src="/logo.png" alt="Logo" width={80} height={80} />
                        <span className="ml-2 text-black text-2xl font-semibold">Weblike</span>
                    </div>
                   
                    <div className="flex items-center space-x-4">
                        
                        <button
                            onClick={() => setShowProfileCard(!showProfileCard)}
                            className="flex items-center justify-center w-12 h-12 bg-black hover:bg-lime-800 text-white rounded-full"
                        >
                            <UserIcon className="w-6 h-6" />
                     
                        </button>
                    
                    </div>
                    
                </nav>
    
              

                {/* Profile Card */}
                {showProfileCard && (
                    <div className="fixed top-20 right-4 z-20">
                        <Card className="w-[300px] sm:w-[350px]">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl">User Details</CardTitle>
                                <CardDescription>
                                    {data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid gap-2">
                                    <Button onClick={getUserDetails}>Get User Details</Button>
                                    <Button variant="outline" onClick={logout}>
                                        Logout
                                    </Button>
                                    <Button
                                        variant="default"
                                        onClick={() => setShowPricing(!showPricing)}
                                    >
                                         Pricing
                                    </Button>
                                    <Button
                                        variant="default"
                                        onClick={handleCancelSubscription}
                                    >
                                        Cancel Subscription
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
                 

                {/* Pricing UI */}
                {showPricing && (
                    <div className="fixed inset-0 z-30 bg-black bg-opacity-70 flex items-center justify-center">
                        <div className="relative bg-white p-8 rounded-lg w-full max-w-4xl">
                            <Button
                                className="absolute top-4 right-4 text-red-500"
                                onClick={() => setShowPricing(false)}
                            >
                                Close
                            </Button>
                            <PricingUI />
                        </div>
              

                    </div>
                )}

                {/* Main Content with Padding */}
          
            </div>
        </div>

    );
}
