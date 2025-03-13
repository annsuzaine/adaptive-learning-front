"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Poppins } from "next/font/google";
import { LogIn, Mail, Lock } from "lucide-react";
import { signInWithEmailAndPassword, auth } from "@/lib/firebase";

// Configure Poppins font with custom weights
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function StudentLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse movement for subtle interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError("Please fill in all fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLoginError("Please enter a valid email address.");
      return;
    }

    // Password length validation
    if (password.length < 8) {
      setLoginError("Password must be at least 8 characters long.");
      return;
    }

    setLoginError("");
    setIsLoading(true);

    try {
      // Firebase login
      await signInWithEmailAndPassword(auth, email, password);
      
      // Store student name (in a real app, this would come from the user profile)
      localStorage.getItem("studentName");
      
      // Redirect to Dashboard
      router.push("/student/dashboard");
    } catch (err) {
      setLoginError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  // Clean, minimalist animated background
  const CleanBackground = () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>

        {[...Array(4)].map((_, i) => (
          <motion.div 
            key={`orb-${i}`}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.05, 0.08, 0.05],
              y: [0, -15, 0],
            }}
            transition={{ 
              duration: 10 + i * 2, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
            className="absolute rounded-full blur-2xl"
            style={{ 
              top: `${20 + (i * 20)}%`, 
              left: `${15 + (i * 25)}%`,
              width: `${150 + i * 30}px`,
              height: `${150 + i * 30}px`,
              background: i % 2 === 0 ? 'rgba(99, 102, 241, 0.06)' : 'rgba(168, 85, 247, 0.06)',
            }}
          />
        ))}

        <motion.div 
          className="absolute w-64 h-64 rounded-full pointer-events-none opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
          }}
          animate={{
            x: mousePosition.x - 150,
            y: mousePosition.y - 150,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 50,
            mass: 0.5
          }}
        />
      </div>
    </>
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.23, 1.02, 0.36, 1],
        delayChildren: 0.2,
        staggerChildren: 0.15 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.98, 
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${poppins.className}`}>
      {/* Clean animated background */}
      <CleanBackground />

      {/* Glass-morphism Login Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/80 max-w-md w-full mx-4 z-10 overflow-hidden"
      >
        {/* Subtle card highlight */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/40 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          {/* Simple and elegant icon */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center shadow-md">
              <LogIn className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Login Title */}
          <motion.h1
            className="text-3xl font-bold text-center mb-8 text-gray-800"
          >
            Student Login
          </motion.h1>

          {/* Error Message */}
          <AnimatePresence mode="wait">
            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded mb-6 relative"
              >
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{loginError}</span>
                </div>
                <button 
                  onClick={() => setLoginError("")} 
                  className="absolute top-2 right-2 text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Form */}
          <motion.form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <label className="absolute left-4 top-2 text-xs text-gray-500 font-medium">Email Address</label>
              <div className="flex items-center">
                <Mail className="absolute left-4 top-9 w-5 h-5 text-indigo-500/70" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 pt-6 pl-12 rounded-lg bg-white/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                  placeholder="Enter your email"
                  aria-required="true"
                />
              </div>
            </div>

            <div className="relative">
              <label className="absolute left-4 top-2 text-xs text-gray-500 font-medium">Password</label>
              <div className="flex items-center">
                <Lock className="absolute left-4 top-9 w-5 h-5 text-indigo-500/70" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 pt-6 pl-12 rounded-lg bg-white/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                  placeholder="Enter your password"
                  aria-required="true"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold py-4 rounded-lg shadow-md relative overflow-hidden flex justify-center items-center gap-2"
            >
              {isLoading ? "Logging In..." : "Login"}
            </motion.button>
          </motion.form>

          {/* Links for Forgot Password and Sign Up */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-8 text-sm space-y-2"
          >
            <div>
              <a href="#" className="text-indigo-600 font-medium hover:text-indigo-500 transition-colors duration-200">
                Forgot Password?
              </a>
            </div>
            <div>
              <span className="text-gray-600">Don't have an account? </span>
              <a href="/student/signup" className="text-indigo-600 font-medium hover:text-indigo-500 transition-colors duration-200">
                Sign Up
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
