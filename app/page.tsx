'use client';

import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { UploadTool } from '@/components/UploadTool';
import { RecentUploads } from '@/components/RecentUploads';
import { FeaturesSection } from '@/components/FeaturesSection';
import { Footer } from '@/components/Footer';
import { useState } from 'react';

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = () => {
    // Increment to trigger a re-render/re-fetch in the RecentUploads component
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col font-body">
      <Navbar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row px-4 md:px-8 py-8 md:py-12 gap-8 md:gap-12 w-full">
          <div className="w-full md:w-5/12 flex flex-col justify-center">
            <HeroSection />
          </div>
          <div className="w-full md:w-7/12 flex flex-col gap-6 relative">
            <UploadTool onUploadSuccess={handleUploadSuccess} />
            <RecentUploads refreshTrigger={refreshTrigger} />
          </div>
        </div>
        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
}

