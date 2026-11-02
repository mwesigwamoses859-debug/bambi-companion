import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BambiRobot } from '../components/BambiRobot';
import { VoiceListeningModal } from '../components/VoiceListeningModal';
import { 
  Heart, 
  Home, 
  Headphones, 
  MessageSquare, 
  BookOpen, 
  User, 
  HelpCircle, 
  LogOut, 
  Bell, 
  Sun, 
  Calendar, 
  Lightbulb, 
  Compass, 
  ArrowRight, 
  Mic, 
  ShieldCheck, 
  Globe, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface LaptopDashboardProps {
  onOpenVoiceModal?: () => void;
}

export const LaptopDashboard: React.FC<LaptopDashboardProps> = ({ onOpenVoiceModal }) => {
  const { 
    user, 
    setCurrentSpace, 
    setShowUrgentHelp, 
    setShowOnboarding, 
    completedSessions 
  } = useApp();

  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [tipNotice, setTipNotice] = useState<string | null>(null);

  const handleOpenVoice = () => {
    if (onOpenVoiceModal) {
      onOpenVoiceModal();
    } else {
      setVoiceModalOpen(true);
    }
  };

  const showTip = () => {
    setTipNotice("💡 Today's Little Tip: You don't have to carry every responsibility alone. Start your day with 3 slow breaths before answering any messages.");
    setTimeout(() => setTipNotice(null), 6000);
  };

  return (
    <div className="w-full bg-[#f6f3fc] text-[#152225] p-2 sm:p-4 rounded-3xl font-sans selection:bg-[#dcd1ff]">
      
      {/* Voice Listening Modal */}
      <VoiceListeningModal 
        isOpen={voiceModalOpen} 
        onClose={() => setVoiceModalOpen(false)} 
      />

      {/* Main Layout Container (Sidebar + Content) */}
      <div className="flex flex-col lg:flex-row gap-5 max-w-[1400px] mx-auto min-h-[780px]">
        
        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="w-full lg:w-64 bg-white rounded-[28px] p-5 shadow-sm border border-[#ece7f7] flex flex-col justify-between shrink-0">
          <div>
            {/* Bambi Brand Logo */}
            <div className="flex items-center gap-3 px-2 py-1 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-[#7c3aed] text-white flex items-center justify-center shadow-md shadow-purple-200">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-[#152225] leading-tight">
                  Bambi
                </span>
                <span className="text-[11px] font-semibold text-[#8b5cf6] leading-none">
                  My Little Space
                </span>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1.5">
              <button
                onClick={() => setCurrentSpace('home')}
                className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm bg-[#7c3aed] text-white shadow-md shadow-purple-300/40 transition-all"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>

              <button
                onClick={() => setCurrentSpace('listen')}
                className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-semibold text-sm text-[#5e6978] hover:text-[#7c3aed] hover:bg-[#f6f3fc] transition-colors"
              >
                <Headphones className="w-4 h-4 text-[#8b5cf6]" />
                <span>Listen</span>
              </button>

              <button
                onClick={() => setCurrentSpace('talk')}
                className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-semibold text-sm text-[#5e6978] hover:text-[#7c3aed] hover:bg-[#f6f3fc] transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#8b5cf6]" />
                <span>Talk</span>
              </button>

              <button
                onClick={() => setCurrentSpace('myspace')}
                className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-semibold text-sm text-[#5e6978] hover:text-[#7c3aed] hover:bg-[#f6f3fc] transition-colors"
              >
                <BookOpen className="w-4 h-4 text-[#8b5cf6]" />
                <span>My Space</span>
              </button>

              <button
                onClick={() => setShowOnboarding(true)}
                className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-semibold text-sm text-[#5e6978] hover:text-[#7c3aed] hover:bg-[#f6f3fc] transition-colors"
              >
                <User className="w-4 h-4 text-[#8b5cf6]" />
                <span>Profile</span>
              </button>
            </nav>
          </div>

          {/* Sidebar Footer Area */}
          <div className="space-y-4 pt-6">
            <div className="border-t border-[#f0ebfa] pt-3 space-y-1 text-xs font-semibold text-[#5e6978]">
              <button
                onClick={() => setShowUrgentHelp(true)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-[#8b5cf6]" />
                <span>Help & Support</span>
              </button>

              <button
                onClick={() => setShowOnboarding(true)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:text-[#152225] hover:bg-gray-100 transition-colors"
              >
                <LogOut className="w-4 h-4 text-[#8b5cf6]" />
                <span>Change Look / Out</span>
              </button>
            </div>

            {/* "You are not alone..." Floating Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-[#f3efff] to-[#e8e0ff] border border-[#dcd1ff] text-center shadow-sm">
              <div className="w-7 h-7 mx-auto rounded-full bg-white text-[#7c3aed] flex items-center justify-center mb-1.5 shadow-sm">
                <Heart className="w-4 h-4 fill-[#7c3aed]" />
              </div>
              <p className="text-[11px] font-bold text-[#152225]">You are not alone...</p>
              <p className="text-[10px] text-[#6d28d9] mt-0.5">Bambi is here for you 💜</p>
            </div>
          </div>
        </aside>

        {/* ================= MAIN CONTENT AREA ================= */}
        <main className="flex-1 space-y-5">
          
          {/* Top Bar: Notification & User Avatar */}
          <div className="flex items-center justify-between px-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7c3aed] bg-purple-100/70 px-2.5 py-1 rounded-full">
                Bambi Digital Companion · Web Interface
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              <button 
                onClick={showTip}
                className="w-10 h-10 rounded-2xl bg-white border border-[#ece7f7] shadow-sm flex items-center justify-center text-[#5e6978] hover:text-[#7c3aed] transition-colors relative"
                title="Notifications & Daily Whispers"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#7c3aed] ring-2 ring-white" />
              </button>

              {/* User Profile Avatar with Online Dot */}
              <div 
                onClick={() => setShowOnboarding(true)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-2xl bg-white border border-[#ece7f7] shadow-sm cursor-pointer hover:border-purple-300 transition-all"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7c3aed] to-[#a855f7] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    {user.alias ? user.alias.slice(0, 2).toUpperCase() : 'MO'}
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-[#152225] leading-tight">Moses</span>
                  <span className="text-[10px] text-emerald-600 font-semibold leading-none">Online</span>
                </div>
              </div>
            </div>
          </div>

          {tipNotice && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 animate-fade-in shadow-sm">
              {tipNotice}
            </div>
          )}

          {/* Panoramic Savannah Sunset Hero Banner (Matching Image 4!) */}
          <section className="relative overflow-hidden rounded-[32px] border border-[#ece7f7] shadow-md min-h-[220px] sm:min-h-[250px] flex items-center">
            
            {/* Panoramic Sunrise/Savannah Background Art */}
            <div 
              className="absolute inset-0 -z-10"
              style={{
                background: 'linear-gradient(135deg, #f8efff 0%, #fae8e0 40%, #e2f1ff 70%, #d5e8ff 100%)'
              }}
            >
              {/* African Sunrise Sun Glow */}
              <div className="absolute top-8 right-32 w-48 h-48 rounded-full bg-gradient-to-r from-amber-200/60 to-orange-200/40 blur-2xl pointer-events-none" />

              {/* Acacia Tree Silhouette Vector */}
              <svg 
                className="absolute right-6 sm:right-16 bottom-0 w-44 sm:w-64 h-36 sm:h-52 opacity-25 pointer-events-none" 
                viewBox="0 0 300 200" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M140 200C140 180 148 140 135 110C125 90 90 85 70 70C60 62 45 40 15 35C45 45 65 30 90 40C110 50 120 70 140 85C155 70 180 55 210 50C240 45 270 30 295 25C265 40 240 55 215 65C190 75 165 95 155 120C150 145 155 180 155 200H140Z" fill="#3b2d54" />
                <ellipse cx="60" cy="40" rx="55" ry="15" fill="#3b2d54" />
                <ellipse cx="140" cy="30" rx="75" ry="16" fill="#3b2d54" />
                <ellipse cx="230" cy="35" rx="60" ry="14" fill="#3b2d54" />
              </svg>

              {/* Gentle Rolling Hills */}
              <svg className="absolute bottom-0 inset-x-0 w-full h-20 opacity-30 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 120">
                <path d="M0,60 C300,10 600,90 1200,30 L1200,120 L0,120 Z" fill="#65a30d" opacity="0.4" />
                <path d="M0,80 C400,40 800,100 1200,50 L1200,120 L0,120 Z" fill="#15803d" opacity="0.3" />
              </svg>
            </div>

            {/* Banner Inner Content */}
            <div className="relative z-10 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 w-full">
              
              {/* Cute Bambi Robot with Glowing Heart */}
              <div className="shrink-0">
                <BambiRobot size={150} animated={true} />
              </div>

              {/* Welcoming Text */}
              <div className="text-center sm:text-left space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-xs font-bold text-[#7c3aed] border border-white/90 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Personal Sanctuary</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-[#152225] tracking-tight">
                  Hello there, Moses! 👋
                </h1>

                <p className="text-base sm:text-lg font-bold text-[#7c3aed]">
                  Welcome to your little space.
                </p>

                <p className="text-xs sm:text-sm text-[#5e6978] max-w-lg">
                  Talk, listen, reflect and enjoy a little company. Everything here is gentle, private, and at your pace.
                </p>
              </div>

            </div>
          </section>

          {/* Middle "Meet Bambi" Card (From Image 4!) */}
          <section className="bg-white rounded-[28px] p-6 shadow-sm border border-[#ece7f7] grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            
            {/* Left 7 cols: Meet Bambi action */}
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-black text-[#152225]">Meet Bambi</h2>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#5e6978] leading-relaxed">
                I’m happy you’re here. What would you like to do today?
              </p>

              <div className="pt-2 flex flex-wrap gap-2.5">
                <button
                  onClick={() => setCurrentSpace('talk')}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] hover:from-[#6d28d9] hover:to-[#5b21b6] text-white text-xs sm:text-sm font-bold shadow-md shadow-purple-300/40 transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start a Conversation</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={handleOpenVoice}
                  className="px-4 py-3.5 rounded-2xl bg-[#f6f3fc] hover:bg-[#ede7fa] text-[#7c3aed] text-xs sm:text-sm font-bold border border-[#dcd1ff] transition-all flex items-center gap-2"
                >
                  <Mic className="w-4 h-4" />
                  <span>Voice Orb</span>
                </button>
              </div>
            </div>

            {/* Right 5 cols: 2 Quick Action Cards */}
            <div className="md:col-span-5 grid grid-cols-2 gap-3">
              {/* Listen Tile */}
              <div
                onClick={() => setCurrentSpace('listen')}
                className="cursor-pointer p-4 rounded-2xl bg-[#f8f9fd] hover:bg-[#f3efff] border border-[#ece7f7] hover:border-[#7c3aed] transition-all flex flex-col justify-between group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7c3aed] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-[#152225] group-hover:text-[#7c3aed] transition-colors">
                    Listen
                  </h3>
                  <p className="text-[10px] text-[#5e6978] mt-0.5">Voice Experience</p>
                </div>
              </div>

              {/* My Space Tile */}
              <div
                onClick={() => setCurrentSpace('myspace')}
                className="cursor-pointer p-4 rounded-2xl bg-[#f8f9fd] hover:bg-[#f3efff] border border-[#ece7f7] hover:border-[#7c3aed] transition-all flex flex-col justify-between group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7c3aed] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-[#152225] group-hover:text-[#7c3aed] transition-colors">
                    My Space
                  </h3>
                  <p className="text-[10px] text-[#5e6978] mt-0.5">Your Personal Journal</p>
                </div>
              </div>
            </div>

          </section>

          {/* "Your Daily Space" Section (4 Cards from Image 4!) */}
          <section className="space-y-3">
            <div className="flex items-center gap-1.5 px-1">
              <span className="text-amber-500">⭐</span>
              <h2 className="text-base font-black text-[#152225]">Your Daily Space</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: Daily Check-in */}
              <div className="bg-white rounded-2xl p-5 border border-[#ece7f7] shadow-sm flex flex-col justify-between space-y-3 hover:shadow-md transition-shadow">
                <div className="space-y-1.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Sun className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-xs text-[#152225] pt-1">Daily Check-in</h3>
                  <p className="text-[11px] text-[#5e6978]">How are you feeling?</p>
                </div>
                <button
                  onClick={() => setCurrentSpace('daily')}
                  className="w-full py-2 rounded-xl bg-[#f6f3fc] hover:bg-[#7c3aed] hover:text-white text-[#7c3aed] text-xs font-bold transition-all text-center border border-[#ece7f7]"
                >
                  Check In
                </button>
              </div>

              {/* Card 2: Recent Activity */}
              <div className="bg-white rounded-2xl p-5 border border-[#ece7f7] shadow-sm flex flex-col justify-between space-y-3 hover:shadow-md transition-shadow">
                <div className="space-y-1.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#7c3aed] flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-xs text-[#152225] pt-1">Recent Activity</h3>
                  <p className="text-[11px] text-[#5e6978]">Continue where you left off</p>
                </div>
                <button
                  onClick={() => setCurrentSpace('myspace')}
                  className="w-full py-2 rounded-xl bg-[#f6f3fc] hover:bg-[#7c3aed] hover:text-white text-[#7c3aed] text-xs font-bold transition-all text-center border border-[#ece7f7]"
                >
                  View History
                </button>
              </div>

              {/* Card 3: Helpful Tips */}
              <div className="bg-white rounded-2xl p-5 border border-[#ece7f7] shadow-sm flex flex-col justify-between space-y-3 hover:shadow-md transition-shadow">
                <div className="space-y-1.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-xs text-[#152225] pt-1">Helpful Tips</h3>
                  <p className="text-[11px] text-[#5e6978]">Get inspired today</p>
                </div>
                <button
                  onClick={showTip}
                  className="w-full py-2 rounded-xl bg-[#f6f3fc] hover:bg-[#7c3aed] hover:text-white text-[#7c3aed] text-xs font-bold transition-all text-center border border-[#ece7f7]"
                >
                  See Tips
                </button>
              </div>

              {/* Card 4: Explore More */}
              <div className="bg-white rounded-2xl p-5 border border-[#ece7f7] shadow-sm flex flex-col justify-between space-y-3 hover:shadow-md transition-shadow">
                <div className="space-y-1.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-xs text-[#152225] pt-1">Explore More</h3>
                  <p className="text-[11px] text-[#5e6978]">Discover new features</p>
                </div>
                <button
                  onClick={() => setCurrentSpace('freetools')}
                  className="w-full py-2 rounded-xl bg-[#f6f3fc] hover:bg-[#7c3aed] hover:text-white text-[#7c3aed] text-xs font-bold transition-all text-center border border-[#ece7f7]"
                >
                  Explore
                </button>
              </div>

            </div>
          </section>

          {/* Bottom Glowing Ribbon Banner (From Image 4!) */}
          <section className="rounded-2xl p-4 bg-gradient-to-r from-[#4c1d95] via-[#6d28d9] to-[#7c3aed] text-white flex items-center justify-between shadow-md relative overflow-hidden">
            <div className="flex items-center gap-2.5 z-10">
              <span className="text-amber-300 text-sm">💛</span>
              <p className="text-xs sm:text-sm font-bold tracking-tight">
                A kinder, smarter and more supportive AI companion.
              </p>
            </div>

            {/* Glowing wavy neon decoration */}
            <svg className="h-6 w-32 opacity-40" viewBox="0 0 100 20" fill="none">
              <path d="M0 10 Q25 0, 50 10 T100 10" stroke="#f472b6" strokeWidth="3" />
            </svg>
          </section>

          {/* Bottom Features Pill Strip (From Image 4!) */}
          <div className="pt-2 flex flex-wrap items-center justify-around gap-4 text-xs font-semibold text-[#5e6978]">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-[#7c3aed] flex items-center justify-center shadow-sm">
                <Mic className="w-5 h-5" />
              </div>
              <span className="text-[11px]">Voice Listening</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-[#7c3aed] flex items-center justify-center shadow-sm">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-[11px]">Natural Chat</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-[#7c3aed] flex items-center justify-center shadow-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[11px]">Personal Space</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-[#7c3aed] flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[11px]">Your Privacy Our Priority</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-[#7c3aed] flex items-center justify-center shadow-sm">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-[11px]">Available Worldwide</span>
            </div>
          </div>

        </main>

      </div>
    </div>
  );
};
