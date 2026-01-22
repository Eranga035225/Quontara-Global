import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import { sampleJobsQS } from "../../assets/sampleData";
import { QSDOMAINS } from "../../components/JobCategorySelect";

function truncate(str, n = 60) {
  if (!str) return "";
  return str.length > n ? str.slice(0, n) + "…" : str;
}

export default function AdminQSJobsPage() {
  const [qsjobs, setQsJobs] = useState(sampleJobsQS);
  const [isLoading, setIsLoading] = useState(true);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState(null);
  const [updateJobId, setUpdateJobId] = useState(null);
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
  const [newStatus, setNewStatus] = useState("pending");

  const [showView, setShowView] = useState(false);
  const [viewItem, setViewItem] = useState(null);

  const backendBase = useMemo(() => {
    const base = import.meta.env.VITE_BACKEND_URL || "";
    return base.endsWith("/") ? base.slice(0, -1) : base;
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    axios
      .get(`${backendBase}/api/qs-jobs`)
      .then((res) => {
        setQsJobs(Array.isArray(res.data) ? res.data : []);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error("Error fetching jobs");
        setQsJobs([]);
        setIsLoading(false);
      });
  }, [isLoading, backendBase]);

  const categoryLabelMap = useMemo(() => {
    const map = new Map();

    for (const d of QSDOMAINS) {
      for (const s of d.subtopics) {
        map.set(s.value, `${s.label}`);
      }
    }

    return map;
  }, [QSDOMAINS]);

  function getCategoryLabel(value) {
    return categoryLabelMap.get(value) || value || "-";
  }

  function openDeleteModal(jobId) {
    setDeleteJobId(jobId);
    setShowDeleteConfirm(true);
  }

  function closeDeleteModal() {
    setShowDeleteConfirm(false);
    setDeleteJobId(null);
  }

  function openUpdateModal(jobId) {
    setUpdateJobId(jobId);

    const job = qsjobs.find((j) => j._id === jobId);
    setNewStatus(job?.status || "pending");

    setShowUpdateConfirm(true);
  }

  function closeUpdateModal() {
    setShowUpdateConfirm(false);
    setUpdateJobId(null);
  }

  function openViewModal(item) {
    setViewItem(item);
    setShowView(true);
  }

  function closeViewModal() {
    setShowView(false);
    setViewItem(null);
  }

  function deleteProduct(jobId) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    axios
      .delete(`${backendBase}/api/qs-jobs/${jobId}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(() => {
        toast.success("Deleted successfully");
        closeDeleteModal();
        setIsLoading(true);
      })
      .catch((e) => {
        toast.error(e?.response?.data?.message || "Something went wrong");
      });
  }

  function updateStatus(jobId, newStatus) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    axios
      .put(
        `${backendBase}/api/qs-jobs/${jobId}`,
        { status: newStatus },
        {
          headers: { Authorization: "Bearer " + token },
        },
      )
      .then(() => {
        toast.success("Status updated successfully");
        closeUpdateModal();
        setIsLoading(true);
      })
      .catch((e) => {
        toast.error(e?.response?.data?.message || "Something went wrong");
      });
  }

  function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function formatTime(dateString) {
    const date = new Date(dateString);

    return date.toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  function escapeCsv(value) {
    if (value === null || value === undefined) return "";
    const str = String(value);
    // Wrap in quotes if it contains comma, quote, or newline
    if (/[,"\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
    return str;
  }

  function downloadQSJobsCSV() {
    if (!Array.isArray(qsjobs) || qsjobs.length === 0) {
      toast.error("No jobs to export");
      return;
    }

    const headers = [
      "Job ID",
      "Name",
      "Email",
      "Whatsapp",
      "Category",
      "Description",
      "Date",
      "Time",
      "Status",
    ];

    const rows = qsjobs.map((item) => [
      item.qsJobId,
      item.name,
      item.email,
      item.whatsappNumber,
      getCategoryLabel(item.jobCategory),
      item.jobDescription,
      formatDate(item.date),
      formatTime(item.date),
      item.status,
    ]);

    const csv =
      "\uFEFF" + // Excel UTF-8 BOM
      [headers, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;

    const now = new Date();

    const date = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const time = now
      .toTimeString()
      .slice(0, 8) // HH:MM:SS
      .replace(/:/g, "-"); // HH-MM-SS

    a.download = `qs-jobs-${date}_${time}.csv`;

    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);

    toast.success("CSV downloaded");
  }

  return (
    <div className="w-full h-full flex flex-col bg-gray-100 rounded-xl border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-200 bg-white rounded-t-xl">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">QS Jobs</h1>
          <p className="text-sm text-gray-600 mt-1">
            View, edit, and manage submitted jobs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={downloadQSJobsCSV}
            className="hidden sm:inline-flex items-center gap-2 bg-white text-gray-900 font-semibold py-2.5 px-5 rounded-full border border-gray-300 shadow-sm hover:bg-gray-50 transition"
          >
            Download CSV
          </button>

          <Link
            to="/admin/add-qsjob"
            className="hidden sm:inline-flex items-center gap-2 bg-gray-900 text-white font-semibold py-2.5 px-5 rounded-full shadow hover:bg-gray-800 transition"
          >
            <span className="text-lg leading-none">+</span>
            <span>Add</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
        {isLoading ? (
          <div className="w-full h-[40vh] flex justify-center items-center">
            <div className="w-[70px] h-[70px] border-[5px] border-gray-300 border-t-gray-900 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* ✅ Desktop/Table (md+) */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-[1100px] w-full text-sm">
                  <thead>
                    <tr className="bg-gray-900 text-white">
                      <th className="py-3 px-4 text-left font-semibold w-[220px]">
                        Job ID
                      </th>
                      <th className="py-3 px-4 text-left font-semibold w-[180px]">
                        Name
                      </th>
                      <th className="py-3 px-4 text-left font-semibold w-[240px]">
                        Email
                      </th>
                      <th className="py-3 px-4 text-left font-semibold w-[180px]">
                        Whatsapp
                      </th>
                      <th className="py-3 px-4 text-left font-semibold w-[240px] whitespace-nowrap">
                        Category
                      </th>
                      <th className="py-3 px-4 text-left font-semibold">
                        Description
                      </th>
                      <th className="py-3 px-4 text-left font-semibold w-[220px] whitespace-nowrap">
                        Date & Time
                      </th>
                      <th className="py-3 px-4 text-left font-semibold">
                        Status
                      </th>
                      <th className="py-3 px-4 text-center font-semibold w-[160px]">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {qsjobs.map((item) => (
                      <tr
                        key={item._id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition"
                      >
                        <td className="py-3 px-4 text-gray-700 font-mono">
                          {item.qsJobId}
                        </td>

                        <td className="py-3 px-4 text-gray-900 font-medium">
                          {item.name}
                        </td>

                        <td className="py-3 px-4 text-gray-700">
                          {item.email}
                        </td>

                        <td className="py-3 px-4 text-gray-900 font-semibold">
                          {item.whatsappNumber}
                        </td>

                        <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                          {getCategoryLabel(item.jobCategory)}
                        </td>

                        <td className="py-3 px-4 text-gray-700">
                          <div className="flex items-center gap-3">
                            <span className="block max-w-[420px] truncate">
                              {item.message}
                            </span>
                            <button
                              type="button"
                              onClick={() => openViewModal(item)}
                              className="inline-flex items-center gap-2 text-gray-900 hover:underline"
                              title="View full description"
                            >
                              <FaEye />
                              <span className="text-xs">View</span>
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                          <div className="flex flex-col leading-tight">
                            <span className="font-medium">
                              {formatDate(item.date)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatTime(item.date)}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize
      ${
        item.status === "pending"
          ? "bg-yellow-100 text-yellow-800"
          : item.status === "approved"
            ? "bg-blue-100 text-blue-800"
            : item.status === "done"
              ? "bg-green-100 text-green-800"
              : item.status === "overdue"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
      }
    `}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex justify-center items-center gap-3">
                            <button
                              type="button"
                              onClick={() => openDeleteModal(item._id)}
                              className="p-2 rounded-full bg-red-50 hover:bg-red-100 transition"
                              title="Delete"
                            >
                              <FaTrash className="text-red-600 text-[18px]" />
                            </button>

                            <button
                              type="button"
                              onClick={() => openUpdateModal(item._id)}
                              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                              title="Edit"
                            >
                              <FaEdit className="text-gray-900 text-[18px]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {qsjobs.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-12 text-center text-gray-600"
                        >
                          No jobs found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ✅ Mobile/Card list (sm and below) */}
            <div className="md:hidden space-y-4">
              {qsjobs.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Job ID</p>
                      <p className="text-sm font-mono text-gray-800 break-all">
                        {item.qsJobId}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openDeleteModal(item._id)}
                        className="p-2 rounded-full bg-red-50 hover:bg-red-100 transition"
                        title="Delete"
                      >
                        <FaTrash className="text-red-600 text-[18px]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => openUpdateModal(item._id)}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                        title="Edit"
                      >
                        <FaEdit className="text-gray-900 text-[18px]" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {item.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm text-gray-800 break-all">
                        {item.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Whatsapp</p>
                      <p className="text-sm text-gray-900 font-semibold">
                        {item.whatsappNumber}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Category</p>
                      <p className="text-sm text-gray-800">
                        {item.jobCategory}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Description</p>
                      <p className="text-sm text-gray-800">
                        {truncate(item.message, 120)}
                      </p>

                      <button
                        type="button"
                        onClick={() => openViewModal(item)}
                        className="mt-2 inline-flex items-center gap-2 text-gray-900 font-semibold hover:underline"
                      >
                        <FaEye />
                        View full
                      </button>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Date & Time</p>
                      <p className="text-sm text-gray-800 leading-tight">
                        {formatDate(item.date)}{" "}
                        <span className="text-xs text-gray-500">
                          {formatTime(item.date)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {qsjobs.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-600">
                  No jobs found.
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* View Modal */}
      {showView && viewItem && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
          onClick={closeViewModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-[92vw] max-w-[650px] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Job Description
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {viewItem.name} • {getCategoryLabel(viewItem.jobCategory)}
                </p>
              </div>
              <button
                onClick={closeViewModal}
                className="px-3 py-1.5 rounded-md border text-gray-700 hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                {viewItem.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
          onClick={closeDeleteModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-[320px] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Confirm Delete
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this job?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100 transition"
              >
                No
              </button>

              <button
                onClick={() => deleteProduct(deleteJobId)}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Status Modal */}
      {showUpdateConfirm && updateJobId && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
          onClick={closeUpdateModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-[360px] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Update Status
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              Choose a new status for this job.
            </p>

            <label className="text-sm font-semibold text-gray-700">
              Status
            </label>

            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            >
              <option value="pending">Pending</option>
              <option value="done">Done</option>
              <option value="overdue">Overdue</option>
              <option value="approved">Approved</option>
            </select>

            {/* Live badge preview */}
            <div className="mt-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize
            ${
              newStatus === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : newStatus === "approved"
                  ? "bg-blue-100 text-blue-800"
                  : newStatus === "done"
                    ? "bg-green-100 text-green-800"
                    : newStatus === "overdue"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
            }
          `}
              >
                {newStatus}
              </span>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeUpdateModal}
                className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => updateStatus(updateJobId, newStatus)}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
