import { Listbox } from "@headlessui/react";
import { ChevronDown, Check } from "lucide-react";

const categories = [
  { value: "quantity-surveying", label: "Quantity Surveying" },
  { value: "web-development", label: "Web Development" },
  { value: "ai-ml", label: "AI / Machine Learning" },
  { value: "graphic-design", label: "Graphic Design" },
  { value: "other", label: "Other" },
];

export default function JobCategorySelect({ value, onChange }) {
  const selected = categories.find((c) => c.value === value) || null;

  return (
    <div className="mt-2">
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="w-full flex items-center justify-between p-3 border border-slate-700 rounded-lg bg-slate-950 text-slate-200 focus:ring-1 focus:ring-indigo-600 transition">
            <span className={selected ? "text-slate-200" : "text-slate-500"}>
              {selected ? selected.label : "Select a category"}
            </span>
            <ChevronDown className="size-4 text-slate-400" />
          </Listbox.Button>

          <Listbox.Options className="absolute z-50 mt-2 w-full bg-slate-950 border border-slate-700 rounded-lg overflow-hidden shadow-lg">
            {categories.map((c) => (
              <Listbox.Option
                key={c.value}
                value={c.value}
                className={({ active }) =>
                  `cursor-pointer px-4 py-3 flex items-center justify-between ${
                    active ? "bg-indigo-600 text-white" : "text-slate-200"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span>{c.label}</span>
                    {selected ? <Check className="size-4" /> : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
