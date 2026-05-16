'use client';

import { useEffect, useState } from 'react';
import { UploadHistoryItem } from '@/lib/types';
import { getHistory, clearHistory } from '@/lib/history';
import { motion, AnimatePresence } from 'motion/react';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, Copy, Check, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

export function RecentUploads({ refreshTrigger }: { refreshTrigger: number }) {
  const [history, setHistory] = useState<UploadHistoryItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setHistory(getHistory());
    setMounted(true);
  }, [refreshTrigger]);

  if (!mounted || history.length === 0) return null;

  const handleClear = () => {
    clearHistory();
    setHistory([]);
    toast.success('History cleared');
  };

  return (
    <section className="w-full">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#0f0f1a]">Recent Uploads</span>
          <button
            onClick={handleClear}
            className="text-[11px] text-[#5b5ef4] font-semibold hover:underline flex items-center gap-1"
          >
            Clear History
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          <AnimatePresence>
            {history.map((item, idx) => (
              <HistoryCard key={item.id} item={item} index={idx} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function HistoryCard({ item, index }: { item: UploadHistoryItem, index: number }) {
  const [copied, setCopied] = useState(false);

  const copyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(item.url);
    setCopied(true);
    toast.success('Link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ delay: index * 0.05 }}
      className="aspect-square rounded-xl bg-white p-1 border border-gray-100 shadow-sm overflow-hidden group relative"
    >
      <div className="w-full h-full relative rounded-lg overflow-hidden bg-[#eef2ff] border border-indigo-50">
        <Image 
          src={item.thumb_url} 
          alt={item.title || 'Recent upload'} 
          fill 
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-[2px]">
            <a
              href={item.viewer_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
              title="View Image"
            >
              <ExternalLink size={16} />
            </a>
            <button
              onClick={copyLink}
              className={`p-2 rounded-full transition-colors ${
                copied ? 'bg-green-500/80 text-white' : 'bg-white/20 hover:bg-white/40 text-white'
              }`}
              title="Copy Link"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
        </div>
      </div>
    </motion.div>
  );
}
