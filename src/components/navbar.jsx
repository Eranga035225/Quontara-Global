import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navlinks = [
    { to: "/", text: "QS Services" },
    //{ to: "/creations", text: "Creations" },
    { to: "/itservices", text: "IT Services" },
    { to: "/about", text: "About" },
    // { to: "/testimonials", text: "Testimonials" },
    { to: "/contact", text: "Contact" },
  ];

  return (
    <>
      <motion.nav
        className="sticky top-0 z-50 flex items-center justify-between w-full h-18 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
      >
        <a href="https://prebuiltui.com?utm_source=agentix">
          <img
            className="h-9 w-auto"
            src="/assets/logo.svg"
            width={138}
            height={36}
            alt="logo"
          />
        </a>

        <div className="hidden lg:flex items-center gap-8 transition duration-500">
          {navlinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "text-indigo-500 font-medium relative \
     after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full \
     after:bg-indigo-500 after:origin-left after:scale-x-100 \
     after:transition-transform after:duration-500 after:ease-out"
                    : "hover:text-slate-300 relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-indigo-500 after:origin-left after:scale-x-0 after:transition-transform after:duration-500 after:ease-out"
                }`
              }
            >
              {link.text}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:block space-x-3">
          <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md active:scale-95">
            Get started
          </button>
          {/* <button className="hover:bg-slate-300/20 transition px-6 py-2 border border-slate-400 rounded-md active:scale-95">
            Login
          </button> */}
        </div>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="lg:hidden active:scale-90 transition"
        >
          <MenuIcon className="size-6.5" />
        </button>
      </motion.nav>
      <div
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 lg:hidden transition-transform duration-400 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navlinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-indigo-500 font-medium" : ""
            }
          >
            {link.text}
          </NavLink>
        ))}

        <button
          onClick={() => setIsMenuOpen(false)}
          className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md flex"
        >
          <XIcon />
        </button>
      </div>
    </>
  );
}
