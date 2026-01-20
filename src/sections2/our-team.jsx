import SectionTitle from "../components/section-title";
import { motion } from "framer-motion";
import { Linkedin, Github, Mail } from "lucide-react";

export default function OurTeam() {
  const team = [
    {
      name: "Vishishta Dilsara",
      role: "Software Engineer",
      bio: "Bachelor of Computing (Hons) in Software Engineering. Full-stack developer and cloud engineer with DevOps expertise, Aviatrix and FinOps certified, focused on scalable and cost-efficient systems.",
      image: "/assets/itteam/vishnew2.JPG",
      links: {
        github: "https://github.com/VishishtaDilsara",
        linkedin: "https://www.linkedin.com/in/vishishta-dilsara-14059a348/",
      },
    },
    {
      name: "Eranga Kavisanka",
      role: "Software Engineer",
      bio: "Bachelor of Computing (Hons) in Software Engineering. Full-stack developer, DevOps and Cloud engineer, Flutter Developer and Python ML expertise, Aviatrix certified Engineer",
      image: "/assets/itteam/Eranew.JPG",
      links: {
        github: "https://github.com/Eranga035225",
        linkedin:
          "https://www.linkedin.com/in/eranga-kavisanka-ariyarathna-7249592a8/",
      },
    },
    {
      name: "Kavindu",
      role: "AI / ML Engineer",
      bio: "Data-driven products, ML pipelines, predictive analytics, and automation tools that deliver measurable value.",
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
      links: {
        github: "#",
        linkedin: "#",
      },
    },
  ];

  return (
    <section className="flex flex-col items-center" id="team">
      <SectionTitle
        title="Our Team"
        description="A multidisciplinary team delivering engineering, web, AI, and design solutions with clarity and precision."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-18 max-w-6xl mx-auto  ">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            className="group border border-slate-800 bg-slate-900/30 p-6 rounded-2xl hover:border-indigo-500/40 transition"
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.12,
              type: "spring",
              stiffness: 320,
              damping: 70,
              mass: 1,
            }}
          >
            <img
              className="size-14 rounded-full object-cover border border-slate-700"
              src={member.image}
              alt={member.name}
            />

            <div className="mt-4">
              <h3 className="text-slate-100 font-semibold text-lg">
                {member.name}
              </h3>
              <p className="text-indigo-500 text-sm mt-1">{member.role}</p>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                {member.bio}
              </p>
            </div>

            <div className="flex items-center gap-3 mt-6">
              {member.links?.linkedin && (
                <a
                  href={member.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg border border-slate-800 hover:border-indigo-500/60 hover:bg-indigo-600/10 transition"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <Linkedin className="size-4.5 text-slate-200" />
                </a>
              )}

              {member.links?.github && (
                <a
                  href={member.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg border border-slate-800 hover:border-indigo-500/60 hover:bg-indigo-600/10 transition"
                  aria-label={`${member.name} GitHub`}
                >
                  <Github className="size-4.5 text-slate-200" />
                </a>
              )}

              {member.links?.email && (
                <a
                  href={member.links.email}
                  className="p-2 rounded-lg border border-slate-800 hover:border-indigo-500/60 hover:bg-indigo-600/10 transition"
                  aria-label={`${member.name} Email`}
                >
                  <Mail className="size-4.5 text-slate-200" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
