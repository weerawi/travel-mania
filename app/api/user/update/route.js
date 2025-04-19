// File: app/api/user/update/route.js
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";

export async function PUT(request) {
  try {
    await connectToDatabase();
    
    const userData = await request.json();
    const { _id, ...updateData } = userData;
    
    // Remove fields that should not be updated
    delete updateData.email; // Don't allow email updates through this endpoint
    delete updateData.password; // Don't allow password updates
    delete updateData.createdAt; // These are managed by MongoDB
    delete updateData.updatedAt;
    delete updateData.__v;
    
    // Find and update the user
    // In a real app, you would identify the user from their session/token
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true }
    ).select("-password -__v").lean();
    
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}