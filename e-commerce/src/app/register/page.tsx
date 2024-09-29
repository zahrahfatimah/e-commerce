"use client";
import Link from "next/link";
import React from "react";
import { toast, ToastContainer } from "react-toastify";

const handleFormAction = async (formData: FormData) => {
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      name: formData.get("name"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseJson = await response.json();

  if (!response.ok) {
    const message = responseJson.error ?? "Something went wrong!";
    toast.error(message);
  } else {
    toast.success("Registration successful! Redirecting to login page...");
    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  }
};

export default function Register() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await handleFormAction(formData);
  };

  return (
    <>
      {/* Komponen untuk menampilkan Toastify */}
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="w-96 bg-white shadow-lg rounded-lg p-6">
          <div className="text-gray-900">
            <h2 className="text-center text-2xl font-semibold mb-4">Sign Up</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm mb-1 text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your fullname"
                  required
                />
              </div>
              <div>
                <label htmlFor="username" className="block text-sm mb-1 text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full p-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Shera zahrah"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm mb-1 text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="you@mail.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm mb-1 text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-gray-300 text-gray-600 rounded-lg "
                // disabled
              >
                Register
              </button>
            </form>
            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-green-500 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
