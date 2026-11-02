import React, { useState } from 'react';
import { LaptopDashboard } from './LaptopDashboard';
import { AndroidAppView } from './AndroidAppView';
import { VoiceListeningModal } from '../components/VoiceListeningModal';
import { 
  Laptop, 
  Smartphone, 
  Mic, 
  MessageSquare, 
  BookOpen, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';

export const DualShowcaseView: React.FC = () => {
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  return (
    <div className="w-full space-y-10 pb-16 animate-fade-in">
      
      {/* Voice Listening Modal */}
      <VoiceListeningModal 
        isOpen={voiceModalOpen} 
        onClose={() => setVoiceModalOpen(false)} 
      />

      {/* Showcase Stage: Laptop & Android Side-by-Side (Matching Image 4!) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Laptop / Desktop Web Interface (7 or 8 cols) */}
        <div className="xl:col-span-8 space-y-3">
          {/* Header Pill Tag from Image 4 */}
          <div className="flex justify-center xl:justify-start">
            <span className="px-5 py-1.5 rounded-full bg-[#4c1d95] text-white font-extrabold text-xs shadow-md tracking-wide flex items-center gap-2">
              <Laptop className="w-4 h-4 text-purple-200" />
              <span>Bambi – Web Interface (Desktop / Laptop)</span>
            </span>
          </div>

          {/* Laptop Mockup Shell */}
          <div className="p-3 sm:p-5 rounded-[36px] bg-gradient-to-b from-[#2a2d34] to-[#1e2025] shadow-2xl border-4 border-gray-700/60 ring-1 ring-white/10">
            {/* Laptop Camera dot */}
            <div className="w-2.5 h-2.5 rounded-full bg-black mx-auto mb-2.5 border border-gray-600" />
            
            {/* Screen Content */}
            <div className="rounded-[24px] overflow-hidden bg-[#f6f3fc]">
              <LaptopDashboard onOpenVoiceModal={() => setVoiceModalOpen(true)} />
            </div>
          </div>
        </div>

        {/* Right Column: Bambi Android App (4 or 5 cols) */}
        <div className="xl:col-span-4 space-y-3">
          {/* Header Pill Tag from Image 4 */}
          <div className="flex justify-center">
            <span className="px-5 py-1.5 rounded-full bg-[#4c1d95] text-white font-extrabold text-xs shadow-md tracking-wide flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-purple-200" />
              <span>Bambi Android App</span>
            </span>
          </div>

          {/* Android Smartphone View (with Mockup Frame) */}
          <div className="flex justify-center">
            <AndroidAppView isMockup={true} onOpenVoiceModal={() => setVoiceModalOpen(true)} />
          </div>
        </div>

      </div>

      {/* Bottom Feature Badges (Matching Image 4 Footer!) */}
      <section className="pt-6 border-t border-[#e2e6ef]">
        <div className="flex flex-wrap items-center justify-around gap-6 text-center">
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-white border-2 border-[#dcd1ff] text-[#7c3aed] flex items-center justify-center shadow-md shadow-purple-100 hover:scale-110 transition-transform">
              <Mic className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#152225]">Voice Listening</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-white border-2 border-[#dcd1ff] text-[#7c3aed] flex items-center justify-center shadow-md shadow-purple-100 hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#152225]">Natural Chat</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-white border-2 border-[#dcd1ff] text-[#7c3aed] flex items-center justify-center shadow-md shadow-purple-100 hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#152225]">Personal Space</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-white border-2 border-[#dcd1ff] text-[#7c3aed] flex items-center justify-center shadow-md shadow-purple-100 hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#152225]">Your Privacy Our Priority</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-white border-2 border-[#dcd1ff] text-[#7c3aed] flex items-center justify-center shadow-md shadow-purple-100 hover:scale-110 transition-transform">
              <Globe className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#152225]">Available Worldwide</span>
          </div>

        </div>
      </section>

    </div>
  );
};
