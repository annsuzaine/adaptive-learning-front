"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { ReactTyped } from "react-typed";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function HomePage() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`relative flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 ${poppins.className}`}>
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-indigo-50" />
      </div>

      {/* Decorative Patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Decorative Circles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.05, 0.2, 0.05],
              scale: [0.8, 1.1, 0.8],
              x: [`${10 + i * 20}%`, `${40 + i * 10}%`],
              y: [`${20 + i * 20}%`, `${60 - i * 15}%`],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute rounded-full blur-2xl 
              ${i % 2 === 0 ? "bg-blue-300/10" : "bg-indigo-300/10"}
              w-${i % 2 === 0 ? "44" : "52"} h-${i % 2 === 0 ? "44" : "52"}`}
          />
        ))}

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
      </div>

      {/* Main Card with Elegant Design */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{
          scale: 1.02,
          rotateX: (mousePosition.y - window.innerHeight / 2) * 0.002,
          rotateY: -(mousePosition.x - window.innerWidth / 2) * 0.002,
          transition: { duration: 0.2, ease: "easeOut" },
        }}
        className="relative p-10 md:p-12 bg-white/80 rounded-2xl shadow-lg border border-blue-100 text-center max-w-2xl mx-4 overflow-hidden z-10"
      >
        {/* Animated Accent Elements */}
        <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-500/20 blur-xl" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-400/20 to-blue-500/20 blur-xl" />
        
        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold text-gray-800 mb-4"
        >
          Adaptive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Learning</span>
        </motion.h1>

        {/* Typing Animated Subheading */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-2 text-lg text-gray-600"
        >
          <ReactTyped
            strings={[
              "Revolutionizing Education with AI",
              "AI-powered Learning Experience",
              "Personalized Study Paths"
            ]}
            typeSpeed={50}
            backSpeed={30}
            loop
          />
        </motion.p>

        {/* Animated Divider */}
        <motion.div
          animate={{ width: ["0%", "100px", "80px"] }}
          transition={{
            duration: 1.5,
            times: [0, 0.7, 1],
            ease: "easeOut",
            delay: 1,
          }}
          className="h-0.5 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto my-6 rounded-full"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-xl mx-auto mb-8"
        >
          Personalized learning paths tailored just for you. Enhance your skills
          with AI-powered recommendations.
        </motion.p>

        {/* Get Started Button - Elegant & Modern */}
        <motion.div className="flex justify-center mt-6">
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 5px 15px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            className="relative px-12 py-4 text-lg font-medium text-white rounded-full shadow-md 
              bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 
              transition-all duration-300 flex items-center gap-2"
            onClick={() => router.push("/choose-role")}
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}