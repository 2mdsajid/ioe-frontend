import React from 'react';
import { Cpu, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-900 text-slate-400 pt-16 pb-8 overflow-hidden border-t border-slate-800">
      {/* Engineering Grid Overlay - Dark Mode */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Top Bar: Brand & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <div className='flex gap-3 items-center'>
              <div className="w-10 h-10 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center">
                <Cpu className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tighter uppercase">IOE LOCUS</span>
            </div>
            <Link href="mailto:support@ioelocus.com" className="text-sm font-medium hover:text-blue-400 transition-colors md:ml-1">
              support@ioelocus.com
            </Link>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 hover:scale-110 transition-all cursor-pointer">
              <Facebook className="w-4 h-4" />
            </div>
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 hover:scale-110 transition-all cursor-pointer">
              <Instagram className="w-4 h-4" />
            </div>
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 hover:scale-110 transition-all cursor-pointer">
              <Linkedin className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Main Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-16 border-b border-white/10">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">University Portals</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="https://entrance.ioe.edu.np" target="_blank" className="hover:text-blue-400 transition-colors">TU IOE Entrance</Link>
              </li>
              <li>
                <Link href="https://soe.ku.edu.np" target="_blank" className="hover:text-blue-400 transition-colors">KU School of Engineering</Link>
              </li>
              <li>
                <Link href="https://pu.edu.np" target="_blank" className="hover:text-blue-400 transition-colors">PU Engineering</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">Preparation</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="/tests?category=mathematics" className="hover:text-blue-400 transition-colors">Mathematics</Link>
              </li>
              <li>
                <Link href="/tests?category=physics" className="hover:text-blue-400 transition-colors">Physics</Link>
              </li>
              <li>
                <Link href="/tests?category=chemistry" className="hover:text-blue-400 transition-colors">Chemistry</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">Company</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">About Edulocus</Link>
              </li>
              <li>
                <Link href="/mentors" className="hover:text-blue-400 transition-colors">Our Mentors</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">Support</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="/contact" target="_blank" className="hover:text-blue-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] font-bold tracking-widest uppercase text-slate-600">
            © {new Date().getFullYear()} IOE LOCUS by Edulocus. All rights reserved.
          </div>
          <div className="text-[10px] font-bold tracking-widest uppercase text-slate-600">
            SYSTEM // ONLINE
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;