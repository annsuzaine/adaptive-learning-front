"use client";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/admin/login"); // Redirect to login after logout
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="space-y-4">
          <p className="hover:text-blue-400 cursor-pointer">📊 View Reports</p>
          <p className="hover:text-blue-400 cursor-pointer">📚 Manage Courses</p>
          <p className="hover:text-blue-400 cursor-pointer">✅ Approve Students</p>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-10 w-full text-center py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg transition duration-300"
        >
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin! 👨‍💼</h1>
        <p className="mt-2 text-gray-600">Manage student progress and courses.</p>
      </main>
    </div>
  );
}
