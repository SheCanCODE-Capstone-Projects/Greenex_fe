'use client'

import Image from "next/image";
import { useState } from "react";

export default function SignupPage() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("citizen");

  return (
    <div className="min-h-screen flex">
      
      <div className="w-1/2 bg-[#dbe6d0] flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          
          <h1 className="text-3xl font-semibold mb-8">Get Started Now</h1>

          
          <label className="text-sm font-medium">FullName</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full mt-1 mb-4 p-3 border rounded-lg bg-white/60"
          />
          <label className="text-sm font-medium">Email address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 mb-4 p-3 border rounded-lg bg-white/60"
          />
           <label className="text-sm font-medium">User Type</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full mt-1 mb-4 p-3 border rounded-lg bg-white/60"
          >
            <option value="citizen">Household</option>
            <option value="company">Company</option>
          </select>

          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 mb-4 p-3 border rounded-lg bg-white/60"
          />
          <label className="text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            placeholder="******"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mt-1 mb-4 p-3 border rounded-lg bg-white/60"
          />
          <div className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            <p className="text-sm">I agree to the terms & policy</p>
          </div>

          
          <button className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold">
            Signup
          </button>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t"></div>
            <span className="mx-2 text-sm text-gray-600">OR</span>
            <div className="flex-1 border-t"></div>
          </div>

          
          <button className="w-full flex items-center justify-center border py-3 rounded-lg hover:bg-gray-100">
            <Image
              src="/image.png"
              width={20}
              height={20}
              alt="Google"
              className="mr-3"
            />
            Sign in with Google
          </button>
 
          <p className="text-center mt-4 text-sm">
            Have an account?{" "}
            <a href="/login" className="text-blue-600 font-medium">
              Sign In
            </a>
          </p>
        </div>
      </div>

      <div className="w-1/2 relative backdrop-opacity-60">
      
        <Image
          src="/landingImage.png"
          alt="Cleaning workers"
          fill
          className="object-cover"
        />
          <div className="absolute inset-0 bg-green-950 opacity-80"></div>

      </div>
    </div>
  );
}



    
