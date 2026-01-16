"use client";
import PricingUI from "@/app/pricing/page"; // Import the PricingUI component

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { UserIcon, CodeIcon } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Webllix from "../UI/webllix/page";

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

            // Send cancellation request to your backend
            const response = await axios.post("/api/users/cancel-subscription", {
                userId: userData._id,
                userEmail: userData.email,
            });

            if (response.data.success) {
                toast.success("Subscription cancelled successfully");
                // Optionally, update local state or refresh user data
                getUserDetails();
            } else {
                toast.error("Failed to cancel subscription: " + response.data.message);
            }
        } catch (error: any) {
            console.error("Error in cancellation process:", error);
            toast.error("Error cancelling subscription: " + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            {/* Webllix background */}
            <Webllix />

            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 w-full z-10 bg-gray-800 p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <Image src="/logo.png" alt="Logo" width={80} height={80} />
                    <span className="ml-2 text-white text-2xl font-semibold">WᴇʙʟLIx</span>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        className="flex items-center space-x-2 text-white"
                        title="Upcoming Code Editor"
                    >
                        <CodeIcon className="w-6 h-6" />
                        <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300">
                            Code Editor
                        </button>
                        coming soon ..
                    </button>
                    <button
                        onClick={() => setShowProfileCard(!showProfileCard)}
                        className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
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
                                    Adjust Pricing
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
            <div className="pt-[100px] px-4 bg-gray-900">
                {/* Your main content goes here */}
            </div>
        </div>
    );
}
