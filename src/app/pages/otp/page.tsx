"use client";

import { useState, useRef, useEffect } from "react";

export default function OTPPage() {
  const [step, setStep] = useState(2);
  const [email] = useState("user@example.com"); // Default email or get from props/context
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleDigitInput = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };



  const verifyOTP = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      alert("Please enter all 6 digits!");
      return;
    }
    setLoading(true);

    // TODO: Backend API
    setTimeout(() => {
      setStep(3);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md">

        {/* Step Indicator */}
        <div className="flex justify-center items-center mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-4">

            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 1 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
              }`}>
                {step > 1 ? "✓" : "1"}
              </div>
              <span className="text-xs mt-1 text-gray-600">Email</span>
            </div>

            <div className={`h-1 w-10 sm:w-16 ${step >= 2 ? "bg-green-600" : "bg-gray-200"}`} />

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 2 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
              }`}>
                {step > 2 ? "✓" : "2"}
              </div>
              <span className="text-xs mt-1 text-gray-600">Verify</span>
            </div>

            <div className={`h-1 w-10 sm:w-16 ${step >= 3 ? "bg-green-600" : "bg-gray-200"}`} />

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 3 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
              }`}>
                {step >= 3 ? "✓" : "3"}
              </div>
              <span className="text-xs mt-1 text-gray-600">Done</span>
            </div>

          </div>
        </div>



        {/* Step 2: OTP */}
        {step === 2 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-2 text-center">
              Enter Verification Code
            </h2>

            <p className="text-gray-600 text-sm text-center">Code sent to</p>
            <p className="text-green-700 font-semibold mb-6 text-center break-all">{email}</p>

            {/* Responsive OTP inputs */}
            <div className="flex justify-center gap-2 sm:gap-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitInput(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={loading}
                  className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                />
              ))}
            </div>

            <button
              onClick={verifyOTP}
              disabled={loading}
              className="w-full bg-green-600 text-white p-3 sm:p-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition disabled:bg-gray-400 mb-3"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>

            <div className="flex justify-center text-sm">
              <button
                onClick={() => {
                  setOtp(["", "", "", "", "", ""]);
                  // TODO: Resend OTP API call
                }}
                disabled={loading}
                className="text-green-600 font-semibold hover:underline"
              >
                Resend Code
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="text-center py-6 sm:py-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-green-600 mb-3">
              Verified Successfully!
            </h2>

            <p className="text-gray-600 mb-2">Your email</p>
            <p className="text-green-700 font-semibold text-lg break-all">{email}</p>
          </div>
        )}

      </div>
    </div>
  );
}
