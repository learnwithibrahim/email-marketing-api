import React from 'react';
import Navbar from '@/components/home/navbar';
import Footer from '@/components/home/footer';

// Reusable Icon Component for Feature Bullets
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3520B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 flex-shrink-0">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

// Reusable Grid Icon Component
const GridIcon = ({ d }: { d: string }) => (
  <div className="bg-[#EDF0F9] w-12 h-12 flex items-center justify-center mb-6">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3520B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d}></path>
    </svg>
  </div>
);

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Navbar />
      
      {/* Main Features Section */}
      <main className="flex-grow flex flex-col items-center pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-[#3520B8] text-sm font-bold uppercase tracking-widest mb-3">
            Premium Features
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-[#140D36] tracking-tight mb-6">
            Everything you need to scale your outreach.
          </h1>
          <p className="text-lg text-gray-600">
            Access over 700 million verified profiles, automate your campaigns, and seamlessly integrate with your existing CRM stack.
          </p>
        </div>

        {/* Feature 1: Alternating Layout (Image Left, Text Right) */}
        <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <div className="relative h-[400px] w-full bg-gray-200 border border-gray-200 overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
              alt="Data Analytics Dashboard" 
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#140D36] mb-4 tracking-tight">
              Advanced Data Enrichment
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Instantly enrich your existing lead lists with verified email addresses, direct dial phone numbers, and crucial company firmographics without leaving your workflow.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-[#333333]">Real-time email verification to ensure 99% deliverability.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-[#333333]">Access to global data including strict US/UK compliance.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-[#333333]">Bulk export capabilities for up to 100,000 records at once.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feature 2: Alternating Layout (Text Left, Image Right) */}
        <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
          <div className="order-2 lg:order-1">
            <h3 className="text-3xl font-bold text-[#140D36] mb-4 tracking-tight">
              AI-Powered Email Campaigns
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Stop writing cold emails from scratch. Let our AI analyze your prospect's data and automatically generate hyper-personalized sequences that actually convert.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-[#333333]">Automated follow-up sequences based on trigger events.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-[#333333]">A/B testing for subject lines and email body copy.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-[#333333]">Detailed analytics on open rates, clicks, and replies.</span>
              </li>
            </ul>
          </div>
          <div className="order-1 lg:order-2 relative h-[400px] w-full bg-gray-200 border border-gray-200 overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2064&auto=format&fit=crop" 
              alt="AI Technology Interface" 
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Smaller Features Grid */}
        <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Grid Item 1 */}
          <div className="bg-white p-8 border border-gray-200 hover:border-[#3520B8] transition-colors duration-300">
            <GridIcon d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <h4 className="text-xl font-bold text-[#140D36] mb-3">Chrome Extension</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Find contact information directly from LinkedIn profiles and company websites with a single click.
            </p>
          </div>

          {/* Grid Item 2 */}
          <div className="bg-white p-8 border border-gray-200 hover:border-[#3520B8] transition-colors duration-300">
            <GridIcon d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            <h4 className="text-xl font-bold text-[#140D36] mb-3">Dark Mode Portal</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Work comfortably at any time of day with a beautifully designed, eye-friendly search portal interface.
            </p>
          </div>

          {/* Grid Item 3 */}
          <div className="bg-white p-8 border border-gray-200 hover:border-[#3520B8] transition-colors duration-300">
            <GridIcon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />
            <h4 className="text-xl font-bold text-[#140D36] mb-3">Seamless Integrations</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Push contacts directly to Salesforce, HubSpot, and popular ATS platforms without manual data entry.
            </p>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}