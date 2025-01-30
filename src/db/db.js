import mongoose from "mongoose";

const DB_URI = "YOUR_MONOGO_DB_URL";

export const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Info: Database already connected");
    return;
  }

  try {
    await mongoose.connect(DB_URI);
    console.log("Success: Database connected successfully");
  } catch (error) {
    // Log connection errors
    console.error("Error: Database connection failed:", error.message);
    throw new Error("Unable to establish a database connection");
  }
};
