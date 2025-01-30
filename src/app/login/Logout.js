"use client";

import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the auth cookie by setting it with a past expiration date
    document.cookie =
      "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict";

    // Optionally, clear any other session-related data if needed
    localStorage.removeItem("userData"); // If you are storing any user-related data in localStorage

    // Redirect to the login page
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="w-full bg-red-600 text-white p-4">
        <h1 className="text-xl font-bold text-center">Logout Page</h1>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Are you sure you want to logout?
          </h2>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white text-center py-4 mt-8">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}
