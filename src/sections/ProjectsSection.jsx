import SectionTitle from "../components/section-title";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectsSection() {
  const projects = [
    {
      title: "Full-Stack MERN E-Commerce Platform for Beauty Glow",
      description:
        "A full-stack MERN web application for a cosmetic brand. Includes complete frontend + backend, Dockerized deployment, AWS hosting, and CI/CD using GitHub Actions.",
      image:
        "https://images.unsplash.com/photo-1557825835-70d97c4aa567?q=80&w=1200&auto=format&fit=crop",
      tags: [
        "React",
        "Node.js",
        "MongoDB",
        "Express.js",
        "Docker",
        "AWS",
        "GitHub Actions",
      ],
      live: "https://example.com",
      github: "https://github.com/example/repo",
    },
    {
      title: "ThumbClick – AI-Powered Thumbnail Generator",
      description:
        "An AI thumbnail generator that allows users to create, preview, and manage YouTube thumbnails with secure authentication and history management.",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
      tags: [
        "React",
        "Node.js",
        "MongoDB",
        "Express.js",
        "Cloudinary",
        "Vercel",
        "AI API",
      ],
      live: "https://example.com",
      github: "https://github.com/example/repo",
    },
  ];

  return (
    <section className="flex flex-col items-center" id="projects">
      <SectionTitle
        title="Projects"
        description="A selection of our recent work across web, AI, engineering, and design."
      />

      <div className="w-full max-w-6xl mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((p, index) => (
          <motion.article
            key={p.title}
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.12,
              type: "spring",
              stiffness: 220,
              damping: 30,
            }}
            className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900/40 shadow-lg"
          >
            {/* Image */}
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-white leading-snug">
                {p.title}
              </h3>
              <p className="mt-4 text-slate-400 leading-relaxed">
                {p.description}
              </p>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm text-slate-200 bg-slate-800/70 border border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer links */}
              <div className="mt-8 flex items-center justify-between">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-white transition flex items-center gap-2"
                >
                  <Github className="size-5" />
                  <span className="text-sm">View Source</span>
                </a>

                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  className="size-11 rounded-full flex items-center justify-center border border-slate-700 bg-slate-800/50 hover:bg-indigo-600/20 hover:border-indigo-500 transition"
                  aria-label="Open project"
                >
                  <ExternalLink className="size-5 text-slate-200" />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
