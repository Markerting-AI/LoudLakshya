import { Link } from "react-router-dom";
import { Linkedin, Twitter, Instagram, Facebook } from "lucide-react";

const sitemapLinks = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/contact", label: "Contact Us" },
  { path: "/blog", label: "Blog" },
];

const serviceLinks = [
  { path: "/services", label: "Google Ads" },
  { path: "/services", label: "Social Media Ads" },
  { path: "/services", label: "SEO" },
  { path: "/services", label: "AI Marketing (AEO & GEO)" },
];

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0f] border-t border-white/[0.06]">
      <div className="section-container pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-0">
              <span className="text-[#ff4d6d] font-extrabold text-lg tracking-tight">
                Loud
              </span>
              <span className="text-white font-extrabold text-lg tracking-tight">
                Lakshya Digital
              </span>
            </Link>
            <p className="text-[#94a3b8] text-sm mt-4 max-w-[260px]">
              Digital marketing that drives results.
            </p>
            <a
              href="mailto:LoudLakshya@protonmail.com"
              className="text-[#ff4d6d] text-sm font-medium mt-4 inline-block hover:underline"
            >
              LoudLakshya@protonmail.com
            </a>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="text-[#94a3b8] text-xs font-semibold uppercase tracking-[1px] mb-5">
              Sitemap
            </h4>
            <ul className="space-y-3">
              {sitemapLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white/70 text-sm hover:text-[#ff4d6d] hover:translate-x-1 transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#94a3b8] text-xs font-semibold uppercase tracking-[1px] mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white/70 text-sm hover:text-[#ff4d6d] hover:translate-x-1 transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[#94a3b8] text-xs font-semibold uppercase tracking-[1px] mb-5">
              Follow Us
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-white/[0.15] flex items-center justify-center text-white/60 hover:border-[#ff4d6d] hover:text-[#ff4d6d] transition-all duration-200"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] mt-16 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#94a3b8] text-[13px]">
            &copy; 2025 Loud Lakshya Digital. All rights reserved.
          </p>
          <div className="text-[#94a3b8] text-[13px] flex gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span>&middot;</span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
