import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import JobCategorySelect from "../../components/JobCategorySelect";

export default function AddQSJobPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function AddQSJob() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (!name || !email || !whatsappNumber || !jobCategory || !message) {
      toast.error("Please fill all fields");
      return;
    }

    const itjobdetails = {
      name,
      email,
      whatsappNumber,
      jobCategory,
      message,
    };

    setSubmitting(true);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/qs-jobs`, itjobdetails, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(() => {
        toast.success("QS Job added successfully");
        navigate("/admin/qs-jobs");
      })
      .catch((e) => {
        toast.error(e?.response?.data?.message || "Something went wrong");
      })
      .finally(() => setSubmitting(false));
  }

  const labelClass = "text-sm font-semibold text-gray-700";
  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 " +
    "placeholder:text-gray-400 shadow-sm " +
    "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";

  return (
    // ✅ fixed viewport height + no body scroll
    <div className="h-[calc(100vh-80px)] w-full bg-gray-100 px-4 py-4 overflow-hidden">
      {/* Card */}
      <div className="mx-auto w-full max-w-3xl h-full bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col">
        {/* Header (fixed) */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Add New QS Job</h1>
          <p className="text-sm text-gray-600 mt-1">
            Enter client details and job requirements.
          </p>
        </div>

        {/* Form Body (scrolls internally only if needed) */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Client Name</label>
              <input
                type="text"
                placeholder="Enter client name"
                className={inputClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Email</label>
              <input
                type="email"
                placeholder="Enter client email"
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Whatsapp */}
            <div className="flex flex-col gap-2">
              <label className={labelClass}>WhatsApp Number</label>
              <input
                type="text"
                placeholder="+94xxxxxxxxx"
                className={inputClass}
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Job Category</label>
              <div className="-m-2.5">
                <JobCategorySelect
                  value={jobCategory}
                  onChange={setJobCategory}
                />
              </div>
            </div>

            {/* Description full width */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className={labelClass}>Description</label>
              <textarea
                placeholder="Describe the QS requirement..."
                className={`${inputClass} min-h-[120px] resize-none`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Tip: Keep it short and clear (what you need, deadline, budget).
              </p>
            </div>
          </div>
        </div>

        {/* Actions (fixed) */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-white">
          <Link
            to="/admin/qs-jobs"
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </Link>

          <button
            onClick={AddQSJob}
            disabled={submitting}
            className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-white text-sm font-semibold shadow-md active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Saving..." : "Add QS Job"}
          </button>
        </div>
      </div>
    </div>
  );
}
