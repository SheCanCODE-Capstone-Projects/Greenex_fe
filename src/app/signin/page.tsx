"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth-service";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Helper function to decode JWT token
  const decodeJWT = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authService.login(email, password);

      // Store token and user info
      if (response.token) {
        localStorage.setItem("auth_token", response.token);
      }

      // Debug: Log the full response to see all fields
      console.log("Full login response:", JSON.stringify(response, null, 2));

      // Decode JWT to get role
      const decodedToken = response.token ? decodeJWT(response.token) : null;
      console.log("Decoded JWT:", decodedToken);

      // Get role from response or decoded token
      const userRole = response.role || decodedToken?.role;
      console.log("Detected userRole:", userRole);

      // Store the user info
      const userInfo = {
        userId: response.userId,
        email: response.email,
        fullName: response.fullName,
        role: userRole
      };
      localStorage.setItem("user_info", JSON.stringify(userInfo));

      toast.success("Login successful!");

      // Role-based routing
      if (userRole === "ADMIN") {
        console.log("Routing to Supper-dashboard");
        router.push("/Supper-dashboard");
      } else if (userRole === "COMPANY_MANAGER") {
        console.log("Routing to wasteCompanyDashboard");
        router.push("/wasteCompanyDashboard");
      } else if (userRole === "CITIZEN") {
        console.log("Routing to User-Dashboard");
        router.push("/User-Dashboard");
      } else {
        // Default fallback
        console.log("No matching role, routing to home");
        router.push("/");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-gray-50">
        <div className="w-full max-w-md">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">
            Welcome back!
          </h1>

          <p className="mb-6 sm:mb-8 text-gray-600 text-sm sm:text-base">
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                placeholder="your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent disabled:opacity-50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
              <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-primary-green"
                />
                Remember for 30 days
              </label>
              <a
                href="#"
                className="text-xs sm:text-sm text-blue-600 hover:text-green-800 hover:underline"
              >
                Forgot your password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 sm:py-3 text-sm sm:text-base rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4 sm:my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 sm:px-4 text-xs sm:text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Login Button */}
          <button
            className="w-full py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 sm:gap-3 border border-gray-300 bg-white hover:bg-gray-50 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            <span className="text-gray-700 font-medium text-sm sm:text-base">Sign in with Google</span>
          </button>

          {/* Sign Up Link */}
          <p className="text-sm text-center mt-6 text-gray-600">S
            Do not have an account?
            <a
              href="/signup"
              className="ml-1 text-blue-600 hover:text-green-800 font-medium hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
      <div className="w-1/2 hidden lg:block h-full relative">
        <img
          src="/landingImage.png"
          alt="Landing"
          className="w-full h-full object-cover"
        />
        {/* Green overlay using global CSS variable */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "var(--primary-green)", opacity: 0.4 }}
        ></div>
      </div>
    </div>
  );
}