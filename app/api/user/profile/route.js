import connectToDatabase from "@/lib/mongoose"
import User from "@/models/User"
import { NextResponse } from "next/server"

// GET user profile
export async function GET(request) {
  try {
    await connectToDatabase()

    // Get the first user for simplicity
    // In a real app, you would identify the user from their session/token
    const user = await User.findOne().select("-password")

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// UPDATE user profile
export async function PUT(request) {
  try {
    await connectToDatabase()

    const userData = await request.json()

    // Find user by ID or email
    const user = userData._id ? await User.findById(userData._id) : await User.findOne({ email: userData.email })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update allowed fields
    if (userData.name) user.name = userData.name
    if (userData.username !== undefined) user.username = userData.username
    if (userData.dateOfBirth !== undefined) user.dateOfBirth = userData.dateOfBirth
    if (userData.presentAddress !== undefined) user.presentAddress = userData.presentAddress
    if (userData.permanentAddress !== undefined) user.permanentAddress = userData.permanentAddress
    if (userData.city !== undefined) user.city = userData.city
    if (userData.postalCode !== undefined) user.postalCode = userData.postalCode
    if (userData.country !== undefined) user.country = userData.country
    if (userData.profileImage !== undefined) user.profileImage = userData.profileImage

    await user.save()

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        dateOfBirth: user.dateOfBirth,
        presentAddress: user.presentAddress,
        permanentAddress: user.permanentAddress,
        city: user.city,
        postalCode: user.postalCode,
        country: user.country,
        profileImage: user.profileImage,
      },
    })
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
