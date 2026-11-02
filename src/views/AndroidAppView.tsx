import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BambiRobot } from '../components/BambiRobot';
import { VoiceListeningModal } from '../components/VoiceListeningModal';
import { 
  Heart, 
  Menu, 
  Headphones, 
  MessageSquare, 
  BookOpen, 
  User, 
  Home, 
  ChevronRight, 
  Wifi, 
  Battery, 
  Signal, 
  Sparkles,
  X,
  Sun,
  Calendar,
  Lightbulb,
  Compass,
  Mic,
  ShieldAlert
} from 'lucide-react';

interface AndroidAppViewProps {
  onOpenVoiceModal?: () => void;
  isMockup?: boolean;
}

export const AndroidAppView: React.FC<AndroidAppViewProps> = ({ 
  onOpenVoiceModal, 
  isMockup = false 
}) => {
  const { 
    user,
    setCurrentSpace, 
    setShowOnboarding, 
    setShowUrgentHelp,
    playTrack,
    isAudioPlaying 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  const handleOpenVoice = () => {
    if (onOpenVoiceModal) {
      onOpenVoiceModal();
    } else {
      setVoiceModalOpen(true);
    }
  };

  const appContent = (
    <div className="w-full min-h-screen bg-[#fbf9fe] flex flex-col justify-between overflow-x-hidden selection:bg-[#dcd1ff] max-w-md sm:max-w-lg lg:max-w-xl mx-auto md:border-x md:border-[#ece7f7] md:shadow-xl md:my-3 md:rounded-[36px]">
      
      {/* Voice Listening Modal */}
      <VoiceListeningModal 
        isOpen={voiceModalOpen} 
        onClose={() => setVoiceModalOpen(false)} 
      />

      {/* App Header Bar (Logo + Actions + Hamburger Menu) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-[#ece7f7] shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#7c3aed] text-white flex items-center justify-center shadow-md shadow-purple-200">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-[#152225] leading-tight">
              Bambi
            </span>
            <span className="text-[10px] font-semibold text-[#8b5cf6] leading-none">
              My Little Space
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Urgent help quick button */}
          <button
            onClick={() => setShowUrgentHelp(true)}
            className="p-2 rounded-xl text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
            title="Urgent support"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>

          {/* Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#152225] bg-[#f6f3fc] hover:bg-purple-100/60 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed top-14 left-4 right-4 z-50 bg-white rounded-3xl shadow-2xl border border-[#ece7f7] p-4 space-y-1.5 animate-fade-in text-xs font-bold">
          <button
            onClick={() => { setCurrentSpace('home'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-purple-50 text-[#152225] flex items-center gap-2.5"
          >
            <span>🏠</span> Home Sanctuary
          </button>
          <button
            onClick={() => { setCurrentSpace('listen'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-purple-50 text-[#152225] flex items-center gap-2.5"
          >
            <span>🎧</span> Listen Space & Soundscapes
          </button>
          <button
            onClick={() => { setCurrentSpace('talk'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-purple-50 text-[#152225] flex items-center gap-2.5"
          >
            <span>💬</span> Talk with Bambi Companion
          </button>
          <button
            onClick={() => { setCurrentSpace('peermatch'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-purple-50 text-[#152225] flex items-center gap-2.5"
          >
            <span>👥</span> Ugandan Peer Listening Directory
          </button>
          <button
            onClick={() => { setCurrentSpace('myspace'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-purple-50 text-[#152225] flex items-center gap-2.5"
          >
            <span>📖</span> My Space (Journal & Memories)
          </button>
          <button
            onClick={() => { setCurrentSpace('daily'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-purple-50 text-[#152225] flex items-center gap-2.5"
          >
            <span>☀️</span> Daily Check-in & Moments
          </button>
          <button
            onClick={() => { setCurrentSpace('freetools'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-purple-50 text-[#152225] flex items-center gap-2.5"
          >
            <span>✨</span> Free Discovery Tools & KolaKit
          </button>
          <button
            onClick={() => { setCurrentSpace('admin'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-purple-50 text-[#152225] flex items-center gap-2.5"
          >
            <span>⚙️</span> Practice Admin & UGX 500 Ledger
          </button>
          <div className="pt-2 border-t border-[#ece7f7]">
            <button
              onClick={() => { setShowUrgentHelp(true); setMobileMenuOpen(false); }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl bg-rose-50 text-rose-700 font-bold flex items-center gap-2.5"
            >
              <span>🚨</span> Urgent Support Contacts
            </button>
          </div>
        </div>
      )}

      {/* Scrollable Main Mobile Body */}
      <main className="flex-1 px-4 py-4 space-y-4 max-w-lg mx-auto w-full">
        
        {/* Bambi Robot Hero Card (From Image 4!) */}
        <section className="rounded-[32px] p-5 bg-gradient-to-b from-[#f3efff] via-[#efe9fc] to-[#e8e0ff] border border-[#dcd1ff] flex flex-col items-center text-center shadow-sm relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-purple-300/30 blur-2xl" />

          {/* Robot Illustration */}
          <div className="my-1">
            <BambiRobot size={135} animated={true} />
          </div>

          {/* Welcoming Greeting */}
          <div className="space-y-1 mt-1">
            <h1 className="text-2xl font-black text-[#152225] flex items-center justify-center gap-1.5">
              <span>Hello there, Moses!</span>
              <span>👋</span>
            </h1>
            <p className="text-xs font-bold text-[#6d28d9]">
              Welcome to your little space.
            </p>
            <p className="text-[11px] text-[#5e6978] max-w-xs mx-auto pt-0.5">
              Talk, listen, reflect and enjoy a little company.
            </p>
          </div>
        </section>

        {/* Stacked Action Cards (Matching Image 4!) */}
        <div className="space-y-3">
          
          {/* Card 1: Listen (Purple Gradient) */}
          <div
            onClick={handleOpenVoice}
            className="cursor-pointer p-4 rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6] text-white shadow-md shadow-purple-300/40 flex items-center justify-between group active:scale-98 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">Listen</h3>
                <p className="text-xs text-purple-100">Talk with Bambi · Voice Orb</p>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ChevronRight className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Card 2: Chat (Soft Lavender) */}
          <div
            onClick={() => setCurrentSpace('talk')}
            className="cursor-pointer p-4 rounded-2xl bg-white hover:bg-purple-50/70 border border-[#e9e3ff] shadow-sm flex items-center justify-between group active:scale-98 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-purple-100 text-[#7c3aed] flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#152225]">Chat</h3>
                <p className="text-xs text-[#5e6978]">Have an honest conversation</p>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-[#f3efff] flex items-center justify-center text-[#7c3aed] group-hover:translate-x-1 transition-transform">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>

          {/* Card 3: My Space (Soft Lilac) */}
          <div
            onClick={() => setCurrentSpace('myspace')}
            className="cursor-pointer p-4 rounded-2xl bg-white hover:bg-purple-50/70 border border-[#e9e3ff] shadow-sm flex items-center justify-between group active:scale-98 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-purple-100 text-[#7c3aed] flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#152225]">My Space</h3>
                <p className="text-xs text-[#5e6978]">Your notes & memories</p>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-[#f3efff] flex items-center justify-center text-[#7c3aed] group-hover:translate-x-1 transition-transform">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>

        </div>

        {/* Ugandan Peer Listening Pilot Banner */}
        <section 
          onClick={() => setCurrentSpace('peermatch')}
          className="p-4 rounded-2xl bg-gradient-to-r from-[#e6fb8b]/40 to-[#dcd1ff]/40 border border-[#d2ea6d] flex items-center justify-between cursor-pointer hover:shadow-sm transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇺🇬</span>
            <div>
              <p className="text-xs font-bold text-[#152225]">Ugandan Peer Sanctuary</p>
              <p className="text-[11px] text-[#5e6978]">
                Lived-experience peer listeners in Luganda, English & Swahili · UGX 500 pilot
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#152225] shrink-0" />
        </section>

        {/* "Your Daily Space" Section (4 Cards from Image 4!) */}
        <section className="space-y-3 pt-2">
          <div className="flex items-center gap-1.5 px-1">
            <span className="text-amber-500">⭐</span>
            <h2 className="text-sm font-black text-[#152225]">Your Daily Space</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            
            {/* Daily Check-in */}
            <div 
              onClick={() => setCurrentSpace('daily')}
              className="bg-white rounded-2xl p-4 border border-[#ece7f7] shadow-sm flex flex-col justify-between space-y-2 cursor-pointer hover:border-purple-300"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-[#152225]">Daily Check-in</h3>
                <p className="text-[10px] text-[#5e6978]">How are you feeling?</p>
              </div>
              <span className="text-[10px] font-bold text-[#7c3aed] pt-1">Check In →</span>
            </div>

            {/* Recent Activity */}
            <div 
              onClick={() => setCurrentSpace('myspace')}
              className="bg-white rounded-2xl p-4 border border-[#ece7f7] shadow-sm flex flex-col justify-between space-y-2 cursor-pointer hover:border-purple-300"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#7c3aed] flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-[#152225]">Recent Activity</h3>
                <p className="text-[10px] text-[#5e6978]">Where you left off</p>
              </div>
              <span className="text-[10px] font-bold text-[#7c3aed] pt-1">View History →</span>
            </div>

            {/* Helpful Tips */}
            <div 
              onClick={() => setCurrentSpace('freetools')}
              className="bg-white rounded-2xl p-4 border border-[#ece7f7] shadow-sm flex flex-col justify-between space-y-2 cursor-pointer hover:border-purple-300"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-[#152225]">Helpful Tips</h3>
                <p className="text-[10px] text-[#5e6978]">Get inspired today</p>
              </div>
              <span className="text-[10px] font-bold text-[#7c3aed] pt-1">See Tips →</span>
            </div>

            {/* Explore More */}
            <div 
              onClick={() => setCurrentSpace('freetools')}
              className="bg-white rounded-2xl p-4 border border-[#ece7f7] shadow-sm flex flex-col justify-between space-y-2 cursor-pointer hover:border-purple-300"
            >
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-[#152225]">Explore More</h3>
                <p className="text-[10px] text-[#5e6978]">Tools & calculators</p>
              </div>
              <span className="text-[10px] font-bold text-[#7c3aed] pt-1">Explore →</span>
            </div>

          </div>
        </section>

      </main>

      {/* Bottom App Navigation Bar (Matching Image 4!) */}
      <nav className="sticky bottom-0 z-30 border-t border-[#ece7f7] bg-white px-5 py-2.5 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setCurrentSpace('home')}
          className="flex flex-col items-center text-[#7c3aed] font-bold"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        <button
          onClick={() => setCurrentSpace('listen')}
          className="flex flex-col items-center text-[#5e6978] hover:text-[#7c3aed] font-medium"
        >
          <Headphones className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Listen</span>
        </button>

        <button
          onClick={() => setCurrentSpace('talk')}
          className="flex flex-col items-center text-[#5e6978] hover:text-[#7c3aed] font-medium"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Talk</span>
        </button>

        <button
          onClick={() => setCurrentSpace('myspace')}
          className="flex flex-col items-center text-[#5e6978] hover:text-[#7c3aed] font-medium"
        >
          <Heart className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">My Space</span>
        </button>

        <button
          onClick={() => setShowOnboarding(true)}
          className="flex flex-col items-center text-[#5e6978] hover:text-[#7c3aed] font-medium"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Profile</span>
        </button>
      </nav>

    </div>
  );

  // If rendering inside the desktop showcase mockup frame:
  if (isMockup) {
    return (
      <div className="relative w-full max-w-[380px] h-[780px] rounded-[48px] bg-black p-3.5 shadow-2xl border-4 border-[#334155]/40 ring-1 ring-white/20 select-none flex flex-col justify-between overflow-hidden">
        {/* Device Front Camera Punch Hole */}
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-black border border-gray-800 z-50 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-900/40" />
        </div>

        {/* Screen inside Mockup */}
        <div className="relative w-full h-full rounded-[38px] flex flex-col justify-between overflow-hidden">
          {/* Mockup Status Bar */}
          <div className="pt-2 px-6 pb-1 flex items-center justify-between text-xs font-bold text-[#152225] bg-white z-20">
            <span>9:41</span>
            <div className="flex items-center gap-1.5 text-[#152225]">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {appContent}
          </div>

          {/* Android Home Bar */}
          <div className="pb-1 pt-0.5 flex justify-center bg-white">
            <div className="w-32 h-1 rounded-full bg-[#152225]/30" />
          </div>
        </div>
      </div>
    );
  }

  // When rendered natively on the real mobile phone:
  return appContent;
};
