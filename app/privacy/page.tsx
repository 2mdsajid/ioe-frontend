import { constructMetadata } from '@/lib/data/global.data';
import React from 'react';
import { ShieldCheck, Eye, Lock, FileText, UserCheck, BellRing, Mail, Cpu, Settings } from 'lucide-react';

export const metadata = constructMetadata({
  title: `IOE Locus | Privacy Policy`,
  description: `Privacy protocols and data encryption standards for IOE Locus users. Learn how we secure your engineering entrance preparation data.`,
});

const Section = ({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
  <section className="group py-10 first:pt-0 border-b border-slate-200 last:border-0">
    <div className="flex flex-col md:flex-row items-start gap-6">
      {/* Engineering-style Icon Container */}
      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
        <Icon className="w-6 h-6" />
      </div>
      <div className="space-y-4 flex-1">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          {title}
        </h2>
        <div className="text-slate-500 leading-relaxed text-sm md:text-base font-medium">
          {children}
        </div>
      </div>
    </div>
  </section>
);

const Page = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Technical Background Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Block */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <ShieldCheck className="w-4 h-4" />
            System Security Protocol
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter uppercase leading-none">
            Privacy <span className="text-indigo-600">Policy</span>
          </h1>
          <div className="flex items-center justify-center gap-4">
             <div className="h-px w-8 bg-slate-200" />
             <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
               Last Revision: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
             </p>
             <div className="h-px w-8 bg-slate-200" />
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[1.5rem] border border-slate-200 p-8 md:p-16 shadow-xl shadow-slate-200/50">
          <Section icon={FileText} title="1. Protocol Overview">
            <p>
              Welcome to <strong className="text-slate-900">IOE Locus</strong>. We prioritize the integrity of your personal data and your right to digital privacy. 
              This policy defines our framework for data collection and processing within our engineering entrance simulator. 
              By initializing our services, you consent to these technical standards.
            </p>
          </Section>

          <Section icon={UserCheck} title="2. Data Acquisition">
            <p className="mb-6">
              To synchronize your diagnostic performance and maintain system state, we collect the following parameters:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Candidate Name', 'Academic Email', 'Contact Node'].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.4)]" />
                  {item}
                </div>
              ))}
            </div>
          </Section>

          <Section icon={Eye} title="3. Processing & Analytics">
            <p className="mb-4">Collected data is processed for the following system functions:</p>
            <ul className="space-y-4 list-none">
              {[
                "Managing candidate authentication and secure sessions.",
                "Compiling real-time score parameters and chapter-wise diagnostics.",
                "Deploying critical system updates and entrance notifications.",
                "Facilitating technical support through our developer uplink."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4 group/item">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-200 group-hover/item:bg-indigo-600 transition-colors flex-shrink-0" />
                  <span className="group-hover/item:text-slate-800 transition-colors">{text}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section icon={Lock} title="4. Encryption & Protection">
            <p>
              We employ industry-grade encryption to safeguard candidate data. 
              <span className="text-indigo-600 font-bold italic ml-1 underline decoration-indigo-200 underline-offset-4">
                We strictly prohibit the sale or lease of user data to third-party ad networks.
              </span> 
              Information is only transmitted when required by statutory law or to uphold the integrity of the Edulocus platform.
            </p>
          </Section>

          <Section icon={BellRing} title="5. Candidate Rights">
            <p>
              In accordance with digital data standards, you retain the right to <strong className="text-slate-900">access, modify, or terminate</strong> your personal data records. 
              Configuration updates can be performed via the candidate dashboard or by submitting a permanent deletion request to our support node.
            </p>
          </Section>

          {/* Contact Footer Banner */}
          <div className="mt-16 p-8 md:p-10 rounded-2xl bg-indigo-600 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            {/* Background Graphic */}
            <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 scale-150 transition-transform group-hover:rotate-0">
               <Cpu className="w-32 h-32" />
            </div>
            
            <div className="text-center md:text-left relative z-10">
              <h3 className="text-2xl font-black mb-1 uppercase tracking-tighter">System Support?</h3>
              <p className="text-indigo-100 font-medium text-sm">Our technical team is ready to assist you.</p>
            </div>
            <a
              href="mailto:edulocusweb@gmail.com"
              className="flex items-center gap-2 px-8 py-5 bg-white text-indigo-600 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-slate-100 transition-all shadow-xl active:scale-95 relative z-10"
            >
              <Mail className="w-4 h-4" />
              Contact Node
            </a>
          </div>
        </div>

        <p className="text-center text-slate-400 text-[10px] mt-12 uppercase tracking-[0.4em] font-black">
          &copy; {new Date().getFullYear()} IOE Locus &bull; Edulocus Initiative
        </p>
      </div>
    </div>
  );
};

export default Page;