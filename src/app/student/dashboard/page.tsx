"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Poppins } from "next/font/google";
import { auth, signOut, onAuthStateChanged } from "@/lib/firebase";
import { 
  FaGraduationCap, 
  FaCheckCircle, 
  FaChartLine, 
  FaUserCog, 
  FaSignOutAlt, 
  FaHome,
  FaArrowRight
} from "react-icons/fa";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins" 
});

export default function StudentDashboard() {
  const router = useRouter();
  const [studentName, setStudentName] = useState("");
  const [activeLink, setActiveLink] = useState("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/student/login"); // Redirect to login if not authenticated
      } else {
        const storedName = localStorage.getItem("studentName") || user.email;
        setStudentName(storedName);
      }
      setIsLoading(false);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) setIsMobileSidebarOpen(false);
    });
    
    return () => {
      unsubscribe();
      window.removeEventListener("resize", () => {});
    };
  }, [router]);

  const sidebarVariants = {
    hidden: { opacity: 0, x: -250 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 25 } }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("studentName");
    router.push("/student/login");
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-screen bg-gray-50 ${poppins.className}`}>
        <div className="text-2xl text-gray-600">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen bg-gray-50 text-gray-800 ${poppins.className}`}>
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-20 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Enhanced Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        className={`fixed md:relative w-72 h-full bg-white shadow-xl border-r border-gray-100 p-6 flex flex-col z-30 ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Learning Portal</h1>
            <p className="text-sm text-gray-500 mt-1">Automatic Distillators</p>
          </div>
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="space-y-3 flex-1">
          {[
            { href: "/student/dashboard", icon: FaHome, label: "Overview", id: "dashboard" },
            { href: "/student/dashboard/courses", icon: FaGraduationCap, label: "My Learning", id: "courses" },
            { href: "/student/dashboard/assessments", icon: FaCheckCircle, label: "Assessments", id: "assessments" },
            { href: "/student/dashboard/report", icon: FaChartLine, label: "Performance", id: "report" },
            { href: "/student/dashboard/profile", icon: FaUserCog, label: "Settings", id: "profile" }
          ].map(({ href, icon: Icon, label, id }) => (
            <motion.div key={id} whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
              <Link 
                href={href} 
                className={`flex items-center space-x-4 text-lg p-4 rounded-xl ${
                  activeLink === id 
                    ? "bg-blue-50 text-blue-600 shadow-md" 
                    : "text-gray-700 hover:bg-blue-50/50"
                }`}
                onClick={() => setActiveLink(id)}
              >
                <Icon className="text-2xl" />
                <span className="font-medium">{label}</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-gray-100">
          <div className="flex items-center p-4 mb-4 hover:bg-gray-50 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl">
              {studentName.charAt(0).toUpperCase()}
            </div>
            <div className="ml-4">
              <p className="text-lg font-semibold text-gray-900">{studentName}</p>
              <p className="text-sm text-gray-500">Academic Account</p>
            </div>
          </div>
          
          <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 text-lg w-full p-4 text-gray-700 hover:text-red-600 rounded-xl hover:bg-red-50"
            >
              <FaSignOutAlt className="text-xl" />
              <span className="font-medium">Sign Out</span>
            </button>
          </motion.div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center px-8 sticky top-0 z-10">
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700 mr-4"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Welcome, {studentName}</h2>
        </header>

        {/* Enhanced Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto space-y-8"
          >
            {/* Welcome Section */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Continue Your Learning Journey</h1>
              <p className="text-xl text-gray-600">
                Access curated resources and track your academic progress
              </p>
            </motion.div>

            {/* Feature Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[
                { 
                  title: "Learning Resources",
                  description: "Access your personalized learning path with curated materials",
                  icon: FaGraduationCap,
                  color: "bg-blue-100 text-blue-600"
                },
                { 
                  title: "Assessments & Tasks",
                  description: "Review upcoming assignments and knowledge evaluations",
                  icon: FaCheckCircle,
                  color: "bg-green-100 text-green-600"
                },
                { 
                  title: "Performance Insights",
                  description: "Access detailed analytics to track your academic progress",
                  icon: FaChartLine,
                  color: "bg-purple-100 text-purple-600"
                },
                { 
                  title: "Account Management",
                  description: "Manage your personal information and portal preferences",
                  icon: FaUserCog,
                  color: "bg-orange-100 text-orange-600"
                }
              ].map(({ title, description, icon: Icon, color }, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                >
                  <div className="flex items-start gap-6">
                    <div className={`${color} p-4 rounded-xl`}>
                      <Icon className="text-3xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
                      <p className="text-lg text-gray-600 mb-6">{description}</p>
                      <div className="flex items-center justify-between">
                        <Link 
                          href="#"
                          className="text-lg font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-2"
                        >
                          Access Now
                          <FaArrowRight className="mt-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}