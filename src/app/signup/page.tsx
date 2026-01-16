'use client'
import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import Logo from "@/app/UI/logo/page"

export default function SignupPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    })

    const [loading, setLoading] = useState(false)

    const onSignup = async () => {

        try {
            setLoading(true)

            // Use the environment variable for the base URL, handling potential trailing slashes or spaces
            const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "").trim().replace(/\/$/, "");
            const apiUrl = `${baseUrl}/api/users/signup`;

            await axios.post(apiUrl, user)
            toast.success("Signup successful")
            toast("Congratulations! Your Account Setup Is Complete, Log in and Explore", { duration: 10000 })
            router.push("/login")
        } catch (error: any) {
            toast.error(error.message || "Signup failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-wrap flex-col items-center justify-center bg-gray-900 text-gray-100">
            <div className="mb-6 flex flex-col items-center">
                <div className="h-12 w-12 text-gray-200" />
                <Logo />
                <h1 className="text-3xl font-bold text-gray-100">WᴇʙʟLIx</h1>
            </div>
            <Card className="w-[300px] sm:w-[350px] bg-gray-800 text-gray-200 bg-gradient-to-r from-[#315aed] to-[#5d91f1] hover:from-[#000000] hover:to-[#f5f4fb] ">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Signup</CardTitle>
                    <CardDescription>
                        Enter your username, email, and password to Signup
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="username"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            className="bg-gray-700 text-gray-300 placeholder-gray-500"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="bg-gray-700 text-gray-300 placeholder-gray-500"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className="bg-gray-700 text-gray-300 placeholder-gray-500"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <Button
                        className="w-full"
                        disabled={!(user.username.length > 0 && user.email.length > 0 && user.password.length > 0)}
                        onClick={onSignup}
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Signup"}
                    </Button>
                    <Link className="w-full" href='/login'>
                        <Button className="w-full" variant='outline'>
                            Visit Login Page
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
