import { Layers } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-white/50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-tr from-[#5b5ef4] to-[#f97316] rounded-lg flex items-center justify-center text-white font-bold">
                <Layers size={20} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-[#0f0f1a]">
                SnapHost
              </span>
            </div>
            <p className="text-sm text-[#6b7280] max-w-sm">
              Fast, reliable, and completely free image hosting platform for everyone. Upload images instantly to our worldwide CDN.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#0f0f1a] mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-[#6b7280]">
              <li><a href="#" className="hover:text-[#5b5ef4] transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-[#5b5ef4] transition-colors">Supported Formats</a></li>
              <li><a href="#" className="hover:text-[#5b5ef4] transition-colors">Upload Plugin</a></li>
              <li><a href="#" className="hover:text-[#5b5ef4] transition-colors">System Status</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#0f0f1a] mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-[#6b7280]">
              <li><a href="#" className="hover:text-[#5b5ef4] transition-colors">Terms of Condition</a></li>
              <li><a href="#" className="hover:text-[#5b5ef4] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#5b5ef4] transition-colors">DMCA Guidelines</a></li>
              <li><a href="#" className="hover:text-[#5b5ef4] transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6b7280]">
          <p>© {new Date().getFullYear()} SnapHost. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#5b5ef4] transition-colors">Terms of Condition</a>
            <a href="#" className="hover:text-[#5b5ef4] transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
