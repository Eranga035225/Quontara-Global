import SectionTitle from "./section-title";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function GetInTouch() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();

    if (isSubmitting) return;

    if (!name || !email || !message) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setIsSubmitting(true);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/send-message`,
        { name, email, message },
      );

      toast.success("Message sent successfully");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      toast.error("Error sending message");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="flex flex-col items-center -mt-20" id="contact">
      <SectionTitle
        title="Get in touch"
        description="A visual collection of our most recent works - each piece crafted with intention, emotion, and style."
      />

      <form
        onSubmit={sendMessage}
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
            type="text"
            value={name}
            placeholder="Enter your name"
            className="w-full mt-2 p-3 outline-none border border-slate-700 rounded-lg focus:ring-1 focus:ring-indigo-600 transition"
            onChange={(e) => setName(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
        >
          <label className="font-medium text-slate-200">Email</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            className="w-full mt-2 p-3 outline-none border border-slate-700 rounded-lg focus:ring-1 focus:ring-indigo-600 transition"
            onChange={(e) => setEmail(e.target.value)}
          />
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
            rows={8}
            value={message}
            placeholder="Enter your message"
            className="resize-none w-full mt-2 p-3 outline-none border border-slate-700 rounded-lg focus:ring-1 focus:ring-indigo-600 transition"
            onChange={(e) => setMessage(e.target.value)}
          />
        </motion.div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`w-max flex items-center gap-2 px-8 py-3 rounded-full text-white
            ${
              isSubmitting
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
          <ArrowUpRight className="size-4.5" />
        </motion.button>
      </form>
    </section>
  );
}
