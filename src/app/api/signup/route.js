import { dbConnect } from "@/db/db"; // Connect to MongoDB
import User from "@/models/User"; // User schema/model
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

// Default bcrypt salt rounds
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);

export const POST = async (req) => {
  try {
    await dbConnect(); // Connect to the database

    // Parse request body
    const { name, email, password } = await req.json();

    // Validate input fields
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          status: 400,
          message: "All fields (name, email, and password) are required.",
        },
        { status: 400 }
      );
    }

    // Check if the email is valid
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          status: 400,
          message: "Invalid email format.",
        },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          status: 400,
          message: "User already exists. Please login.",
        },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save(); // Save the user to the database

    // Return success response
    return NextResponse.json(
      {
        status: 201,
        message: "User created successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error); // More detailed error logging
    return NextResponse.json(
      {
        status: 500,
        message: "Internal Server Error. Please try again later.",
      },
      { status: 500 }
    );
  }
};
