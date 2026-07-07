"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const links = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Track Record", href: "#track-record" },
  { label: "Process", href: "#process" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-sm border-b border-sand/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link
          href="/"
          className={`font-poppins font-bold text-xl sm:text-2xl tracking-tight transition-colors duration-300 ${
            scrolled ? "text-soil" : "text-white"
          }`}
        >
          AVG <span className={scrolled ? "text-terracotta" : "text-white"}>Traders</span>
          <svg
            className={`inline-block ml-1.5 w-6 h-6 align-[-0.15em] ${scrolled ? "text-terracotta" : "text-white"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {/* Onion bulb */}
            <path d="M12 8c-3.6 0-6.5 2.6-6.5 6 0 3.6 2.9 6 6.5 6s6.5-2.4 6.5-6c0-3.4-2.9-6-6.5-6z" />
            {/* Inner layer */}
            <path d="M12 8c-1.6 1.4-2.6 3.5-2.6 6 0 2.4 1 4.6 2.6 6" />
            <path d="M12 8c1.6 1.4 2.6 3.5 2.6 6 0 2.4-1 4.6-2.6 6" />
            {/* Sprout */}
            <path d="M12 8V5.5" />
            <path d="M12 5.5c-.8-.8-1-2-.6-3 1 .3 1.7 1.2 1.8 2.2" />
            <path d="M12 5.5c.8-.8 1-2 .6-3-1 .3-1.7 1.2-1.8 2.2" />
          </svg>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-poppins text-sm font-medium tracking-wide relative group transition-colors duration-300 ${
                  scrolled ? "text-soil/80 hover:text-soil" : "text-cream/80 hover:text-cream"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-terracotta group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link
            href="#contact"
            className="px-5 py-2.5 bg-terracotta text-cream text-sm font-poppins font-semibold rounded-full hover:bg-maroon transition-colors duration-300"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`lg:hidden flex flex-col gap-1.5 p-2 transition-colors ${
            scrolled ? "text-soil" : "text-cream"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block w-5 h-px bg-current transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-current transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-current transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-cream border-b border-sand"
          >
            <ul className="px-6 py-6 flex flex-col gap-5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-poppins text-base font-medium text-soil hover:text-terracotta transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#contact"
                  className="inline-block px-5 py-2.5 bg-terracotta text-cream text-sm font-poppins font-semibold rounded-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Get a Quote
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
