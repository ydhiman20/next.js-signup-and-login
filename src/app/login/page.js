"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { consoleLog } from "../utils/utils";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add a loading state
  const router = useRouter();

  const loginAction = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    const loginObj = { email, password };
    console.log("Submitting loginObj:", loginObj);
    consoleLog({ email, password }, "1");

    try {
      setLoading(true); // Show loading state
      const res = await axios.post("http://localhost:3000/api/login", loginObj);
      console.log("loginAction  res:", res);

      // Assuming the API responds with an auth token
      const { token } = res.data;

      consoleLog(token, "1");

      // Set auth token as a cookie
      document.cookie = `auth=${token}; path=/; max-age=3600`; // Set for 1 hour

      toast.success("Login successful!");
      router.push("/"); // Redirect to dashboard or another page
    } catch (error) {
      console.error("Error in login:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Something went wrong during login."
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 sm:p-12">
        <ToastContainer />
        <div className="w-full max-w-4xl bg-white flex flex-col md:flex-row rounded-lg shadow-lg item-">
          {/* Left Side - Info Section */}
          <div className="md:w-1/2 bg-red-600 text-white text-center p-8 flex flex-col justify-center space-y-4">
            <img
              src="https://loremflickr.com/200/200"
              alt="Sign Up"
              className="mb-4 block rounded-full m-auto"
            />
            <h2 className="text-3xl font-bold text-center block">
              Welcome Back!
            </h2>
            <p className="text-xl">
              Log in to access your dashboard and continue where you left off.
            </p>
            <p className="text-sm">
              Don&apos;t have an account? You can create one by signing up.
            </p>
          </div>

          {/* Right Side - Form Section */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
              Login
            </h2>
            <form onSubmit={loginAction} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className={`w-full bg-red-600 text-white py-2 rounded-md text-lg focus:outline-none hover:bg-red-700 transition-all ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading} // Disable button during submission
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="mt-4 text-center">
              <Link href="/signup" className="text-red-600 hover:text-red-700">
                Don&apos;t have an account? Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-gray-800 text-white text-center py-4 mt-8">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </div>
    </>
  );
}

export default Page;
