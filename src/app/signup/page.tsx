'use client'

import Image from "next/image";
import { useState } from "react";

export default function SignupPage() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("citizen");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  
  const validFullname = fullname.trim().length >= 3;
  const validEmail = email.includes("@") && email.includes(".");
  const validPassword = strongPassword.test(password);
  const validConfirm = password === confirmPassword;

  const canAgree = validFullname && validEmail && validPassword && validConfirm;
  const canSubmit = canAgree && agree;

  const handleSubmit = () => {
    if (!canSubmit) {
      setError("Please complete all required fields correctly.");
      return;
    }
    setError("");
    alert("Signup successful!");
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-gray-50 flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-semibold mb-8">Get Started Now</h1>

          {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

          
          <label className="text-sm font-medium">FullName</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className={`w-full mt-1 p-3 border rounded-lg bg-white/60 ${
              fullname && !validFullname ? "border-red-500" : ""
            }`}
          />
          {fullname && !validFullname && (
            <p className="text-red-500 text-xs mb-4">Name must be at least 3 characters</p>
          )}
          {(!fullname || validFullname) && <div className="mb-4"></div>}

          
          <label className="text-sm font-medium">Email address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full mt-1 p-3 border rounded-lg bg-white/60 ${
              email && !validEmail ? "border-red-500" : ""
            }`}
          />
          {email && !validEmail && (
            <p className="text-red-500 text-xs mb-4">Please enter a valid email</p>
          )}
          {(!email || validEmail) && <div className="mb-4"></div>}

          
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
            className={`w-full mt-1 p-3 border rounded-lg bg-white/60 ${
              password && !validPassword ? "border-red-500" : ""
            }`}
          />
          {password && !validPassword && (
            <p className="text-red-500 text-xs mb-4">Password must be 8+ chars with uppercase, lowercase, number & special char</p>
          )}
          {(!password || validPassword) && <div className="mb-4"></div>}

        
          <label className="text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            placeholder="******"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full mt-1 p-3 border rounded-lg bg-white/60 ${
              confirmPassword && !validConfirm ? "border-red-500" : ""
            }`}
          />
          {confirmPassword && !validConfirm && (
            <p className="text-red-500 text-xs mb-4">Passwords do not match</p>
          )}
          {(!confirmPassword || validConfirm) && <div className="mb-4"></div>}

        
          <div className="flex items-start mb-6">
            <input
              type="checkbox"
              checked={agree}
              disabled={!canAgree}
              onChange={() => canAgree && setAgree(!agree)}
              className={`w-5 h-5 mr-3 mt-0.5 accent-green-700 ${
                canAgree ? "cursor-pointer" : "opacity-40 cursor-not-allowed"
              }`}
            />
            <div>
              <p className="text-sm leading-relaxed">
                I agree to the terms & policy
              </p>
              {!canAgree && (
                <p className="text-red-500 text-xs mt-1">Please fill all fields correctly first</p>
              )}
            </div>
          </div>

          
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
              canSubmit
                ? "bg-green-700 hover:bg-green-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            {canSubmit ? "Create Account" : "Complete All Fields"}
          </button>

          {userType !== "company" && (
            <>
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
            </>
          )}

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
         <div
    className="absolute inset-0"
    style={{ backgroundColor: "var(--primary-green)", opacity: 0.4 }}
  ></div>
      </div>
    </div>
  );
}
