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
        router.push("/student/login");
      } else {
        setStudentName(user.displayName || user.email.split("@")[0]);
      }
      setTimeout(() => setIsLoading(false), 600);
    });

    const handleResize = () => {
      if (window.innerWidth > 768) setIsMobileSidebarOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/student/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100 ${poppins.className}`}>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-t-4 border-blue-600 border-solid rounded-full animate-spin mb-4"></div>
          <div className="text-xl text-gray-700 font-semibold">Loading Your Dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 ${poppins.className}`}>
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-20 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed md:relative w-72 h-full bg-gradient-to-b from-white to-gray-50 shadow-lg border-r border-gray-100 p-6 flex flex-col z-30 transition-transform duration-300 ease-in-out ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        initial={{ x: -288 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-blue-600 tracking-tight">Learning Portal</h1>
            <p className="text-sm text-gray-500 mt-1">Adaptive Learning Hub</p>
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

        <nav className="space-y-4 flex-1">
          {[ 
            { href: "/student/dashboard", icon: FaHome, label: "Overview", id: "dashboard" },
            { href: "/student/dashboard/courses", icon: FaGraduationCap, label: "My Learning", id: "courses" },
            { href: "/student/dashboard/assessments", icon: FaCheckCircle, label: "Assessments", id: "assessments" },
            { href: "/student/dashboard/report", icon: FaChartLine, label: "Performance", id: "report" },
            { href: "/student/dashboard/profile", icon: FaUserCog, label: "Settings", id: "profile" }
          ].map(({ href, icon: Icon, label, id }) => (
            <motion.div 
              key={id} 
              whileHover={{ x: 8, scale: 1.02 }} 
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link 
                href={href} 
                className={`flex items-center space-x-4 text-lg p-4 rounded-xl transition-all duration-200 ${
                  activeLink === id 
                    ? "bg-blue-50 text-blue-600 shadow-md" 
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-500"
                }`}
                onClick={() => setActiveLink(id)}
              >
                <Icon className={`text-2xl ${activeLink === id ? "text-blue-600" : "text-gray-600"}`} />
                <span className="font-semibold">{label}</span>
                {activeLink === id && <FaArrowRight className="ml-auto text-blue-500" />}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-gray-100">
          <div className="flex items-center p-4 mb-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-semibold shadow-md">
              {studentName.charAt(0).toUpperCase()}
            </div>
            <div className="ml-4">
              <p className="text-lg font-bold text-gray-900">{studentName}</p>
              <p className="text-sm text-gray-600">Academic Account</p>
            </div>
          </div>
          
          <motion.div whileHover={{ x: 8, scale: 1.02 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 text-lg w-full p-4 text-gray-700 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors duration-200"
            >
              <FaSignOutAlt className="text-xl" />
              <span className="font-semibold">Sign Out</span>
            </button>
          </motion.div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center">
            <button 
              className="md:hidden text-gray-500 hover:text-gray-700 mr-4"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome, {studentName}</h2>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">My Learning</h3>
              <Link href="/student/dashboard/courses" className="text-purple-600 font-semibold hover:underline hover:text-purple-700 transition-colors">
                Go to My Learning
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Assessments</h3>
              <Link href="/student/dashboard/assessments" className="text-purple-600 font-semibold hover:underline hover:text-purple-700 transition-colors">
                View Assessments
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Performance</h3>
              <Link href="/student/dashboard/report" className="text-purple-600 font-semibold hover:underline hover:text-purple-700 transition-colors">
                View Performance
              </Link>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}