// src/pages/AdminPage.jsx
import { Link, Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../components/loading";
import AdminQSJobsPage from "./admin/AdminQSJobs";
import AdminITJobsPage from "./admin/AdminITJobs";

export default function AdminPage() {
  const location = useLocation();
  const path = location.pathname;

  const [status, setStatus] = useState("loading");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      setStatus("unauthenticated");
      window.location.href = "/admin/login"; // fix: your login route is /admin/login
      return;
    }
    setStatus("authenticated");
  }, []);

  function getClass(routePart) {
    const isActive = path.includes(routePart);
    return `
      flex items-center rounded-md px-4 py-3 font-semibold transition
      ${isActive ? "bg-gray-900 text-white" : "text-gray-800 hover:bg-gray-100"}
    `;
  }

  function handleLogout() {
    toast.success("Logout successful");
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  if (status === "loading") return <Loading />;
  if (status === "unauthenticated") return <Loading />;

  return (
    <div className="w-full h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="h-full w-[260px] bg-white shadow-md py-8 flex flex-col gap-3 border-r">
        <h1 className="text-2xl font-bold text-gray-900 px-4 mb-6">
          Admin Panel
        </h1>

        {/* Make this open your QS Jobs page */}
        <Link className={getClass("qs-jobs")} to="/admin/qs-jobs">
          QS Jobs
        </Link>

        <Link className={getClass("it-jobs")} to="/admin/it-jobs">
          IT Jobs
        </Link>

        <Link className={getClass("orders")} to="/admin/reviews">
          Reviews
        </Link>

        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="
            mt-auto mx-4 
            flex items-center justify-center
            rounded-md px-4 py-3
            font-semibold text-red-600
            border border-red-200
            hover:bg-red-50 hover:border-red-300
            transition
          "
        >
          Logout
        </button>
      </aside>

      {/* Logout Confirm */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg w-[320px] p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Confirm Logout
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100 transition"
              >
                No
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/admin/qs-jobs" replace />} />

          {/* Your QS jobs page */}
          <Route path="/qs-jobs" element={<AdminQSJobsPage />} />

          {/* Placeholder routes */}
          <Route path="/it-jobs" element={<AdminITJobsPage />} />
          <Route
            path="/reviews"
            element={
              <div className="p-6 bg-white rounded-xl shadow border">
                <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
                <p className="text-gray-600 mt-2">Coming soon...</p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
