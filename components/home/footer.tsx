import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";
import Image from "next/image";
export default function Footer() {
  const footerLinks = {
    Product: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "API", href: "#" },
      { label: "Changelog", href: "#" },
    ],
    Company: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Legal", href: "#" },
      { label: "Contact", href: "#" },
    ],
    Resources: [
      { label: "Documentation", href: "#" },
      { label: "Status", href: "#" },
      { label: "Community", href: "#" },
      { label: "Help Center", href: "#" },
    ],
  };

  return (
    <footer className="bg-white border-t-[3px] border-[#2e2692] font-sans selection:bg-[#2e2692] selection:text-white relative overflow-hidden">

      {/* Subtle Background Pattern/Glow */}
      <div className="absolute top-0 left-1/2 w-full h-[300px] bg-gradient-to-b from-[#2e2692]/5 to-transparent -translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1200px] pt-20 pb-8 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16">

          {/* --- Brand Column --- */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col">
            <Link href="/" className="flex items-center gap-3 mb-6 w-max group">
              <Image src="/logo.png" alt="Logo" width={200} height={150} />
            </Link>

            <p className="text-[15px] text-gray-600 mb-8 max-w-sm font-medium leading-relaxed">
              Enterprise-grade email marketing and lead generation infrastructure built specifically for data-driven scaling teams.
            </p>

            <div className="flex gap-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex items-center justify-center h-11 w-11 rounded-xl bg-white border-[2px] border-[#2e2692] text-[#2e2692] shadow-[3px_3px_0px_0px_#2e2692] hover:shadow-[1px_1px_0px_0px_#2e2692] hover:translate-y-0.5 hover:bg-green-50 hover:text-green-600 transition-all duration-200"
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* --- Links Columns --- */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-extrabold text-[#2e2692] uppercase tracking-wider text-[13px] mb-6">
                  {category}
                </h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[15px] font-medium text-gray-600 hover:text-green-600 transition-all duration-200 hover:translate-x-1 inline-block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="pt-8 border-t-[2px] border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Copyright */}
          <p className="text-[13px] text-gray-500 font-bold uppercase tracking-wider text-center md:text-left">
            © {new Date().getFullYear()} MAILPILOT SYSTEMS INC.
          </p>

          {/* Middle Links */}
          <div className="flex flex-wrap justify-center gap-6 text-[13px] font-bold text-gray-500 uppercase tracking-wider">
            <a href="#" className="hover:text-[#2e2692] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#2e2692] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#2e2692] transition-colors">SLA</a>
          </div>

          {/* SaaS Status Badge */}
          <div className="flex items-center gap-2 bg-gray-50 border-2 border-gray-100 rounded-full px-4 py-1.5 cursor-pointer hover:border-green-200 hover:bg-green-50 transition-colors">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-[12px] font-bold text-gray-600 uppercase tracking-wide">
              All systems operational
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}