import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 transition-all group-hover:scale-105">
              <span className="text-white font-bold text-base tracking-tight">
                D
              </span>
              <div className="absolute inset-0 rounded-xl bg-white/20 blur-sm opacity-0 group-hover:opacity-100 transition" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              DevPulse
            </span>
            <span className="hidden md:inline-flex ml-2 text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              BETA
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium">
            {["Features", "Pricing", "Changelog"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all hover:after:w-full"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 sm:gap-5">
            <Link
              to="/login"
              className="text-gray-300 hover:text-white text-sm font-medium transition hidden sm:block"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white text-sm font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-200 hover:scale-[1.02] active:scale-95 border border-white/10"
            >
              Get started →
            </Link>
          </div>
        </div>
      </nav>
      ;
    </div>
  );
};

export default Navbar;
