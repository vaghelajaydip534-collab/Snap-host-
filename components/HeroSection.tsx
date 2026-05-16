'use client';

import { motion } from 'motion/react';

const stats = [
  { label: '32MB Max Size', emoji: '📦' },
  { label: 'Free Forever', emoji: '💸' },
  { label: 'Lightning Fast CDN', emoji: '⚡' },
];

export function HeroSection() {
  return (
    <section className="relative w-full">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm mb-6 w-fit"
        >
          <span className="text-xs">🚀</span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5b5ef4]">Free Image Hosting — No Sign Up</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-5xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-4 text-[#0f0f1a]"
        >
          Host & Share Images <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5b5ef4] to-[#f97316]">Instantly for Free</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base text-[#6b7280] mb-8 leading-relaxed max-w-lg"
        >
          Upload images up to 32MB and get shareable links instantly. Perfect for forums, blogs, social media, and developers seeking speed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-start gap-4 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full md:hidden px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5b5ef4] to-[#7c3aed] text-white font-bold shadow-xl shadow-indigo-200 flex items-center justify-center transition-colors"
            onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Upload Image
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-1 gap-3 max-w-sm"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + idx * 0.1 }}
              className="flex items-center gap-4 bg-white/60 p-3 rounded-xl border border-gray-100"
            >
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-[#5b5ef4] text-lg shrink-0">
                {stat.emoji}
              </div>
              <div>
                <div className="text-sm font-bold text-[#0f0f1a]">{stat.label}</div>
                <div className="text-[12px] text-[#6b7280]">Supports fast global delivery</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
