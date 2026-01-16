import SectionTitle from "../components/section-title";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 py-20 -mt-40">
      <SectionTitle
        title="About Us"
        description="A multidisciplinary team delivering engineering, digital, and AI-driven solutions."
      />

      <div className="max-w-4xl mx-auto mt-16 space-y-10 text-slate-400 leading-relaxed">
        <motion.p
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
        >
          We are a multidisciplinary solutions company providing services across
          <span className="text-slate-200 font-medium">
            {" "}
            Quantity Surveying, Web Development, AI / Machine Learning, and
            Graphic Design
          </span>
          . Our goal is simple: to help clients plan better, build smarter, and
          deliver faster using a combination of engineering accuracy and modern
          technology.
        </motion.p>

        <motion.p
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.1,
            type: "spring",
            stiffness: 200,
            damping: 30,
          }}
        >
          On the engineering side, we support projects with precise cost
          estimation, quantity take-offs, BOQs, and cost control services. On
          the digital side, we design and build scalable web applications,
          AI-powered tools, and intelligent systems that solve real operational
          problems.
        </motion.p>

        <motion.p
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 30,
          }}
        >
          We believe technology should be practical, reliable, and aligned with
          business goals. That’s why our approach focuses on clear requirements,
          transparent communication, and solutions that are easy to maintain and
          scale.
        </motion.p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 max-w-6xl mx-auto">
        {[
          {
            title: "Technical Accuracy",
            text: "Engineering-grade precision in cost, data, and system design.",
          },
          {
            title: "Practical Innovation",
            text: "We apply AI and technology only where it adds real value.",
          },
          {
            title: "End-to-End Delivery",
            text: "From concept to deployment, we handle the full lifecycle.",
          },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            className="border border-slate-800 rounded-xl p-6 bg-slate-900/30"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, type: "spring", stiffness: 220 }}
          >
            <h3 className="text-slate-100 font-semibold text-lg">
              {item.title}
            </h3>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Closing statement */}
      <motion.div
        className="max-w-3xl mx-auto mt-20 text-center text-slate-300"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-lg">
          Whether you need cost certainty for a construction project, a modern
          web platform, or an AI-powered product, we bring the right expertise
          together to deliver reliable results.
        </p>
      </motion.div>
    </section>
  );
}
