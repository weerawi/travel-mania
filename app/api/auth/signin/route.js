import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try { 
    await connectToDatabase(); 
    const { email, password } = await request.json();
    
    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    
    // Create user object without password
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email
    };
    
    // Return user data
    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: userData
    });
  } catch (error) {
    console.error("Error in signin:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}