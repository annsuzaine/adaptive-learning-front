"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";

// Configure Poppins font with specific weights
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError("All fields are required.");
      return;
    }
    // Simulate signup (replace with actual API call in production)
    console.log("User Signed Up:", { fullName, email });
    router.push("/student/dashboard");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.23, 1.02, 0.36, 1],
        delayChildren: 0.2,
        staggerChildren: 0.15 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.23, 1.02, 0.36, 1] }
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen text-gray-800 ${poppins.className}`}>
      {/* Futuristic animated background */}
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {[...Array(12)].map((_, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.05, 0.15, 0.05],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{ 
              duration: 8 + i * 1.5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            className={`absolute rounded-full blur-3xl 
              ${i % 3 === 0 ? 'bg-indigo-100' : i % 3 === 1 ? 'bg-purple-100' : 'bg-fuchsia-100'}
              ${i % 2 === 0 ? 'w-72 h-72' : 'w-80 h-80'}`}
            style={{ 
              top: `${10 + (i * 15) % 70}%`, 
              left: `${(i * 20) % 90}%`,
              filter: 'blur(90px)'
            }}
          />
        ))}
      </div>

      {/* Glass-morphism form container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative p-8 bg-white/20 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/20 max-w-md w-full mx-4 z-10"
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-fuchsia-500/10 rounded-3xl" />

        <div className="relative z-10">
          {/* Title with futuristic glow */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center mb-6"
          >
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">
              Student Sign up
            </h1>
          </motion.div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-6">
            {error && (
              <motion.p
                variants={itemVariants}
                className="text-red-500 font-semibold text-center"
              >
                {error}
              </motion.p>
            )}

            {/* Full Name Field */}
            <motion.div variants={itemVariants} className="relative">
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-4 pt-6 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-gray-800 placeholder-transparent peer"
                placeholder="Your Name"
                aria-required="true"
              />
              <label
                htmlFor="fullName"
                className="absolute left-4 top-1 text-gray-600 text-sm transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm"
              >
                Full Name
              </label>
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants} className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 pt-6 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-gray-800 placeholder-transparent peer"
                placeholder="Gmail"
                aria-required="true"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-1 text-gray-600 text-sm transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm"
              >
                Email
              </label>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants} className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 pt-6 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-gray-800 placeholder-transparent peer"
                placeholder="password"
                aria-required="true"
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-1 text-gray-600 text-sm transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm"
              >
                Password
              </label>
            </motion.div>

            {/* Submit Button with Hover Effect */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="relative w-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-semibold py-4 rounded-full shadow-lg overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div 
                className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-20deg]"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, ease: "easeOut", repeat: Infinity, repeatDelay: 3 }}
              />
              <span className="relative">Sign Up</span>
            </motion.button>
          </form>

          {/* Login Link */}
          <motion.div variants={itemVariants} className="text-center mt-6 text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <a href="/student/login" className="text-fuchsia-600 hover:text-fuchsia-500 transition-colors duration-200">
              Login
            </a>
          </motion.div>

          {/* Futuristic Pagination Dots */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center mt-8 space-x-3"
          >
            {['indigo', 'purple', 'fuchsia'].map((color, i) => (
              <motion.div
                key={color}
                className={`w-3 h-3 ${
                  color === 'indigo' ? 'bg-indigo-400' : 
                  color === 'purple' ? 'bg-purple-400' : 'bg-fuchsia-400'
                } rounded-full shadow-lg`}
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}