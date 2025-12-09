// app/login/page.tsx
export default function Login() {
  return (
    <div className="flex h-screen w-full">
      {/* LEFT SIDE - Login Form */}
      <div className="w-1/2 flex items-center justify-center p-10 bg-gray-50">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            Welcome back!
          </h1>

          <p className="mb-8 text-gray-600">
            Enter your credentials to access your account
          </p>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="your email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="your password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              Remember for 30 days
            </label>
            <a 
              href="#" 
              className="text-sm text-blue-600 hover:text-green-800 hover:underline"
            >
              Forgot your password?
            </a>
          </div>

          {/* Login Button */}
          <button
            className="w-full py-3 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Login Button */}
          <button
            className="w-full py-3 rounded-lg flex items-center justify-center gap-3 border border-gray-300 bg-white hover:bg-gray-50 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-gray-700 font-medium">Sign in with Google</span>
          </button>

          {/* Sign Up Link */}
          <p className="text-sm text-center mt-6 text-gray-600">
            Don't have an account?
            <a 
              href="#" 
              className="ml-1 text-blue-600 hover:text-green-800 font-medium hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
  <div className="w-1/2 hidden md:block h-full relative">
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