"use client";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";

// Configure Poppins font
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function AssessmentsPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
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
    <div className={`min-h-screen text-white ${poppins.className}`}>
      {/* Dynamic animated background */}
      <div className="absolute inset-0 overflow-hidden" style={{ background: 'radial-gradient(circle at center, #1e1b4b 0%, #0f172a 100%)' }}>
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, #4f46e5 0%, #1e1b4b 70%)',
              'radial-gradient(circle at 80% 70%, #7c3aed 0%, #1e1b4b 70%)',
              'radial-gradient(circle at 50% 50%, #9333ea 0%, #1e1b4b 70%)',
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        />
        {[...Array(6)].map((_, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.05, 0.12, 0.05],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{ 
              duration: 6 + i * 1.5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            className={`absolute rounded-full blur-3xl 
              ${i % 3 === 0 ? 'bg-indigo-500' : i % 3 === 1 ? 'bg-purple-500' : 'bg-fuchsia-500'}
              ${i % 2 === 0 ? 'w-72 h-72' : 'w-80 h-80'}`}
            style={{ 
              top: `${15 + (i * 20) % 60}%`, 
              left: `${(i * 25) % 80}%`,
              filter: 'blur(90px)'
            }}
          />
        ))}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`orbit-${i}`}
              className="absolute w-2 h-2 bg-fuchsia-300 rounded-full shadow-lg shadow-fuchsia-400/30"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 120}deg) translateX(${100 + i * 30}px)`
              }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </motion.div>
      </div>

      {/* Subtle overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/20 z-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative p-8 max-w-4xl mx-auto z-10"
      >
        <div className="bg-gray-900/70 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-gray-700/50">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-fuchsia-600/10 rounded-3xl" />
          <div className="absolute -top-24 -right-24 w-56 h-56 bg-gradient-to-br from-indigo-400/15 to-transparent rounded-full blur-2xl" />
          <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-gradient-to-br from-fuchsia-400/15 to-transparent rounded-full blur-2xl" />

          <div className="relative z-10">
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-fuchsia-400 mb-4 drop-shadow-md flex items-center"
            >
              <span className="mr-3 text-3xl">✅</span> Your Assessments
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 leading-relaxed"
            >
              Check your upcoming and completed assessments.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}