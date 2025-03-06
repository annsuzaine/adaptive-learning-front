"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Poppins } from "next/font/google";
import { LogIn, UserPlus, MailCheck } from "lucide-react";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function StudentLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError("Please fill in all fields");
      return;
    }
    setLoginError("");
    // Simulate login API call
    setIsLoading(true);
    setTimeout(() => {
      router.push("/student/dashboard");
      setIsLoading(false);
    }, 1000);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      setForgotError("Please enter your email address");
      return;
    }
    setForgotError("");
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setResetSent(true);
      setTimeout(() => {
        setIsForgotModalOpen(false);
        setResetSent(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className={`flex items-center justify-center min-h-screen px-6 ${poppins.className}`}
      style={{
        background: "radial-gradient(circle at center, #eef2ff 0%, #c7d2fe 100%)"
      }}
    >
      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative p-10 bg-white/90 backdrop-blur-2xl shadow-2xl rounded-3xl border border-white/30 w-full max-w-md mx-4"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6"
        >
          <LogIn className="w-12 h-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600" />
        </motion.div>

        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
          Student Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          {loginError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center"
            >
              {loginError}
            </motion.p>
          )}

          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 pt-6 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-gray-900 placeholder-transparent peer"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-1 text-gray-600 text-sm transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm"
            >
              Email Address
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 pt-6 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-gray-900 placeholder-transparent peer"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-1 text-gray-600 text-sm transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm"
            >
              Password
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-bold py-4 rounded-full shadow-xl relative overflow-hidden"
          >
            {isLoading ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex items-center justify-center"
              >
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Authenticating...
              </motion.span>
            ) : (
              "Login"
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-sm text-center space-y-4">
          <button
            onClick={() => setIsForgotModalOpen(true)}
            className="text-indigo-600 hover:text-fuchsia-600 transition-colors duration-200"
          >
            Forgot Password?
          </button>
          <div className="text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => router.push("/student/signup")}
              className="text-fuchsia-600 hover:text-indigo-600 transition-colors duration-200"
            >
              Sign Up
            </button>
          </div>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {isForgotModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white/90 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-white/30 w-full max-w-md mx-4"
            >
              <div className="flex justify-center mb-6">
                <MailCheck className="w-12 h-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600" />
              </div>

              <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                Password Recovery
              </h2>

              {resetSent ? (
                <div className="text-center py-6">
                  <p className="text-green-600 mb-4">Reset instructions sent to your email!</p>
                  <button
                    onClick={() => setIsForgotModalOpen(false)}
                    className="text-indigo-600 hover:text-fuchsia-600 transition-colors duration-200"
                  >
                    Return to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-6">
                  <div className="relative">
                    <input
                      type="email"
                      id="forgotEmail"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full p-4 pt-6 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-gray-900 placeholder-transparent peer"
                    />
                    <label
                      htmlFor="forgotEmail"
                      className="absolute left-4 top-1 text-gray-600 text-sm transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>

                  {forgotError && (
                    <p className="text-red-500 text-sm text-center">{forgotError}</p>
                  )}

                  <div className="flex justify-between gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setIsForgotModalOpen(false)}
                      className="flex-1 bg-gray-100 text-gray-600 hover:bg-gray-200 py-3 rounded-lg transition"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white py-3 rounded-lg relative overflow-hidden"
                    >
                      {isLoading ? "Sending..." : "Reset Password"}
                    </motion.button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}