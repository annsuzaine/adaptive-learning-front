"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import { useState, useEffect } from "react";
import { UserCircle, ShieldCheck, ArrowLeft } from "lucide-react";

// Import Poppins font with expanded weights
const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
});

export default function RoleSelection() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.7, 
        ease: [0.23, 1.02, 0.36, 1],
        delayChildren: 0.2,
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.23, 1.02, 0.36, 1] }
    }
  };

  const buttonVariants = {
    initial: { scale: 1, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" },
    hover: (role: string) => ({ 
      scale: 1.05, 
      boxShadow: role === 'student' 
        ? "0 8px 40px rgba(59, 130, 246, 0.3)" 
        : "0 8px 40px rgba(99, 102, 241, 0.3)",
      transition: { duration: 0.3 }
    }),
    tap: { scale: 0.97 }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-white ${poppins.className}`}>
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

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        className="relative p-10 md:p-12 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 text-center w-[480px] mx-4 z-10"
        style={{
          transform: `perspective(1000px) 
                     rotateX(${(mousePosition.y - window.innerHeight / 2) * 0.003}deg) 
                     rotateY(${-(mousePosition.x - window.innerWidth / 2) * 0.003}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br from-blue-100/10 to-transparent rounded-full blur-xl" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-gradient-to-br from-indigo-100/10 to-transparent rounded-full blur-xl" />
        
        <div className="relative z-10">
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight"
          >
            Choose Your <span className="text-blue-600">Role</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-gray-600 mb-10 font-light tracking-wide"
          >
            Select whether you're a Student or an Admin to proceed.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex gap-6 flex-col md:flex-row"
          >
            {/* Student Button */}
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              custom="student"
              onClick={() => router.push("/student/login")}
              onMouseEnter={() => setHoveredButton('student')}
              onMouseLeave={() => setHoveredButton(null)}
              className="relative w-full md:w-1/2 overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 text-white font-medium py-5 px-6 rounded-xl shadow-lg transition-all duration-300 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div 
                className="absolute inset-0 opacity-0 group-hover:opacity-40 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-20deg]"
                animate={hoveredButton === 'student' ? { x: ["-100%", "200%"] } : {}}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <div className="relative flex items-center justify-center">
                <UserCircle className="w-6 h-6 mr-3 text-white" />
                <span className="text-lg">Student</span>
              </div>
            </motion.button>

            {/* Admin Button */}
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              custom="admin"
              onClick={() => router.push("/admin/login")}
              onMouseEnter={() => setHoveredButton('admin')}
              onMouseLeave={() => setHoveredButton(null)}
              className="relative w-full md:w-1/2 overflow-hidden bg-gradient-to-br from-indigo-500 to-indigo-600 text-white font-medium py-5 px-6 rounded-xl shadow-lg transition-all duration-300 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div 
                className="absolute inset-0 opacity-0 group-hover:opacity-40 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-20deg]"
                animate={hoveredButton === 'admin' ? { x: ["-100%", "200%"] } : {}}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <div className="relative flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 mr-3 text-white" />
                <span className="text-lg">Admin</span>
              </div>
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-10"
          >
            <motion.button
              onClick={() => router.push("/")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="text-gray-500 text-sm font-light flex items-center justify-center mx-auto transition-colors duration-300 hover:text-blue-600"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to Home
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}