export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-20 px-8 border-t border-zinc-800">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Column */}
        <div className="space-y-6">
          <h3 className="text-white text-lg font-black tracking-tighter uppercase">
            MAILPILOT
          </h3>
          <p className="text-sm leading-relaxed max-w-xs">
            Precision-engineered email infrastructure for the modern enterprise. 
            Built for speed, designed for clarity.
          </p>
        </div>

        {/* Product Column */}
        <div>
          <h4 className="text-white text-[13px] font-bold uppercase tracking-[0.2em] mb-8">
            Product
          </h4>
          <ul className="space-y-4 text-[13px] uppercase tracking-wider">
            <li><a href="#" className="hover:text-white transition-colors">Email Marketing</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Automations</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h4 className="text-white text-[13px] font-bold uppercase tracking-[0.2em] mb-8">
            Company
          </h4>
          <ul className="space-y-4 text-[13px] uppercase tracking-wider">
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Subscribe Column - No Rounding, Sharp Input */}
        <div>
          <h4 className="text-white text-[13px] font-bold uppercase tracking-[0.2em] mb-8">
            Newsletter
          </h4>
          <div className="flex flex-col gap-4">
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS"
              className="bg-transparent border border-zinc-700 px-4 py-3 text-[12px] focus:outline-none focus:border-white transition-colors text-white uppercase tracking-widest"
            />
            <button className="bg-white text-black px-4 py-3 text-[12px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto mt-20 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[11px] uppercase tracking-[0.3em]">
          © 2026 MailPilot. All rights reserved.
        </div>
        <div className="flex gap-8 text-[11px] uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}