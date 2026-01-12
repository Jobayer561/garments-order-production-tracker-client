import React from "react";
import twitter from "../../../assets/images/twitter.png";
import { Link } from "react-router";
import { Mail, Phone, MapPin, Facebook, Youtube, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-black text-slate-300 px-6 py-16 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#3BADCD] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="space-y-5">
            <Link to="/" className="inline-block group">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3BADCD] via-cyan-400 to-[#3BADCD] bg-clip-text text-transparent hover:scale-105 transition-transform">
                GarmentsFlow
              </h1>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              A modern web-based system that streamlines the garment
              manufacturing process. From receiving buyer orders to tracking
              every production stage.
            </p>
            <div className="pt-3">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-semibold">
                Follow Us
              </p>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 bg-slate-800/50 backdrop-blur-sm hover:bg-gradient-to-br hover:from-[#3BADCD] hover:to-cyan-500 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 bg-slate-800/50 backdrop-blur-sm hover:bg-gradient-to-br hover:from-[#3BADCD] hover:to-cyan-500 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 bg-slate-800/50 backdrop-blur-sm hover:bg-gradient-to-br hover:from-[#3BADCD] hover:to-cyan-500 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 bg-slate-800/50 backdrop-blur-sm hover:bg-gradient-to-br hover:from-[#3BADCD] hover:to-cyan-500 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1"
                  aria-label="Twitter"
                >
                  <img
                    src={twitter}
                    alt="Twitter"
                    className="h-5 w-5 bg-white group-hover:scale-110 transition-transform"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Quick Links
            </h2>
            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-slate-400 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 group hover:translate-x-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-400/50 transition-all"></span>
                Home
              </Link>
              <Link
                to="/allProducts"
                className="text-slate-400 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 group hover:translate-x-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-400/50 transition-all"></span>
                All Products
              </Link>
              <Link
                to="/about-us"
                className="text-slate-400 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 group hover:translate-x-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-400/50 transition-all"></span>
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-slate-400 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 group hover:translate-x-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-400/50 transition-all"></span>
                Contact
              </Link>
              <Link
                to="/dashboard"
                className="text-slate-400 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 group hover:translate-x-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-400/50 transition-all"></span>
                Dashboard
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Contact Us
            </h2>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:info@garmentsflow.com"
                className="flex items-start gap-3 text-slate-400 hover:text-cyan-400 transition-all duration-300 group"
              >
                <div className="p-1.5 bg-slate-800/50 rounded-lg group-hover:bg-cyan-500/20 transition-all">
                  <Mail className="h-4 w-4 shrink-0 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm">info@garmentsflow.com</span>
              </a>
              <a
                href="tel:+8801234567890"
                className="flex items-start gap-3 text-slate-400 hover:text-cyan-400 transition-all duration-300 group"
              >
                <div className="p-1.5 bg-slate-800/50 rounded-lg group-hover:bg-cyan-500/20 transition-all">
                  <Phone className="h-4 w-4 shrink-0 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm">+880 1234-567890</span>
              </a>
              <div className="flex items-start gap-3 text-slate-400">
                <div className="p-1.5 bg-slate-800/50 rounded-lg">
                  <MapPin className="h-4 w-4 shrink-0" />
                </div>
                <span className="text-sm">
                  123 Garment Street, Dhaka 1000, Bangladesh
                </span>
              </div>
            </div>
            <div className="pt-3 pl-1">
              <p className="text-xs text-slate-500 space-y-1">
                <span className="font-semibold text-slate-400 block mb-2">
                  Business Hours
                </span>
                <span className="block">Mon - Fri: 9:00 AM - 6:00 PM</span>
                <span className="block">Sat: 10:00 AM - 4:00 PM</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500 text-center md:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="font-bold bg-gradient-to-r from-[#3BADCD] to-cyan-400 bg-clip-text text-transparent">
                GarmentsFlow
              </span>
              . All rights reserved.
            </p>
            <p className="text-sm text-slate-500 flex items-center gap-2">
              Made with <span className="text-red-500 animate-pulse">❤️</span>{" "}
              for the Garment Industry
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
