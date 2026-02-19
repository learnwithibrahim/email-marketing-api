import React from 'react';
import Navbar from '@/components/home/navbar';
import Footer from '@/components/home/footer';

// --- Integration Data ---
const integrationsData = [
  {
    name: 'Salesforce',
    category: 'CRM',
    description: 'Sync contacts, leads, and accounts directly to your Salesforce instance in real-time.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00A1E0" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.1325 20.176 10.2052 17.8587 10.0229C17.3734 7.18698 14.9332 5 12 5C9.35824 5 7.14781 6.84074 6.32356 9.28821C3.91619 9.53986 2 11.5546 2 14C2 16.7614 4.23858 19 7 19H17.5Z"></path>
      </svg>
    ),
  },
  {
    name: 'HubSpot',
    category: 'CRM',
    description: 'Automatically update your HubSpot CRM with enriched firmographic and contact data.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF7A59" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.5 8.5L14 11M4.5 8.5L10 11M12 21V15"></path>
        <circle cx="19.5" cy="7.5" r="2.5"></circle>
        <circle cx="4.5" cy="7.5" r="2.5"></circle>
      </svg>
    ),
  },
  {
    name: 'Slack',
    category: 'Communication',
    description: 'Get instant notifications for new leads, campaign replies, and export completions.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E01E5A" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M13 3H11V21H13V3Z"></path>
        <path d="M21 11H3V13H21V11Z"></path>
        <path d="M7 7H9V17H7V7Z"></path>
        <path d="M17 7H15V17H17V7Z"></path>
      </svg>
    ),
  },
  {
    name: 'Outreach',
    category: 'Sales Engagement',
    description: 'Push verified prospects straight into your active Outreach sequences with one click.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5C16C5" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M22 12L12 2L2 12L12 22L22 12Z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    ),
  },
  {
    name: 'Zapier',
    category: 'Automation',
    description: 'Connect with over 5,000+ apps to automate your entire lead generation workflow.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF4F00" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    ),
  },
  {
    name: 'Greenhouse',
    category: 'ATS',
    description: 'Seamlessly import candidate profiles and contact info directly into your ATS pipeline.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00B289" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
        <rect x="3" y="3" width="18" height="18"></rect>
        <path d="M3 9H21"></path>
        <path d="M9 21V9"></path>
      </svg>
    ),
  },
  {
    name: 'SalesLoft',
    category: 'Sales Engagement',
    description: 'Enroll enriched contacts into SalesLoft cadences automatically to scale outreach.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M4 4H20V20H4V4Z"></path>
        <path d="M12 8V16"></path>
        <path d="M8 12H16"></path>
      </svg>
    ),
  },
  {
    name: 'Mailchimp',
    category: 'Marketing',
    description: 'Sync targeted lists directly to Mailchimp for your next large-scale newsletter blast.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFE01B" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16V12"></path>
        <path d="M12 8H12.01"></path>
      </svg>
    ),
  },
];

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Navbar />
      
      {/* Main Integrations Section */}
      <main className="flex-grow flex flex-col items-center pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-[1200px] w-full mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-[#3520B8] text-sm font-bold uppercase tracking-widest mb-3">
                Integrations Directory
              </h2>
              <h1 className="text-4xl md:text-5xl font-bold text-[#140D36] tracking-tight mb-4">
                Connect your stack.
              </h1>
              <p className="text-lg text-gray-600">
                Seamlessly push data into the tools your team already uses. No manual data entry, no CSV wrangling—just pure productivity.
              </p>
            </div>
            
            {/* Search Input (Enterprise Style) */}
            <div className="w-full md:w-80 relative">
              <input 
                type="text" 
                placeholder="Search integrations..." 
                className="w-full bg-white border border-gray-300 p-3.5 pl-10 text-sm focus:outline-none focus:border-[#3520B8] transition-colors placeholder-gray-400 text-[#140D36]"
              />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="absolute left-3.5 top-3.5 text-gray-400">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="max-w-[1200px] w-full flex flex-wrap gap-2 mb-12 border-b border-gray-200 pb-4">
          <button className="px-5 py-2 bg-[#140D36] text-white text-sm font-semibold uppercase tracking-wider">All</button>
          <button className="px-5 py-2 bg-transparent text-gray-500 hover:text-[#140D36] hover:bg-gray-100 text-sm font-semibold uppercase tracking-wider transition-colors">CRM</button>
          <button className="px-5 py-2 bg-transparent text-gray-500 hover:text-[#140D36] hover:bg-gray-100 text-sm font-semibold uppercase tracking-wider transition-colors">Sales Engagement</button>
          <button className="px-5 py-2 bg-transparent text-gray-500 hover:text-[#140D36] hover:bg-gray-100 text-sm font-semibold uppercase tracking-wider transition-colors">Marketing</button>
          <button className="px-5 py-2 bg-transparent text-gray-500 hover:text-[#140D36] hover:bg-gray-100 text-sm font-semibold uppercase tracking-wider transition-colors">ATS</button>
        </div>

        {/* Integrations Grid */}
        <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {integrationsData.map((integration, index) => (
            <div 
              key={index} 
              className="bg-white p-6 border border-gray-200 hover:border-[#3520B8] transition-colors duration-300 group cursor-pointer flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-[#FAFAFA] border border-gray-100">
                  {integration.icon}
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {integration.category}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-[#140D36] mb-2 tracking-tight group-hover:text-[#3520B8] transition-colors">
                {integration.name}
              </h3>
              
              <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
                {integration.description}
              </p>
              
              <div className="flex items-center text-[#3520B8] text-sm font-bold uppercase tracking-wider mt-auto">
                Connect
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="ml-2 transform group-hover:translate-x-1 transition-transform">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Custom API CTA Section */}
        <div className="max-w-[1200px] w-full bg-[#140D36] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between border border-[#140D36]">
          <div className="max-w-xl mb-8 md:mb-0">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
              Don't see your tool? Use our API.
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Our robust REST API allows enterprise teams to build custom integrations and embed our 700M+ contact database directly into proprietary internal systems.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button className="px-8 py-3.5 bg-[#3520B8] text-white text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-[#140D36] transition-colors">
              Read API Docs
            </button>
            <button className="px-8 py-3.5 bg-transparent border border-gray-600 text-white text-sm font-bold uppercase tracking-wider hover:border-white transition-colors">
              Request Integration
            </button>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}