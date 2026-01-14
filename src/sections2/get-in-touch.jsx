import SectionTitle from "../components/section-title";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function GetInTouch() {
  return (
    <section className="flex flex-col items-center" id="contact">
      <SectionTitle
        title="Get in touch"
        description="Tell us about your requirements and our IT team will get back to you shortly."
      />

      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-3xl mx-auto text-slate-400 mt-16 w-full"
      >
        {/* Name */}
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
          />
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
        >
          <label className="font-medium text-slate-200">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full mt-2 p-3 outline-none border border-slate-700 rounded-lg focus-within:ring-1 transition focus:ring-indigo-600"
          />
        </motion.div>

        {/* WhatsApp Number */}
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 70, mass: 1 }}
        >
          <label className="font-medium text-slate-200">WhatsApp number</label>
          <input
            name="whatsapp"
            type="tel"
            placeholder="e.g. +94XXXXXXXXX"
            className="w-full mt-2 p-3 outline-none border border-slate-700 rounded-lg focus-within:ring-1 transition focus:ring-indigo-600"
          />
        </motion.div>

        {/* Job Description */}
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 70, mass: 1 }}
        >
          <label className="font-medium text-slate-200">Job description</label>
          <input
            name="job"
            type="text"
            placeholder="Briefly describe the job"
            className="w-full mt-2 p-3 outline-none border border-slate-700 rounded-lg focus-within:ring-1 transition focus:ring-indigo-600"
          />
        </motion.div>

        {/* IT Solution Type */}
        <motion.div
          className="sm:col-span-2"
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
        >
          <label className="font-medium text-slate-200">
            Type of IT solution required
          </label>
          <select
            name="serviceType"
            className="w-full mt-2 p-3 outline-none border border-slate-700 rounded-lg bg-transparent focus-within:ring-1 transition focus:ring-indigo-600"
          >
            <option value="">Select a service</option>
            <option value="mobile-app">Mobile App</option>
            <option value="web-system">Web System</option>
            <option value="ai-ml">AI / ML Project</option>
            <option value="web-hosting">Web Hosting Service</option>
            <option value="other">Other IT Service</option>
          </select>
        </motion.div>

        {/* IMO (Optional) */}
        <motion.div
          className="sm:col-span-2"
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
        >
          <label className="font-medium text-slate-200">
            IMO (optional)
          </label>
          <input
            name="imo"
            type="text"
            placeholder="Enter IMO if applicable"
            className="w-full mt-2 p-3 outline-none border border-slate-700 rounded-lg focus-within:ring-1 transition focus:ring-indigo-600"
          />
        </motion.div>

        {/* Message */}
        <motion.div
          className="sm:col-span-2"
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 220, damping: 70, mass: 1 }}
        >
          <label className="font-medium text-slate-200">Message</label>
          <textarea
            name="message"
            rows={6}
            placeholder="Provide additional details about your requirement"
            className="resize-none w-full mt-2 p-3 outline-none rounded-lg focus-within:ring-1 transition focus:ring-indigo-600 border border-slate-700"
          />
        </motion.div>

        {/* Submit */}
        <motion.button
          type="submit"
          className="w-max flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full"
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
        >
          Submit request
          <ArrowUpRight className="size-4.5" />
        </motion.button>
      </form>
    </section>
  );
}
