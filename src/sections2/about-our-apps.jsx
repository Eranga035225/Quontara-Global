import SectionTitle from "../components/section-title";
import { motion } from "framer-motion";

export default function AboutOurApps() {
    const sectionData = [
        {
            title: "Custom Software Development",
            description: "We build scalable web systems, mobile apps, and enterprise software tailored to your business needs.",
            image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png",
            className: "py-10 border-b border-slate-700 md:py-0 md:border-r md:border-b-0 md:px-10"
        },
        {
            title: "Modern UI/UX & Graphic Design",
            description: "Clean, intuitive, and user-focused designs that enhance engagement and brand identity.",
            image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png",
            className: "py-10 border-b border-slate-700 md:py-0 lg:border-r md:border-b-0 md:px-10"
        },
        {
            title: "AI, Automation & IT Solutions",
            description: "AI/ML projects, system automation, and complete IT solutions to improve efficiency and decision-making.",
            image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png",
            className: "py-10 border-b border-slate-700 md:py-0 md:border-b-0 md:px-10"
        },
    ];

    return (
        <section className="flex flex-col items-center" id="about">
            <SectionTitle
                title="About Our IT Services"
                description="We deliver reliable, innovative, and scalable IT solutions that help businesses grow and succeed in the digital world."
            />

            <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 md:px-0 mt-18">
                {sectionData.map((data, index) => (
                    <motion.div
                        key={data.title}
                        className={data.className}
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: index * 0.15,
                            type: "spring",
                            stiffness: 320,
                            damping: 70,
                            mass: 1,
                        }}
                    >
                        <div className="size-10 p-2 bg-indigo-600/20 border border-indigo-600/30 rounded">
                            <img src={data.image} alt="" />
                        </div>

                        <div className="mt-5 space-y-2">
                            <h3 className="text-base font-medium text-slate-200">
                                {data.title}
                            </h3>
                            <p className="text-sm text-slate-400">
                                {data.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
