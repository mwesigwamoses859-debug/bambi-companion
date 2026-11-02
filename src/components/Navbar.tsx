import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SpaceId } from '../types';
import { 
  Heart, 
  Headphones, 
  MessageSquare, 
  User, 
  Sun, 
  Users, 
  Sparkles, 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  Share2, 
  Check, 
  Settings, 
  ChevronDown,
  Laptop,
  Smartphone,
  LayoutGrid
} from 'lucide-react';
import { AVATARS } from '../data/initialData';

export const Navbar: React.FC = () => {
  const { 
    currentSpace, 
    setCurrentSpace, 
    user, 
    updateUser, 
    isAudioPlaying, 
    stopAudio, 
    setShowUrgentHelp,
    setShowOnboarding 
  } = useApp();

  const [menuOpen, setMenuOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const activeAvatar = AVATARS.find(a => a.id === user.avatarId) || AVATARS[0];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.origin);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e2e6ef] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo (Matching Purple Palette) */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentSpace('home')} 
              className="flex items-center gap-2 group text-left focus:outline-none"
              aria-label="Bambi home"
            >
              <div className="w-9 h-9 rounded-2xl bg-[#7c3aed] text-white flex items-center justify-center shadow-md shadow-purple-200 group-hover:scale-105 transition-transform">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg leading-tight tracking-tight text-[#152225] flex items-center gap-1">
                  Bambi<span className="text-[#7c3aed] text-xs font-black">✳</span>
                </span>
                <span className="text-[11px] text-[#8b5cf6] font-semibold leading-none">My Little Space</span>
              </div>
            </button>
          </div>

          {/* Interface Switcher Tabs */}
          <div className="flex items-center bg-[#f6f3fc] p-1 rounded-2xl border border-[#ece7f7] shadow-inner text-xs font-bold">
            <button
              onClick={() => setCurrentSpace('home')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                currentSpace === 'home' || currentSpace === 'android'
                  ? 'bg-[#7c3aed] text-white shadow-sm'
                  : 'text-[#5e6978] hover:text-[#7c3aed]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Phone App</span>
            </button>

            <button
              onClick={() => setCurrentSpace('laptop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                currentSpace === 'laptop'
                  ? 'bg-[#7c3aed] text-white shadow-sm'
                  : 'text-[#5e6978] hover:text-[#7c3aed]'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Laptop View</span>
            </button>

            <button
              onClick={() => setCurrentSpace('showcase')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                currentSpace === 'showcase'
                  ? 'bg-[#7c3aed] text-white shadow-sm'
                  : 'text-[#5e6978] hover:text-[#7c3aed]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dual Showcase</span>
            </button>
          </div>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Ambient Sound Indicator */}
            {isAudioPlaying && (
              <button
                onClick={stopAudio}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium animate-pulse"
                title="Soundscape playing. Click to mute."
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Sound active</span>
              </button>
            )}

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-2 text-[#5e6978] hover:text-[#152225] hover:bg-[#f8f9fd] rounded-lg transition-colors relative"
              title="Share Bambi link"
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Urgent Help Button */}
            <button
              onClick={() => setShowUrgentHelp(true)}
              className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Urgent help</span>
            </button>

            {/* User Avatar Menu */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full border border-[#e2e6ef] hover:border-[#7c3aed] bg-white transition-all text-xs font-medium"
              >
                <span className="text-sm">{activeAvatar.emoji}</span>
                <span className="max-w-[80px] sm:max-w-[100px] truncate text-[#152225] font-semibold">
                  Moses
                </span>
                <ChevronDown className="w-3 h-3 text-[#5e6978]" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-xl border border-[#e2e6ef] py-2 z-50">
                  <div className="px-4 py-2 border-b border-[#e2e6ef]">
                    <p className="text-xs text-[#5e6978]">Signed in anonymously</p>
                    <p className="text-sm font-bold text-[#152225] flex items-center gap-1.5 mt-0.5">
                      <span>{activeAvatar.emoji}</span> Moses
                    </p>
                    <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#dcd1ff] text-[#152225]">
                      Role: {user.role}
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowOnboarding(true);
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-[#152225] hover:bg-[#f8f9fd] flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-[#5e6978]" />
                      Customize look & avatar
                    </button>

                    <button
                      onClick={() => {
                        updateUser({ isSoloPractice: !user.isSoloPractice });
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-[#152225] hover:bg-[#f8f9fd] flex items-center gap-2"
                    >
                      <Settings className="w-3.5 h-3.5 text-[#5e6978]" />
                      Toggle {user.isSoloPractice ? 'Participant Pilot' : 'Solo Practice'}
                    </button>

                    <button
                      onClick={() => {
                        setCurrentSpace('peermatch');
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-[#152225] hover:bg-[#f8f9fd] flex items-center gap-2"
                    >
                      <Users className="w-3.5 h-3.5 text-[#5e6978]" />
                      Ugandan Peer Match
                    </button>

                    <button
                      onClick={() => {
                        setCurrentSpace('admin');
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-[#152225] hover:bg-[#f8f9fd] flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#5e6978]" />
                      Practice Admin & UGX Ledger
                    </button>

                    <button
                      onClick={() => {
                        setShowUrgentHelp(true);
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Urgent help resources
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
