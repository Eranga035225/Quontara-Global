import { Fragment, useEffect, useMemo, useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDown, Check, ArrowLeft } from "lucide-react";

export const ITDOMAINS = [
  {
    value: "web-development",
    label: "Web Development",
    subtopics: [
      {
        value: "frontend-development",
        label: "Frontend Development (React / Vue / Angular)",
      },
      {
        value: "backend-development",
        label: "Backend Development (Node / Django / Spring)",
      },
      { value: "fullstack-development", label: "Full-Stack Web Development" },
      { value: "api-development", label: "REST / GraphQL API Development" },
      { value: "bug-fixing", label: "Bug Fixing & Performance Optimization" },
      { value: "website-maintenance", label: "Website Maintenance & Support" },
    ],
  },

  {
    value: "ai-ml-dl",
    label: "AI / ML / Deep Learning",
    subtopics: [
      {
        value: "machine-learning-models",
        label: "Machine Learning Model Development",
      },
      {
        value: "deep-learning-models",
        label: "Deep Learning (CNN / RNN / Transformers)",
      },
      { value: "nlp-solutions", label: "Natural Language Processing (NLP)" },
      { value: "computer-vision", label: "Computer Vision Solutions" },
      { value: "ai-integration", label: "AI Model Integration & Deployment" },
      {
        value: "data-preprocessing",
        label: "Data Cleaning & Feature Engineering",
      },
    ],
  },

  {
    value: "assignments",
    label: "Assignments & Academic Support",
    subtopics: [
      {
        value: "programming-assignments",
        label: "Programming Assignments (Any Language)",
      },
      {
        value: "data-science-assignments",
        label: "Data Science / ML Assignments",
      },
      { value: "web-dev-assignments", label: "Web Development Assignments" },
      { value: "project-reports", label: "Final Year Projects & Reports" },
      { value: "debugging-help", label: "Code Debugging & Explanation" },
    ],
  },

  {
    value: "devops-cloud",
    label: "DevOps & Cloud Solutions",
    subtopics: [
      { value: "cloud-deployment", label: "AWS / Azure / GCP Deployment" },
      { value: "ci-cd-pipelines", label: "CI/CD Pipeline Setup" },
      { value: "docker-kubernetes", label: "Docker & Kubernetes" },
      { value: "server-setup", label: "Linux Server Setup & Hardening" },
      {
        value: "monitoring-logging",
        label: "Monitoring & Logging (Prometheus / Grafana)",
      },
      { value: "cloud-cost-optimization", label: "Cloud Cost Optimization" },
    ],
  },
];

export default function JobCategorySelect({ value, onChange }) {
  const [open, setOpen] = useState(false);

  // Which domain’s subtopics we are currently showing (null => show domains)
  const [activeDomain, setActiveDomain] = useState(null);

  // Flatten all subtopics so we can display the selected label in the button
  const subtopicIndex = useMemo(() => {
    const map = new Map();
    for (const d of ITDOMAINS) {
      for (const s of d.subtopics) {
        map.set(s.value, { ...s, domain: d });
      }
    }
    return map;
  }, []);

  const selectedSubtopic = value ? subtopicIndex.get(value) : null;

  useEffect(() => {
    if (!open) setActiveDomain(null);
  }, [open]);

  return (
    <div className="mt-2">
      <Listbox value={value ?? ""} onChange={onChange}>
        {() => (
          <div className="relative">
            <Listbox.Button
              onClick={() => setOpen((v) => !v)}
              className="w-full flex items-center justify-between p-3 border border-slate-700 rounded-lg bg-slate-950 text-slate-200 focus:ring-1 focus:ring-indigo-600 transition"
            >
              <span
                className={
                  selectedSubtopic ? "text-slate-200" : "text-slate-500"
                }
              >
                {selectedSubtopic
                  ? `${selectedSubtopic.domain.label} — ${selectedSubtopic.label}`
                  : "Select a category"}
              </span>
              <ChevronDown className="size-4 text-slate-400" />
            </Listbox.Button>

            {open && (
              <Listbox.Options
                static
                className="absolute z-50 mt-2 w-full bg-slate-950 border border-slate-700 rounded-lg overflow-hidden shadow-lg"
              >
                {/* Header / breadcrumb */}
                <div className="px-3 py-2 border-b border-slate-800 flex items-center gap-2">
                  {activeDomain ? (
                    <button
                      type="button"
                      onClick={() => setActiveDomain(null)}
                      className="p-1 rounded hover:bg-slate-800 text-slate-200"
                      aria-label="Back"
                    >
                      <ArrowLeft className="size-4" />
                    </button>
                  ) : null}
                  <div className="text-sm text-slate-300">
                    {activeDomain ? activeDomain.label : "Choose a domain"}
                  </div>
                </div>

                {/* Step 1: Domains */}
                {!activeDomain ? (
                  <div>
                    {ITDOMAINS.map((d) => (
                      <button
                        key={d.value}
                        type="button"
                        onClick={() => setActiveDomain(d)}
                        className="w-full text-left cursor-pointer px-4 py-3 flex items-center justify-between text-slate-200 hover:bg-indigo-600 hover:text-white"
                      >
                        <span>{d.label}</span>
                        <ChevronDown className="size-4 rotate-[-90deg] opacity-80" />
                      </button>
                    ))}
                  </div>
                ) : (
                  /* Step 2: Subtopics (Listbox.Option) */
                  <div>
                    {activeDomain.subtopics.map((s) => (
                      <Listbox.Option
                        key={s.value}
                        value={s.value}
                        as={Fragment}
                      >
                        {({ active, selected }) => (
                          <li
                            className={`cursor-pointer px-4 py-3 flex items-center justify-between ${
                              active
                                ? "bg-indigo-600 text-white"
                                : "text-slate-200"
                            }`}
                            onClick={() => {
                              // Listbox will call onChange automatically via selection
                              setOpen(false);
                            }}
                          >
                            <span>{s.label}</span>
                            {selected ? <Check className="size-4" /> : null}
                          </li>
                        )}
                      </Listbox.Option>
                    ))}
                  </div>
                )}
              </Listbox.Options>
            )}
          </div>
        )}
      </Listbox>
    </div>
  );
}
