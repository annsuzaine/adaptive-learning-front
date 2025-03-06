"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import { FaBook, FaCheckCircle, FaChartLine, FaUserCog, FaSignOutAlt } from "react-icons/fa";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function StudentDashboard() {
  const router = useRouter();

  // Sidebar Animation
  const sidebarVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Main Content Animation
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  return (
    <div className={`flex h-screen text-gray-800 ${poppins.className}`}>
      {/* Elegant Light Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(200, 225, 255, 0.2) 0%, transparent 70%)`,
            opacity: 0.7
          }}
        />
      </div>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className="relative w-72 bg-white/90 backdrop-blur-lg p-6 shadow-lg border-r border-gray-200/50 z-10"
      >
        <h2 className="text-3xl font-bold mb-10 text-gray-900">
          Student Dashboard
        </h2>
        <nav className="space-y-3">
          {[
            { href: "/student/dashboard/courses", icon: FaBook, label: "Courses" },
            { href: "/student/dashboard/assessments", icon: FaCheckCircle, label: "Assessments" },
            { href: "/student/dashboard/report", icon: FaChartLine, label: "Student Report" },
            { href: "/student/dashboard/profile", icon: FaUserCog, label: "Profile & Settings" }
          ].map(({ href, icon: Icon, label }) => (
            <motion.div key={label} variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link href={href} className="flex items-center space-x-3 text-lg text-gray-600 hover:text-blue-600 bg-gray-100/50 p-3 rounded-xl transition">
                <Icon className="text-xl" />
                <span>{label}</span>
              </Link>
            </motion.div>
          ))}

          {/* Logout Button - Redirects to Login Page */}
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <button
              onClick={() => router.push("/student/login")}
              className="flex items-center space-x-3 text-lg text-gray-600 hover:text-red-600 bg-gray-100/50 p-3 rounded-xl transition w-full"
            >
              <FaSignOutAlt className="text-xl" />
              <span>Logout</span>
            </button>
          </motion.div>
        </nav>
      </motion.aside>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-10 overflow-auto z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome, Student
          </h1>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-10 leading-relaxed">
            Explore your personalized learning journey and track your progress.
          </motion.p>

          {/* Dashboard Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { href: "/student/dashboard/courses", title: "Your Courses", desc: "Access your enrolled courses and start learning." },
              { href: "/student/dashboard/assessments", title: "Assessments", desc: "Take quizzes and tests to evaluate your knowledge." },
              { href: "/student/dashboard/report", title: "Student Report", desc: "View your performance and progress reports." },
              { href: "/student/dashboard/profile", title: "Profile & Settings", desc: "Manage your account and preferences." }
            ].map(({ href, title, desc }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.05)" }}
                className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md border border-gray-100"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{desc}</p>
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Link href={href} className="inline-block bg-blue-500 text-white font-semibold py-2 px-5 rounded-full hover:bg-blue-600 transition">
                    Explore
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
