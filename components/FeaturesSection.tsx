'use client';

import { motion } from 'motion/react';
import { Rocket, Link2, Trash2, Globe, Code2, Heart } from 'lucide-react';

const features = [
  { icon: Rocket, title: 'Instant Upload', desc: 'Images live in under a second', color: 'bg-blue-100 text-blue-600' },
  { icon: Link2, title: 'Shareable Links', desc: 'Multiple link formats ready to copy', color: 'bg-purple-100 text-purple-600' },
  { icon: Trash2, title: 'Auto Delete', desc: 'Set expiry time for temporary uploads', color: 'bg-orange-100 text-orange-600' },
  { icon: Globe, title: 'Reliable CDN', desc: 'Fast delivery worldwide', color: 'bg-green-100 text-green-600' },
  { icon: Code2, title: 'Developer API', desc: 'Simple REST API integration', color: 'bg-indigo-100 text-indigo-600' },
  { icon: Heart, title: 'Always Free', desc: 'No account or credit card needed', color: 'bg-pink-100 text-pink-600' },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 bg-white/50 border-y border-border backdrop-blur-xl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-heading mb-4">Everything You Need</h2>
          <p className="text-text-body max-w-2xl mx-auto">
            A complete suite of tools designed for seamless image sharing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((ft, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, borderColor: 'var(--color-primary)' }}
              className="group bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 \${ft.color}`}>
                <ft.icon size={24} strokeWidth={2} />
              </div>
              <h3 className="font-heading font-semibold text-lg text-text-heading mb-2">{ft.title}</h3>
              <p className="text-sm text-text-body">{ft.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
