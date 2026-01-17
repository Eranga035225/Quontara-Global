import SectionTitle from "../components/section-title";
import { ArrowUpRight, SendIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import JobCategorySelect from "../components/JobCategorySelect";
import toast from "react-hot-toast";
import axios from "axios";

export default function JobPostSection() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      whatsappNumber: whatsapp,
      jobCategory: category,
      message: message,
    };

    console.log("Job Post Payload:", payload);

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/qs-jobs",
        {
          ...payload,
        },
      );
      toast.success(
        response?.data?.message || "Job post submitted successfully!",
      );
      setIsSubmitting(false);
      setEmail("");
      setName("");
      setWhatsapp("");
      setCategory("");
      setMessage("");
    } catch (err) {
      console.error("Error submitting job post:", err);
      toast.error("Error submitting job post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col items-center -mt-20" id="contact">
      <SectionTitle
        title="Post Your Job"
        description="A visual collection of our most recent works - each piece crafted with intention, emotion, and style."
      />
      <form
        onSubmit={handleSubmit}
        className="grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-3xl mx-auto text-slate-400 mt-16 w-full"
      >
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
        >
          <label className="font-medium text-slate-200">Your name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter your name"
            className="w-full mt-2 p-3 outline-none border border-slate-700 rounded-lg focus-within:ring-1 transition focus:ring-indigo-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
        >
          <label className="font-medium text-slate-200">Email id</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full mt-2 p-3 outline-none border border-slate-700 rounded-lg focus-within:ring-1 transition focus:ring-indigo-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
        >
          <label className="font-medium text-slate-200">Whatsapp Number</label>
          <input
            name="whatsapp"
            type="text"
            placeholder="Enter your Whatsapp Contacts"
            className="w-full mt-2 p-3 outline-none border border-slate-700 rounded-lg focus-within:ring-1 transition focus:ring-indigo-600"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 70, mass: 1 }}
        >
          <label className="font-medium text-slate-200">Job Category</label>
          <JobCategorySelect value={category} onChange={setCategory} />
        </motion.div>

        <motion.div
          className="sm:col-span-2"
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
        >
          <label className="font-medium text-slate-200">Message</label>
          <textarea
            name="message"
            rows={8}
            placeholder="Enter your message"
            className="resize-none w-full mt-2 p-3 outline-none rounded-lg focus-within:ring-1 transition focus:ring-indigo-600 border border-slate-700"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </motion.div>

        <motion.button
          type="submit"
          className="w-max flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full"
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
        >
          {isSubmitting ? "Submitting..." : "Submit Job"}
          <ArrowUpRight className="size-4.5" />
        </motion.button>
      </form>
    </section>
  );
}
