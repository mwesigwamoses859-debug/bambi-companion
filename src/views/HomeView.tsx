import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Headphones, 
  MessageSquare, 
  User, 
  Sun, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Clock, 
  Users, 
  Volume2
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setCurrentSpace, setShowOnboarding, playTrack, isAudioPlaying } = useApp();

  return (
    <div className="space-y-12 pb-16 animate-fade-in">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#eef2ff] via-[#f8f9fd] to-white border border-[#e2e6ef] p-6 sm:p-12 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#dcd1ff] text-[#152225] text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#2255ee]" />
            A Little Space. A Little More You.
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#152225] tracking-tight leading-tight">
            Your space. Your people.<br />
            <span className="text-[#2255ee]">A room to be heard.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#5e6978] leading-relaxed max-w-2xl mx-auto">
            Big feelings. Small questions. Life doing life. Bambi is an anonymous digital sanctuary where you can speak freely, listen to peaceful audio, connect with lived-experience peer listeners, or take a gentle mindful pause.
          </p>

          {/* Quick CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setCurrentSpace('talk')}
              className="px-6 py-3.5 rounded-2xl bg-[#2255ee] text-white font-bold text-sm hover:bg-[#1a44c2] transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>I want to talk</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => setCurrentSpace('listen')}
              className="px-6 py-3.5 rounded-2xl bg-white border border-[#e2e6ef] hover:border-[#2255ee] text-[#152225] font-bold text-sm transition-all shadow-sm flex items-center gap-2"
            >
              <Headphones className="w-4 h-4 text-[#2255ee]" />
              <span>I want to listen</span>
            </button>

            <button
              onClick={() => {
                playTrack('rain');
                setCurrentSpace('listen');
              }}
              className="px-5 py-3.5 rounded-2xl bg-[#e6fb8b] text-[#152225] font-bold text-sm hover:bg-[#d8f075] transition-all flex items-center gap-2 border border-[#d2ea6d]"
            >
              <Volume2 className="w-4 h-4" />
              <span>90-second pause</span>
            </button>
          </div>

          {/* Pilot Assurance Tag */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-[#5e6978]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Anonymous · No real names required
            </span>
            <span className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500" />
              Free during pilot · Proposed UGX 500 day pass
            </span>
          </div>
        </div>
      </section>

      {/* The 4 Core Spaces (The ChatGPT Bigger Recommendation!) */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-[#152225]">
            Explore the 4 Dedicated Spaces
          </h2>
          <p className="text-sm text-[#5e6978] mt-1">
            Bambi isn't just another chatbot. It is a complete digital companion platform designed to comfort, ground, and connect.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* 1. Listen Space */}
          <div 
            onClick={() => setCurrentSpace('listen')}
            className="group cursor-pointer rounded-3xl bg-white p-6 border border-[#e2e6ef] hover:border-[#2255ee] hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Headphones className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-black tracking-wider uppercase text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                Sanctuary
              </span>
              <h3 className="text-xl font-bold text-[#152225] mt-2 group-hover:text-[#2255ee] transition-colors">
                Listen
              </h3>
              <p className="text-xs text-[#5e6978] mt-1.5 leading-relaxed">
                Synthesized calming ambient soundscapes (rain, lake breeze, waves, chime), breathing pacer, and soothing voice reflections.
              </p>
            </div>
            <div className="mt-5 flex items-center text-xs font-bold text-[#2255ee]">
              <span>Enter Listen space</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 2. Talk Space */}
          <div 
            onClick={() => setCurrentSpace('talk')}
            className="group cursor-pointer rounded-3xl bg-white p-6 border border-[#e2e6ef] hover:border-[#2255ee] hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-black tracking-wider uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                Dialogue
              </span>
              <h3 className="text-xl font-bold text-[#152225] mt-2 group-hover:text-[#2255ee] transition-colors">
                Talk
              </h3>
              <p className="text-xs text-[#5e6978] mt-1.5 leading-relaxed">
                Empathetic AI companion and peer directory for venting, thinking out loud, and receiving thoughtful encouragement without advice.
              </p>
            </div>
            <div className="mt-5 flex items-center text-xs font-bold text-[#2255ee]">
              <span>Enter Talk space</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 3. My Space */}
          <div 
            onClick={() => setCurrentSpace('myspace')}
            className="group cursor-pointer rounded-3xl bg-white p-6 border border-[#e2e6ef] hover:border-[#2255ee] hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <User className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-black tracking-wider uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                Private Journal
              </span>
              <h3 className="text-xl font-bold text-[#152225] mt-2 group-hover:text-[#2255ee] transition-colors">
                My Space
              </h3>
              <p className="text-xs text-[#5e6978] mt-1.5 leading-relaxed">
                Personal reflection notes, emotional weather logs, gratitude journal, saved action cards, and avatar customizer.
              </p>
            </div>
            <div className="mt-5 flex items-center text-xs font-bold text-[#2255ee]">
              <span>Enter My space</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 4. Daily Moments */}
          <div 
            onClick={() => setCurrentSpace('daily')}
            className="group cursor-pointer rounded-3xl bg-white p-6 border border-[#e2e6ef] hover:border-[#2255ee] hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sun className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-black tracking-wider uppercase text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                Check-in
              </span>
              <h3 className="text-xl font-bold text-[#152225] mt-2 group-hover:text-[#2255ee] transition-colors">
                Daily Moments
              </h3>
              <p className="text-xs text-[#5e6978] mt-1.5 leading-relaxed">
                Daily check-ins ("How am I, really?"), inspiring affirmations, gratitude prompts, and gentle micro-moves.
              </p>
            </div>
            <div className="mt-5 flex items-center text-xs font-bold text-[#2255ee]">
              <span>Enter Daily Moments</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* What Makes Bambi Different */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e2e6ef]">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2255ee]">
            Why Bambi Exists
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#152225] mt-1">
            What makes Bambi different from ordinary AI chatbots
          </h2>
          <p className="text-sm text-[#5e6978] mt-2">
            Most AI tools try to rush you to a generated answer. Bambi gives you room to breathe, feel, and connect at your own human pace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h4 className="font-bold text-[#152225]">Human Peer Listening Option</h4>
            <p className="text-xs text-[#5e6978] leading-relaxed">
              When AI isn't enough, connect with vetted Ugandan community listeners in your preferred language (Luganda, English, Swahili, Runyankole) with lived experience.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h4 className="font-bold text-[#152225]">Zero-Log Anonymity</h4>
            <p className="text-xs text-[#5e6978] leading-relaxed">
              No tracking of your chats, no selling personal data. You show up with a chosen alias and an avatar, keeping your private life safe.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h4 className="font-bold text-[#152225]">Culturally Grounded & Fair</h4>
            <p className="text-xs text-[#5e6978] leading-relaxed">
              Built for real African context. Testing a micro UGX 500 day pass model so support is genuinely accessible to everyone, not just high earners.
            </p>
          </div>
        </div>
      </section>

      {/* Free Self-Discovery Tools Teaser */}
      <section className="bg-gradient-to-r from-[#dcd1ff]/40 to-[#e6fb8b]/40 rounded-3xl p-6 sm:p-8 border border-[#e2e6ef] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-[#152225]">
            Free Interactive Tools
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#152225]">
            Know yourself in 6 gentle questions
          </h3>
          <p className="text-xs sm:text-sm text-[#5e6978] max-w-lg">
            A 2-minute self-discovery reflection to uncover how you naturally recharge, what kind of space brings out your best, and save your personal action card.
          </p>
        </div>

        <button
          onClick={() => setCurrentSpace('freetools')}
          className="shrink-0 px-6 py-3 rounded-2xl bg-[#152225] text-white font-bold text-sm hover:bg-black transition-all shadow flex items-center gap-2"
        >
          <span>Take the 2-minute quiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

    </div>
  );
};
