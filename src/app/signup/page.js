"use client";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  const signUpAction = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!name || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    const signUpObj = { name, email, password };

    try {
      setLoading(true); // Show loading state
      const res = await axios.post(
        "http://localhost:3000/api/signup",
        signUpObj
      );
      console.log("Response from signup API:", res.data);
      toast.success(res.data.message); // Success message

      // Redirect after success
      setTimeout(() => {
        router.push("/"); // Redirect to home or dashboard
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data.message || "Something went wrong.");
      console.error("Error in signup:", error.response?.data || error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 sm:p-12">
        <ToastContainer position="top-center" autoClose={3000} />
        <div className="w-full max-w-4xl bg-white flex flex-col md:flex-row  rounded-lg shadow-lg  items-center">
          {/* Left Side - Info Section */}
          <div className="md:w-1/2 bg-red-600 text-white text-center p-8 flex flex-col justify-center items-start space-y-4">
            <img
              src="https://loremflickr.com/200/200"
              alt="Sign Up"
              className="mb-4 block rounded-full m-auto"
            />
            <h2 className="text-3xl font-bold">Welcome to Our Platform</h2>
            <p className="text-xl">
              Join us today and start exploring all the amazing features we have
              to offer.
            </p>
            <p className="text-sm">
              Sign up to access exclusive content, track your progress, and much
              more.
            </p>
          </div>

          {/* Right Side - Form Section */}
          <div className="md:w-1/2 p-8 w-full">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
              Sign Up
            </h2>
            <form className="space-y-4" onSubmit={signUpAction}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
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
                />
              </div>
              <div>
                <button
                  type="submit"
                  className={`w-full bg-red-600 text-white py-2 rounded-md text-lg focus:outline-none hover:bg-red-700 transition-all ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading} // Disable button during submission
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <Link href="/login" className="text-red-600 hover:text-red-700">
                Already have an account? Login
              </Link>
            </div>
          </div>
        </div>
        {/* Footer */}
      </div>
      <div className="w-full bg-gray-800 text-white text-center py-4">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </div>
    </>
  );
}

export default Page;
