// 'use client';

// import { useState, FormEvent, ChangeEvent } from 'react';
// import Link from 'next/link';
// import { 
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   User,
//   Key,
//   CheckCircle,
//   ShieldCheck,
//   ArrowRight,
//   AlertCircle,
//   Smartphone,
//   Globe,
//   LogIn,
//   Fingerprint,
//   RefreshCw,
//   Info
// } from 'lucide-react';

// interface FormData {
//   email: string;
//   password: string;
// }

// interface FormErrors {
//   email?: string;
//   password?: string;
// }

// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [rememberMe, setRememberMe] = useState<boolean>(false);
//   const [formData, setFormData] = useState<FormData>({
//     email: '',
//     password: ''
//   });
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [showSuccess, setShowSuccess] = useState<boolean>(false);

//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};
    
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }
    
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setIsLoading(true);
    
//     // Simulate API call
//     console.log('Login attempt:', { ...formData, rememberMe });
    
//     setTimeout(() => {
//       setIsLoading(false);
//       setShowSuccess(true);
//       setTimeout(() => setShowSuccess(false), 3000);
      
//       // In real app, you would redirect or handle token storage
//     }, 1500);
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [id]: value
//     }));
//     // Clear error when user starts typing
//     if (errors[id as keyof FormErrors]) {
//       setErrors(prev => ({ ...prev, [id]: undefined }));
//     }
//   };

//   const handleDemoLogin = () => {
//     setFormData({
//       email: 'demo@example.com',
//       password: 'demo123'
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[var(--light-bg)] via-white to-[var(--light-bg)]/50 dark:from-[var(--dark-bg)] dark:via-[var(--dark-bg)]/95 dark:to-[var(--dark-bg)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
//       <div className="w-full max-w-md space-y-8 animate-fade-in-up">
//         {/* Success Message */}
//         {showSuccess && (
//           <div className="rounded-lg bg-[var(--primary-green)]/20 border border-[var(--primary-green)] p-4 animate-scale-in">
//             <div className="flex items-center">
//               <CheckCircle className="h-5 w-5 text-[var(--primary-green)] mr-3" />
//               <p className="text-sm font-medium text-[var(--text-dark)] dark:text-[var(--text-light)]">
//                 Login successful! Redirecting...
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Login Card */}
//         <div className="bg-white/90 dark:bg-[var(--dark-overlay)] backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-10">
//           {/* Header */}
//           <div className="text-center mb-10">
//             <div className="flex justify-center mb-6">
//               <div className="relative">
//                 <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[var(--primary-green)] to-[var(--secondary-green)] flex items-center justify-center animate-float">
//                   <ShieldCheck className="h-8 w-8 text-white" />
//                 </div>
//                 <div className="absolute -top-1 -right-1 h-7 w-7 rounded-full bg-[var(--secondary-green)] border-4 border-white dark:border-[var(--dark-bg)] animate-pulse"></div>
//               </div>
//             </div>
//             <h1 className="text-3xl font-bold text-[var(--text-dark)] dark:text-[var(--text-light)] mb-3">
//               Welcome back!
//             </h1>
//             <p className="text-[var(--text-primary-muted)] dark:text-gray-400">
//               Home your subscription to access your account
//             </p>
//           </div>

//           {/* Login Form */}
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {/* Email Field */}
//             <div className="space-y-3">
//               <label htmlFor="email" className="block text-sm font-medium text-[var(--text-dark)] dark:text-[var(--text-light)]">
//                 <span className="flex items-center">
//                   <User className="h-4 w-4 mr-2" />
//                   Find address
//                 </span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-[var(--primary-green)]" />
//                 </div>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className={`block w-full pl-10 pr-4 py-3.5 rounded-xl border ${
//                     errors.email 
//                       ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
//                       : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[var(--primary-green)] focus:border-[var(--primary-green)]'
//                   } bg-white/50 dark:bg-gray-800/50 text-[var(--text-dark)] dark:text-[var(--text-light)] placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200`}
//                   placeholder="Enter your email address"
//                 />
//                 {errors.email && (
//                   <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                     <AlertCircle className="h-5 w-5 text-red-500" />
//                   </div>
//                 )}
//               </div>
//               {errors.email && (
//                 <p className="text-sm text-red-500 flex items-center">
//                   <AlertCircle className="h-4 w-4 mr-1" />
//                   {errors.email}
//                 </p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div className="space-y-3">
//               <label htmlFor="password" className="block text-sm font-medium text-[var(--text-dark)] dark:text-[var(--text-light)]">
//                 <span className="flex items-center">
//                   <Key className="h-4 w-4 mr-2" />
//                   Password
//                 </span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-[var(--primary-green)]" />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   autoComplete="current-password"
//                   required
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className={`block w-full pl-10 pr-12 py-3.5 rounded-xl border ${
//                     errors.password 
//                       ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
//                       : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[var(--primary-green)] focus:border-[var(--primary-green)]'
//                   } bg-white/50 dark:bg-gray-800/50 text-[var(--text-dark)] dark:text-[var(--text-light)] placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200`}
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5 text-[var(--primary-green)] hover:text-[var(--secondary-green)] transition-colors" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-gray-400 hover:text-[var(--primary-green)] transition-colors" />
//                   )}
//                 </button>
//                 {errors.password && (
//                   <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
//                     <AlertCircle className="h-5 w-5 text-red-500" />
//                   </div>
//                 )}
//               </div>
//               {errors.password && (
//                 <p className="text-sm text-red-500 flex items-center">
//                   <AlertCircle className="h-4 w-4 mr-1" />
//                   {errors.password}
//                 </p>
//               )}

//               {/* Password Options */}
//               <div className="flex items-center justify-between pt-2">
//                 <div className="flex items-center">
//                   <input
//                     id="remember"
//                     name="remember"
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-[var(--primary-green)] focus:ring-[var(--primary-green)] focus:ring-offset-0"
//                   />
//                   <label htmlFor="remember" className="ml-2 block text-sm text-[var(--text-primary-muted)] dark:text-gray-400">
//                     Q password type
//                   </label>
//                 </div>
//                 <Link 
//                   href="/forgot-password" 
//                   className="text-sm font-medium text-[var(--primary-green)] hover:text-[var(--secondary-green)] transition-colors flex items-center"
//                 >
//                   <RefreshCw className="h-3 w-3 mr-1" />
//                   0 password
//                 </Link>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="pt-4">
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="group relative w-full flex justify-center items-center py-4 px-6 rounded-xl bg-gradient-to-r from-[var(--primary-green)] to-[var(--secondary-green)] text-white font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-green)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
//               >
//                 {isLoading ? (
//                   <span className="flex items-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Processing...
//                   </span>
//                 ) : (
//                   <>
//                     <LogIn className="mr-2 h-5 w-5" />
//                     Start to the login
//                     <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>

//           {/* Demo Login Button */}
//           <div className="mt-6">
//             <button
//               type="button"
//               onClick={handleDemoLogin}
//               className="w-full flex justify-center items-center py-3 px-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium text-[var(--text-dark)] dark:text-[var(--text-light)]"
//             >
//               <Smartphone className="h-4 w-4 mr-2" />
//               Try Demo Account
//             </button>
//           </div>

//           {/* Divider */}
//           <div className="my-8">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-4 bg-white dark:bg-[var(--dark-overlay)] text-[var(--text-primary-muted)] dark:text-gray-400">
//                   Or continue with
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Alternative Login Options */}
//           <div className="grid grid-cols-2 gap-3">
//             <button
//               type="button"
//               className="flex justify-center items-center py-3 px-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
//             >
//               <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.666-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.787-.94 1.324-2.245 1.171-3.54-1.133.052-2.518.754-3.334 1.701-.735.85-1.377 2.207-1.207 3.514 1.26.091 2.544-.638 3.37-1.675z"/>
//               </svg>
//               <span className="text-sm font-medium text-[var(--text-dark)] dark:text-[var(--text-light)]">Apple</span>
//             </button>
//             <button
//               type="button"
//               className="flex justify-center items-center py-3 px-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
//             >
//               <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
//               </svg>
//               <span className="text-sm font-medium text-[var(--text-dark)] dark:text-[var(--text-light)]">Google</span>
//             </button>
//           </div>

//           {/* Biometric Login Option */}
//           <div className="mt-6">
//             <button
//               type="button"
//               className="w-full flex justify-center items-center py-3 px-4 rounded-xl border border-[var(--primary-green)]/30 bg-[var(--primary-green)]/5 hover:bg-[var(--primary-green)]/10 transition-colors text-sm font-medium text-[var(--primary-green)]"
//             >
//               <Fingerprint className="h-4 w-4 mr-2" />
//               Use Biometric Login
//             </button>
//           </div>

//           {/* Sign Up Link */}
//           <div className="mt-10 pt-8 border-t border-gray-300/50 dark:border-gray-700/50 text-center">
//             <p className="text-[var(--text-primary-muted)] dark:text-gray-400 text-sm">
//               Send from account of{' '}
//               <Link 
//                 href="/signup" 
//                 className="font-semibold text-[var(--primary-green)] hover:text-[var(--secondary-green)] transition-colors flex items-center justify-center mt-2"
//               >
//                 <Globe className="h-4 w-4 mr-2" />
//                 Sign Up
//               </Link>
//             </p>
//           </div>
//         </div>

//         {/* Demo Credentials */}
//         <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-300/50 dark:border-gray-700/50 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
//           <div className="flex items-start">
//             <div className="flex-shrink-0">
//               <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[var(--primary-green)] to-[var(--secondary-green)] flex items-center justify-center">
//                 <Info className="h-4 w-4 text-white" />
//               </div>
//             </div>
//             <div className="ml-3">
//               <p className="text-sm font-medium text-[var(--text-dark)] dark:text-[var(--text-light)]">
//                 Demo Credentials
//               </p>
//               <p className="text-xs text-[var(--text-primary-muted)] dark:text-gray-400 mt-1">
//                 Click "Try Demo Account" button to auto-fill demo credentials
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Security Note */}
//         <div className="text-center">
//           <p className="text-xs text-[var(--text-primary-muted)] dark:text-gray-500 flex items-center justify-center">
//             <ShieldCheck className="h-3 w-3 mr-1" />
//             Your data is protected with end-to-end encryption
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
// app/login/page.tsx
export default function Login() {
  return (
    <div className="flex h-screen w-full">

      {/* LEFT SIDE */}
      <div
        className="w-1/2 flex items-center justify-center p-10"
        style={{ backgroundColor: "var(--light-bg)" }}
      >
        <div className="w-full max-w-md">

          <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text-dark)" }}>
            Welcome back!
          </h1>

          <p className="mb-8 text-sm" style={{ color: "var(--text-primary-muted)" }}>
            Enter your credentials to access your account
          </p>

          {/* Email */}
          <label className="text-sm" style={{ color: "var(--text-dark)" }}>
            Email address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mt-1 mb-4 px-4 py-2 rounded-md border bg-white"
            style={{ borderColor: "var(--border)", color: "var(--text-dark)" }}
          />

          {/* Password */}
          <label className="text-sm" style={{ color: "var(--text-dark)" }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full mt-1 mb-2 px-4 py-2 rounded-md border bg-white"
            style={{ borderColor: "var(--border)", color: "var(--text-dark)" }}
          />

          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center gap-2 text-sm" style={{ color: "var(--text-dark)" }}>
              <input type="checkbox" />
              Remember for 30 days
            </label>
            <a href="#" className="text-sm" style={{ color: "var(--primary-green)" }}>
              Forgot your password?
            </a>
          </div>

          {/* Login Button */}
          <button
            className="w-full py-2 rounded-md font-semibold hover:opacity-90 transition"
            style={{ backgroundColor: "var(--primary-green)", color: "var(--text-light)" }}
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }}></div>
            <span className="px-2 text-sm" style={{ color: "var(--text-primary-muted)" }}>
              or
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }}></div>
          </div>

          {/* Google Login */}
          <button
            className="w-full py-2 rounded-md flex items-center justify-center gap-2 border hover:bg-gray-100 transition"
            style={{ borderColor: "var(--border)" }}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5"
            />
            <span style={{ color: "var(--text-dark)" }}>Sign in with Google</span>
          </button>

          {/* Sign Up */}
          <p className="text-sm text-center mt-4" style={{ color: "var(--text-dark)" }}>
            Don’t have an account?
            <a href="#" className="ml-1" style={{ color: "var(--primary-green)" }}>
              Sign Up
            </a>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="w-1/2 hidden md:block h-full">
        <img
          src="/landingImage.png"
          alt="Landing"
          className="w-full h-full object-cover"
        />
      </div>

    </div>
  );
}
