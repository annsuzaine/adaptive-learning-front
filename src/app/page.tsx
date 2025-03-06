"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

// Import Poppins font for better readability
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
    <div
      className={`flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-white ${poppins.className}`}
    >
      {/* Subtle Background Gradient & Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.05, 0.1, 0.05],
              scale: [0.9, 1.1, 0.9],
              x: mousePosition.x * 0.01 * (i % 2 ? -1 : 1),
              y: mousePosition.y * 0.01 * (i % 3 ? -1 : 1),
            }}
            transition={{
              duration: 6 + i * 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute rounded-full blur-2xl 
              ${i % 2 === 0 ? "bg-blue-200" : "bg-indigo-200"}
              ${i % 3 === 0 ? "w-36 h-36" : "w-52 h-52"}`}
            style={{
              top: `${20 + (i * 20) % 50}%`,
              left: `${(i * 30) % 70}%`,
              filter: "blur(80px)",
            }}
          />
        ))}
      </div>

      {/* Main Card Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative p-10 md:p-12 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 text-center max-w-2xl mx-4 overflow-hidden"
        style={{
          transform: `perspective(1000px) 
                     rotateX(${(mousePosition.y - window.innerHeight / 2) * 0.003}deg) 
                     rotateY(${-(mousePosition.x - window.innerWidth / 2) * 0.003}deg)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* Subtle Decorative Gradients */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br from-blue-100/10 to-transparent rounded-full blur-xl" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-gradient-to-br from-indigo-100/10 to-transparent rounded-full blur-xl" />

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Adaptive <span className="text-blue-600">Learning</span>
        </h1>

        <p className="mt-2 text-lg text-gray-600">
          Revolutionizing Education with AI
        </p>

        <motion.div
          animate={{ width: ["0%", "100px", "80px"] }}
          transition={{
            duration: 1.5,
            times: [0, 0.7, 1],
            ease: "easeOut",
            delay: 1,
          }}
          className="h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto my-6 rounded-full"
        />

        <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-xl mx-auto mb-8">
          Personalized learning paths tailored just for you. Enhance your skills
          with AI-powered recommendations.
        </p>

        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 25px 6px rgba(96,165,250,0.2)",
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/choose-role")}
          className="group relative px-10 py-4 text-lg font-medium text-white rounded-full shadow-lg flex items-center justify-center mx-auto space-x-2 transition-all bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        <div className="mt-8 flex items-center justify-center space-x-3">
          <div className="w-2.5 h-2.5 bg-blue-300 rounded-full shadow-md" />
          <div className="w-2.5 h-2.5 bg-indigo-300 rounded-full shadow-md" />
          <div className="w-2.5 h-2.5 bg-sky-300 rounded-full shadow-md" />
        </div>
      </motion.div>
    </div>
  );
}