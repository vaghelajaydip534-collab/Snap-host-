'use client';

import { motion } from 'motion/react';
import { Layers } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-[#5b5ef4] to-[#f97316] rounded-lg flex items-center justify-center text-white font-bold">
            <Layers size={20} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#5b5ef4] to-[#f97316]">
            SnapHost
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-medium text-[#6b7280]">
          <Link href="#features" className="text-sm hover:text-[#5b5ef4] transition-colors">Features</Link>
          <span className="text-sm cursor-not-allowed hover:text-[#5b5ef4] transition-colors">Pricing</span>
        </div>

        <div>
          <button className="px-5 py-2 bg-[#5b5ef4] hover:bg-[#4a4ddb] text-white text-sm font-semibold rounded-full shadow-lg shadow-indigo-200/50 transition-colors">
            Upload Now
          </button>
        </div>
      </div>
    </nav>
  );
}
