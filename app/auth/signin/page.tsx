'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import signinImage from "../../../public/assets/signin.jpg"
import Image from "next/image"

export default function SignIn() {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Background Image */}
    
      <div className="hidden lg:block lg:w-1/2  ">
        <Image className="object-cover h-screen" src={signinImage} alt="Signin Image" />
      </div>
      
      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-gray-500">Please fill your information below</p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="E-mail"
                className="w-full px-3 py-2"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2"
              />
            </div>
            <Button className="w-full" size="lg">
              Log in
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
            <div className="space-y-2">Create an account</div>
            <div className="space-y-2 ">
                <Link className="text-blue-500" href="/auth/signup">Sign Up</Link> 
            </div>
          </div>

          <Button variant="outline" className="w-full" size="lg">
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
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  )
}
