"use client";

import { useState } from "react";

export default function OTPPage() {
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP, 3: Success
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleDigitInput = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
  };

  // ========================================
  // BACKEND INTEGRATION: Send OTP
  // ========================================
  const sendOTP = async () => {
    if (!phone) {
      alert("Please enter your phone number!");
      return;
    }
    setLoading(true);
    // TODO: Add your API call here
    setTimeout(() => {
      setStep(2);
      setLoading(false);
    }, 1000);
  };

  // ========================================
  // BACKEND INTEGRATION: Verify OTP
  // ========================================
  const verifyOTP = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      alert("Please enter all 6 digits!");
      return;
    }
    setLoading(true);
    // TODO: Add your API call here
    setTimeout(() => {
      setStep(3);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        
        {/* Step Indicator */}
        <div className="flex justify-center items-center mb-8">
          <div className="flex items-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > 1 ? '✓' : '1'}
              </div>
              <span className="text-xs mt-1 text-gray-600">Phone</span>
            </div>
            
            {/* Line */}
            <div className={`w-16 h-1 mx-2 ${step >= 2 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > 2 ? '✓' : '2'}
              </div>
              <span className="text-xs mt-1 text-gray-600">Verify</span>
            </div>
            
            {/* Line */}
            <div className={`w-16 h-1 mx-2 ${step >= 3 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step >= 3 ? '✓' : '3'}
              </div>
              <span className="text-xs mt-1 text-gray-600">Done</span>
            </div>
          </div>
        </div>

        {/* Step 1: Phone Number */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-green-700 mb-2 text-center">
              Enter Phone Number
            </h2>
            <p className="text-gray-600 text-sm mb-6 text-center">
              We'll send you a verification code
            </p>
            
            <input
              type="tel"
              placeholder="+250 700 000 000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
              className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
            />
            
            <button
              onClick={sendOTP}
              disabled={loading}
              className="w-full bg-green-600 text-white p-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition disabled:bg-gray-400"
            >
              {loading ? 'Sending...' : 'Send Code'}
            </button>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-green-700 mb-2 text-center">
              Enter Verification Code
            </h2>
            <p className="text-gray-600 text-sm mb-1 text-center">
              Code sent to
            </p>
            <p className="text-green-700 font-semibold mb-6 text-center">{phone}</p>
            
            {/* OTP Digit Boxes */}
            <div className="flex justify-center gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitInput(index, e.target.value)}
                  disabled={loading}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
                />
              ))}
            </div>

            {/* Number Pad */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    const emptyIndex = otp.findIndex(d => d === "");
                    if (emptyIndex !== -1) {
                      handleDigitInput(emptyIndex, num.toString());
                    }
                  }}
                  disabled={loading}
                  className="bg-green-50 hover:bg-green-100 active:bg-green-200 text-green-700 font-bold text-xl p-4 rounded-lg transition"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => setOtp(["", "", "", "", "", ""])}
                disabled={loading}
                className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold p-4 rounded-lg transition"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  const emptyIndex = otp.findIndex(d => d === "");
                  if (emptyIndex !== -1) {
                    handleDigitInput(emptyIndex, "0");
                  }
                }}
                disabled={loading}
                className="bg-green-50 hover:bg-green-100 active:bg-green-200 text-green-700 font-bold text-xl p-4 rounded-lg transition"
              >
                0
              </button>
              <button
                onClick={() => {
                  const lastFilledIndex = otp.map((d, i) => d !== "" ? i : -1).filter(i => i !== -1).pop();
                  if (lastFilledIndex !== undefined) {
                    const newOtp = [...otp];
                    newOtp[lastFilledIndex] = "";
                    setOtp(newOtp);
                  }
                }}
                disabled={loading}
                className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-semibold p-4 rounded-lg transition"
              >
                ⌫
              </button>
            </div>

            <button
              onClick={verifyOTP}
              disabled={loading}
              className="w-full bg-green-600 text-white p-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition disabled:bg-gray-400 mb-3"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>

            <div className="flex justify-between text-sm">
              <button
                onClick={() => {
                  setStep(1);
                  setOtp(["", "", "", "", "", ""]);
                }}
                disabled={loading}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Change Number
              </button>
              <button
                onClick={sendOTP}
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
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-green-600 mb-3">
              Verified Successfully!
            </h2>
            <p className="text-gray-600 mb-2">
              Your phone number
            </p>
            <p className="text-green-700 font-semibold text-lg mb-6">
              {phone}
            </p>
            <p className="text-gray-600 mb-8">
              has been verified successfully.
            </p>
            
            <button
              onClick={() => {
                setStep(1);
                setPhone("");
                setOtp(["", "", "", "", "", ""]);
              }}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Verify Another Number
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
