import React from 'react';
import Navbar from '@/components/home/navbar';
import Footer from '@/components/home/footer';

// Sub-component for the Info Icon
const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 inline-block ml-1 cursor-pointer">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Navbar />
      
      {/* Main Pricing Section */}
      <main className="flex-grow flex flex-col items-center pt-12 pb-24 px-4">
        
        {/* Header Title */}
        <h1 className="text-[2.75rem] font-bold text-[#140D36] mb-8 tracking-tight">
          Pricing
        </h1>

        {/* Pricing Toggle - Sharp Edges */}
        <div className="flex items-center mb-16 relative">
          <div className="bg-[#EDF0F9] p-1 flex items-center border border-gray-200">
            {/* Left Toggle (Inactive) */}
            <button className="flex items-center gap-2 px-6 py-2.5 text-[#140D36] text-sm font-medium transition-all hover:bg-white">
              Exclude US/UK Data
              <span className="bg-[#D0F4E4] text-[#146A4A] text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                50% off
              </span>
            </button>
            
            {/* Right Toggle (Active) */}
            <button className="px-6 py-2.5 bg-[#3520B8] text-white text-sm font-medium transition-all">
              Include US/UK Data
            </button>
          </div>
          
          {/* Help Icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#140D36] ml-3 cursor-pointer hover:text-[#3520B8] transition-colors">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1200px]">
          
          {/* --- Card 1: Free --- */}
          <div className="bg-white p-8 flex flex-col text-center border border-gray-200 hover:border-[#3520B8] transition-colors duration-300 relative">
            <div className="bg-[#E5F7ED] text-[#1D7A4E] text-sm font-bold px-4 py-1.5 inline-block mx-auto mb-6 tracking-wide uppercase">
              Free
            </div>
            <div className="flex items-baseline justify-center mb-8">
              <span className="text-4xl font-bold text-[#140D36] tracking-tighter">$0</span>
              <span className="text-sm text-gray-500 ml-1">/month</span>
            </div>
            
            <div className="flex-grow flex flex-col gap-1.5 text-sm text-[#333333] mb-8 h-[72px] justify-center">
              <p>5 emails / day</p>
              <p>5 phones / day</p>
              <p>5 exports / day</p>
            </div>

            <button className="w-full bg-[#3520B8] text-white py-3.5 text-sm font-semibold hover:bg-[#140D36] transition-colors mb-6 uppercase tracking-wider">
              Select plan
            </button>

            <hr className="border-gray-200 mb-6" />

            <div className="flex flex-col gap-4 text-sm text-[#4F4F4F]">
              <p>Browser Extension</p>
              <p>Search Portal</p>
              <p>Trial of premium features</p>
              <p>1 user per company limit</p>
              <p>Limited time only</p>
            </div>
          </div>

          {/* --- Card 2: Email --- */}
          <div className="bg-white p-8 flex flex-col text-center border border-gray-200 hover:border-[#3520B8] transition-colors duration-300 relative">
            <div className="bg-[#E5F7ED] text-[#1D7A4E] text-sm font-bold px-4 py-1.5 inline-block mx-auto mb-6 tracking-wide uppercase">
              Email
            </div>
            <div className="flex items-baseline justify-center gap-2 mb-8">
              <span className="text-2xl font-bold text-gray-400 line-through decoration-2">$99</span>
              <span className="text-4xl font-bold text-[#140D36] tracking-tighter">$49</span>
              <span className="text-sm text-gray-500">/month</span>
            </div>
            
            <div className="flex-grow flex flex-col gap-1.5 text-sm text-[#333333] mb-8 h-[72px] justify-center">
              <p className="font-bold text-[#140D36]">Unlimited emails <InfoIcon /></p>
              <p>300 exports / month</p>
            </div>

            <button className="w-full bg-[#3520B8] text-white py-3.5 text-sm font-semibold hover:bg-[#140D36] transition-colors mb-6 uppercase tracking-wider">
              Select plan
            </button>

            <hr className="border-gray-200 mb-6" />

            <div className="flex flex-col gap-4 text-sm text-[#4F4F4F]">
              <p>Email campaigns</p>
              <p>List builder</p>
              <p>1 user per company limit</p>
              <p>Plus everything in free plan</p>
            </div>
          </div>

          {/* --- Card 3: Email + Phone --- */}
          <div className="bg-white p-8 flex flex-col text-center border border-gray-200 hover:border-[#3520B8] transition-colors duration-300 relative">
            <div className="bg-[#E5F7ED] text-[#1D7A4E] text-sm font-bold px-4 py-1.5 inline-block mx-auto mb-6 tracking-wide uppercase">
              Email + Phone
            </div>
            <div className="flex items-baseline justify-center gap-2 mb-8">
              <span className="text-2xl font-bold text-gray-400 line-through decoration-2">$199</span>
              <span className="text-4xl font-bold text-[#140D36] tracking-tighter">$99</span>
              <span className="text-sm text-gray-500">/month</span>
            </div>
            
            <div className="flex-grow flex flex-col gap-1.5 text-sm text-[#333333] mb-8 h-[72px] justify-center">
              <p className="font-bold text-[#140D36]">Unlimited emails <InfoIcon /></p>
              <p className="font-bold text-[#140D36]">Unlimited phones <InfoIcon /></p>
              <p>600 exports / month</p>
            </div>

            <button className="w-full bg-[#3520B8] text-white py-3.5 text-sm font-semibold hover:bg-[#140D36] transition-colors mb-6 uppercase tracking-wider">
              Select plan
            </button>

            <hr className="border-gray-200 mb-6" />

            <div className="flex flex-col gap-4 text-sm text-[#4F4F4F]">
              <p>Data enrichment</p>
              <p>AI Email Writer</p>
              <p>1 user per company limit</p>
              <p>Plus everything in email plan</p>
            </div>
          </div>

          {/* --- Card 4: Team / API --- */}
          <div className="bg-white p-8 flex flex-col text-center border border-gray-200 hover:border-[#3520B8] transition-colors duration-300 relative">
            <div className="bg-[#E5F7ED] text-[#1D7A4E] text-sm font-bold px-4 py-1.5 inline-block mx-auto mb-6 tracking-wide uppercase">
              Team / API
            </div>
            <div className="flex items-center justify-center mb-8 h-[40px]">
              <span className="text-3xl font-bold text-[#140D36] tracking-tighter">Contact Us</span>
            </div>
            
            <div className="flex-grow flex flex-col gap-1.5 text-sm text-[#333333] mb-8 h-[72px] justify-center">
              <p>Team Plan</p>
              <p className="font-bold text-[#140D36]">API Access</p>
            </div>

            <button className="w-full bg-[#3520B8] text-white py-3.5 text-sm font-semibold hover:bg-[#140D36] transition-colors mb-6 uppercase tracking-wider">
              Contact us
            </button>

            <hr className="border-gray-200 mb-6" />

            <div className="flex flex-col gap-4 text-sm text-[#4F4F4F]">
              <p>20% more data coverage</p>
              <p>Bulk license 700million+ profiles</p>
              <p>Works with recruiter Pro</p>
              <p>Salesforce + ATS integrations</p>
              <p>Team Management & reports</p>
              <p>Dedicated Account Manager</p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}