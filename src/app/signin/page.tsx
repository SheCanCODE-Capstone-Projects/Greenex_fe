'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', { email, password: '***' });
      
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Login failed' }));
        setError(errorData.message || `Error ${response.status}: Login failed`);
        return;
      }

      const data = await response.json();
      console.log('Success response:', data);

      const token = data.token || data.accessToken || data.access_token;
      if (token) {
        localStorage.setItem('token', token);
      }
      
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      // Redirect to home page
      router.push('/');
      
    } catch (err) {
      console.error('Network/Parse error:', err);
      setError(`Connection failed: ${err instanceof Error ? err.message : 'Cannot reach server'}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen w-full">
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-10 lg:py-16 bg-gray-50">
        <div className="w-full max-w-sm sm:max-w-md">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 text-gray-900 text-center lg:text-left">
            Welcome back!
          </h1>

          <p className="mb-6 sm:mb-8 text-gray-600 text-sm sm:text-base text-center lg:text-left">
            Enter your credentials to access your account
          </p>
          
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
          <div className="mb-4 sm:mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              placeholder="your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all duration-200"
            />
          </div>
          <div className="mb-4 sm:mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all duration-200"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-2">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-primary-green"
              />
              Remember for 30 days
            </label>
            <a 
              href="#" 
              className="text-sm text-blue-600 hover:text-green-800 hover:underline transition-colors duration-200"
            >
              Forgot your password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 sm:py-3.5 text-sm sm:text-base rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2 shadow-sm hover:shadow-md"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

        
          <button
            className="w-full py-3 sm:py-3.5 rounded-lg flex items-center justify-center gap-3 border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm hover:shadow-md"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-gray-700 font-medium text-sm sm:text-base">Sign in with Google</span>
          </button>

          
          <p className="text-sm text-center mt-6 sm:mt-8 text-gray-600">
            Do not have an account?
            <a 
              href="/signup" 
              className="ml-1 text-blue-600 hover:text-green-800 font-medium hover:underline transition-colors duration-200"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
      <div className="w-1/2 hidden lg:block relative">
        <img
          src="/landingImage.png"
          alt="Landing"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "var(--primary-green)", opacity: 0.4 }}
        ></div>
      </div>


    </div>
  );
}