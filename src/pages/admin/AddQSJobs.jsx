import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddQSJobPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  function AddQSJob() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    const qsjobdetails = {
      name,
      email,
      whatsappNumber,
      jobCategory,
      message,
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/qs-jobs`, qsjobdetails, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(() => {
        toast.success("QS Job added successfully");
        navigate("/admin/qs-jobs");
      })
      .catch((e) => {
        toast.error(e?.response?.data?.message || "Something went wrong");
      });
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 " +
    "placeholder:text-gray-400 shadow-sm " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New QS Job</h1>
          <p className="text-sm text-gray-600 mt-2">
            Fill in the details below to create a new QS job.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Client Name
            </label>
            <input
              type="text"
              placeholder="Enter client name"
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter client email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              WhatsApp Number
            </label>
            <input
              type="text"
              placeholder="+94xxxxxxxxx"
              className={inputClass}
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Job Category
            </label>
            <input
              type="text"
              placeholder="BOQ / Takeoff, Cost Estimation, etc."
              className={inputClass}
              value={jobCategory}
              onChange={(e) => setJobCategory(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Describe the QS requirement..."
              className={`${inputClass} min-h-[140px] resize-y`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="w-full flex justify-end items-center mt-8 gap-3">
          <Link
            to="/admin/qs-jobs"
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </Link>

          <button
            onClick={AddQSJob}
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold
                       hover:bg-blue-700 shadow-md transition active:scale-95"
          >
            Add QS Job
          </button>
        </div>
      </div>
    </div>
  );
}
