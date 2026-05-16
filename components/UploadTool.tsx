'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'motion/react';
import { CloudUpload, Copy, CheckCircle2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { fileToBase64 } from '@/lib/upload';
import { ImgBBResponse } from '@/lib/types';
import { addToHistory } from '@/lib/history';
import Image from 'next/image';

const EXPIRY_OPTIONS = [
  { label: 'Never', value: '0' },
  { label: '5 minutes', value: '300' },
  { label: '1 hour', value: '3600' },
  { label: '1 day', value: '86400' },
  { label: '1 week', value: '604800' },
  { label: '1 month', value: '2592000' },
];

const MAX_SIZE = 32 * 1024 * 1024; // 32MB

export function UploadTool({ onUploadSuccess }: { onUploadSuccess?: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [expiry, setExpiry] = useState(EXPIRY_OPTIONS[0].value);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<ImgBBResponse['data'] | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (fileRejections.length > 0) {
      if (fileRejections[0].errors[0].code === 'file-too-large') {
        toast.error('File is too large. Maximum size is 32MB.');
      } else {
        toast.error('Invalid file type.');
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const selected = acceptedFiles[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] },
    maxSize: MAX_SIZE,
    maxFiles: 1,
  });

  const clearSelection = () => {
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      const base64 = await fileToBase64(file);
      
      const formData = new FormData();
      formData.append('image', base64);
      formData.append('expiration', expiry);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setResult(data.data);
      
      // Add to history
      addToHistory({
        id: data.data.id,
        title: data.data.title || file.name,
        url: data.data.url,
        thumb_url: data.data.thumb.url,
        viewer_url: data.data.url_viewer,
        uploaded_at: Date.now(),
      });

      toast.success('Image uploaded! Links ready to copy 🎉');
      if (onUploadSuccess) onUploadSuccess();

    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Upload failed. Check your connection and try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const resetAll = () => {
    clearSelection();
    setResult(null);
  };

  return (
    <section id="upload-section" className="relative z-10 w-full">
      <div className="w-full bg-white rounded-3xl p-6 md:p-8 shadow-2xl shadow-indigo-100/50 border border-white flex flex-col overflow-hidden">
        
        {!result ? (
          <div className="flex flex-col h-full justify-center">
            <div className="mb-6">
              <h2 className="font-heading text-xl font-bold mb-1 text-[#0f0f1a]">Upload Your Image</h2>
              <p className="text-xs text-[#6b7280]">Supports JPG, PNG, WEBP, GIF up to 32MB</p>
            </div>

            <div
              {...getRootProps()}
              className={`group relative border-2 border-dashed rounded-2xl h-56 flex flex-col items-center justify-center transition-colors cursor-pointer mb-6 ${
                isDragActive 
                  ? 'border-[#5b5ef4] bg-indigo-50/50' 
                  : 'border-gray-200 bg-gray-50/50 hover:bg-indigo-50/30 hover:border-[#5b5ef4]'
              }`}
            >
              <input {...getInputProps()} />
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CloudUpload size={32} className="text-[#5b5ef4]" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-semibold text-[#0f0f1a]">
                Drag & drop image here
              </p>
              <p className="text-xs text-[#6b7280] mt-1">or click to browse files</p>
            </div>

            <AnimatePresence>
              {file && preview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="w-12 h-12 relative rounded-lg overflow-hidden shrink-0 bg-gray-200">
                       <Image src={preview} alt="Preview" fill className="object-cover" unoptimized />
                    </div>
                    <div className="min-w-0 pr-4">
                      <p className="text-sm font-medium text-text-heading truncate">{file.name}</p>
                      <p className="text-xs text-text-body">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); clearSelection(); }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                    aria-label="Remove file"
                  >
                    <X size={20} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mb-6 gap-4 mt-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#6b7280] hidden sm:block">Auto-Delete After:</span>
                <select
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="bg-white border border-gray-200 rounded-lg text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-[#5b5ef4]"
                >
                  {EXPIRY_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="text-xs text-[#6b7280]">Max 32.0 MB</div>
            </div>

            <motion.button
              whileHover={file && !isUploading ? { scale: 1.02 } : {}}
              whileTap={file && !isUploading ? { scale: 0.98 } : {}}
              disabled={!file || isUploading}
              onClick={handleUpload}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                !file || isUploading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#5b5ef4] to-[#7c3aed] text-white shadow-xl shadow-indigo-200/50'
              }`}
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <CloudUpload size={20} />
                  Upload Image
                </>
              )}
            </motion.button>
          </div>
        ) : (
          <ResultCard result={result} onReset={resetAll} />
        )}
      </div>
    </section>
  );
}

function ResultCard({ result, onReset }: { result: ImgBBResponse['data'], onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-2 sm:p-4"
    >
      <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg border border-green-100 mb-8">
        <CheckCircle2 size={20} />
        <span className="font-semibold text-sm">Image Uploaded Successfully!</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 shrink-0 flex flex-col gap-3">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 border border-border shadow-inner">
            <Image 
              src={result.thumb.url} 
              alt="Uploaded thumbnail" 
              fill 
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="text-center text-xs text-text-body font-mono">
            {result.width} × {result.height} px • {(parseInt(result.size) / 1024).toFixed(1)} KB
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <CopyField label="Direct Link" value={result.url} />
          <CopyField label="Viewer Page" value={result.url_viewer} />
          
          <div className="h-px bg-border my-2 w-full" />
          
          <CopyField label="BBCode (Forums)" value={`[img]\${result.url}[/img]`} />
          <CopyField label="HTML (Website)" value={`<img src="\${result.url}" alt="\${result.title || 'image'}" border="0" />`} />
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          className="px-8 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-text-heading font-semibold transition-colors"
        >
          Upload Another Image
        </motion.button>
      </div>
    </motion.div>
  );
}

function CopyField({ label, value }: { label: string, value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-text-body mb-1 uppercase tracking-wider">{label}</label>
      <div className="flex relative">
        <input
          type="text"
          readOnly
          value={value}
          className="w-full bg-gray-50 border border-gray-200 rounded-l-xl px-4 py-2.5 text-sm text-text-heading font-mono outline-none focus:border-primary/50"
          onClick={(e) => (e.target as HTMLInputElement).select()}
        />
        <button
          onClick={handleCopy}
          className={`px-4 py-2.5 rounded-r-xl border-y border-r border-gray-200 font-medium text-sm transition-colors flex items-center gap-2 \${
            copied 
              ? 'bg-green-50 text-green-600 border-green-200' 
              : 'bg-white text-text-heading hover:bg-gray-50'
          }`}
        >
          {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
          <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
    </div>
  );
}
