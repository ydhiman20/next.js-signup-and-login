import { dbConnect } from "@/db/db";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = "defaultsecret";

export const POST = async (req) => {
  await dbConnect();

  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { status: 400, message: "Both email and password are required." },
        { status: 400 }
      );
    }

    // Check if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { status: 401, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { status: 401, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET, // Using secret from environment variables
      { expiresIn: "7d" } // Token valid for 7 days
    );

    // Return success response with the token
    return NextResponse.json(
      {
        status: 200,
        message: "Login successful.",
        token, // Send the token to the client
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error." },
      { status: 500 }
    );
  }
};
