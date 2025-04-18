'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@radix-ui/react-separator"
import signupImage from "../../../public/assets/signup.jpg"
import Image from "next/image"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)
        
        // Basic validation
        if (!name || !email || !password) {
            setError("All fields are required")
            setIsLoading(false)
            return
        }
        
        if (password !== confirmPassword) {
            setError("Passwords do not match")
            setIsLoading(false)
            return
        }
        
        try {
            const response = await axios.post('/api/auth/signup', {
                name,
                email, 
                password
            })
            
            if (response.data.success) {
                // Redirect to signin page after successful signup
                router.push('/auth/signin')
            }
        } catch (error) {
            console.error("Error during sign up:", error)
            setError(error.response?.data?.error || "Failed to create account")
        } finally {
            setIsLoading(false)
        }
    }
    
    return (
        <div className="min-h-screen w-full flex">
            {/* Left side */}
            <div className="hidden lg:block lg:w-1/2 ">
                <Image className="object-cover h-screen" src={signupImage} alt="Signup Image" />
            </div>
            
            {/* Right side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Sign Up</h1>
                        <p className="text-gray-500">Please fill your information below</p>
                    </div>
                    
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                className="w-full px-3 py-2"
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="E-mail"
                                className="w-full px-3 py-2"
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full px-3 py-2"
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                className="w-full px-3 py-2"
                            />
                        </div>
                        <Button 
                            className="w-full" 
                            size="lg" 
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating account..." : "Sign up"}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                OR
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-between text-sm">
                        <div className="space-y-2">Already have an account?</div>
                        <div className="space-y-2 ">
                            <Link className="text-blue-500" href="/auth/signin">
                                Login to your account
                            </Link> 
                        </div>
                    </div>

                    {/* <Button variant="outline" className="w-full" size="lg">
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Sign up with Google
                    </Button> */}
                </div>
            </div>
        </div>
    )
}