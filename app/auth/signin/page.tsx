'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@radix-ui/react-separator"
import signinImage from "../../../public/assets/signup.jpg"
import Image from "next/image"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async(e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    
    try {
      const response = await axios.post('/api/auth/signin', { email, password })
      
      if (response.data.success) {
        // Save user info in localStorage for simple session management
        localStorage.setItem('user', JSON.stringify(response.data.user))
        
        // Redirect to dashboard
        router.push('/home/dashboard')
      }
    } catch (error) {
      console.error("Error during sign in:", error)
      setError(error.response?.data?.error || "Invalid credentials")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Left side */}
      <div className="hidden lg:block lg:w-1/2 ">
        <Image className="object-cover h-screen" src={signinImage} alt="Signin Image" />
      </div>
      
      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-gray-500">Welcome back! Please login to your account</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
            <Button 
              className="w-full" 
              size="lg" 
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
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
            <div className="space-y-2">Don't have an account?</div>
            <div className="space-y-2 ">
              <Link className="text-blue-500" href="/auth/signup">
                Create an account
              </Link> 
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}