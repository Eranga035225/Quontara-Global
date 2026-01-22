import { Fragment, useEffect, useMemo, useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDown, Check, ArrowLeft } from "lucide-react";

const DOMAINS = [
  {
    value: "measurement-boq",
    label: "Measurement & BOQ",
    subtopics: [
      {
        value: "boq-preparation",
        label: "BOQ Preparation (Buildings / Roads / MEP)",
      },
      {
        value: "quantity-takeoff",
        label: "Quantity Take-off from Drawings (PDF / CAD)",
      },
      {
        value: "takeoffs-tools",
        label: "PlanSwift / CostX / Bluebeam Take-offs",
      },
      {
        value: "remeasurement-variations",
        label: "Re-measurement for Variations",
      },
      { value: "subcontractor-boq", label: "Sub-contractor BOQ Preparation" },
    ],
  },
  {
    value: "estimation-tendering",
    label: "Estimation & Tendering",
    subtopics: [
      {
        value: "cost-estimation",
        label: "Cost Estimation (Pre-tender & Post-tender)",
      },
      { value: "tender-docs", label: "Tender Document Preparation" },
      { value: "bid-pricing", label: "Bid Pricing & Rate Analysis" },
      { value: "value-engineering", label: "Value Engineering Cost Studies" },
      { value: "tender-support", label: "Contractor Tender Support" },
    ],
  },
  {
    value: "contracts-claims",
    label: "Contracts, Variations & Claims",
    subtopics: [
      {
        value: "variation-valuation",
        label: "Variation Valuation & Assessment",
      },
      { value: "ipa", label: "Interim Payment Application (IPA)" },
      { value: "final-account", label: "Final Account Preparation" },
      { value: "eot-claims", label: "EOT & Claims Support" },
      { value: "fidic-ictad", label: "FIDIC / ICTAD Contract Advice" },
    ],
  },
  {
    value: "commercial-support",
    label: "Commercial & Project Support",
    subtopics: [
      { value: "cost-control", label: "Cost Control & Cash Flow Forecasting" },
      { value: "resource-budgeting", label: "Resource Budgeting" },
      { value: "monthly-reports", label: "Monthly Cost Reports" },
      {
        value: "commercial-support-remote",
        label: "Project Commercial Support (Remote)",
      },
      {
        value: "project-coordination",
        label: "Construction Project Coordination",
      },
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
    for (const d of DOMAINS) {
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
                    {DOMAINS.map((d) => (
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
