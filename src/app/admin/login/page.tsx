"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setError("");
    console.log("Admin Logged In:", { email });
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.6)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <div className={`flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 text-gray-800 ${poppins.className}`}>
      {/* Subtle animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-300/30"
            style={{
              width: `${50 + i * 20}px`,
              height: `${50 + i * 20}px`,
              top: `${20 + (i * 15)}%`,
              left: `${10 + (i * 20)}%`,
              filter: "blur(40px)"
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative bg-white/95 backdrop-blur-md p-10 rounded-2xl shadow-xl w-[450px] border border-indigo-200/50 overflow-hidden"
      >
        {/* Elegant glowing border effect */}
        <motion.div
          className="absolute inset-0 border-2 border-transparent rounded-2xl pointer-events-none"
          animate={{
            borderImage: "linear-gradient(45deg, #3b82f6, #a855f7, #3b82f6) 1",
            borderImageSlice: 1,
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />

        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          Admin Portal
        </motion.h1>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <motion.p
              variants={itemVariants}
              className="text-red-500 text-sm text-center font-medium"
            >
              {error}
            </motion.p>
          )}

          {/* Email Input */}
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
              Admin Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100/50 border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              placeholder="Enter your email"
            />
          </motion.div>

          {/* Password Input */}
          <motion.div variants={itemVariants}>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100/50 border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              placeholder="Enter your password"
            />
          </motion.div>

          {/* Login Button */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            type="submit"
            className="relative w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-lg overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative z-10">Login</span>
          </motion.button>
        </form>

        {/* Back to Home Link */}
        <motion.div variants={itemVariants} className="text-center mt-5">
          <Link href="/" className="text-indigo-600 hover:text-indigo-700 text-sm transition duration-200">
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}