import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff, MessageSquare, Sparkles, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { generateBambiAIResponse } from '../utils/bambiAI';
import { useApp } from '../context/AppContext';

interface VoiceListeningModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'pearlescent' | 'cyan' | 'purple';
}

export const VoiceListeningModal: React.FC<VoiceListeningModalProps> = ({
  isOpen,
  onClose,
  theme = 'pearlescent'
}) => {
  const { user, setCurrentSpace } = useApp();

  const [isListening, setIsListening] = useState(true);
  const [autoTranscribe, setAutoTranscribe] = useState(true);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [waveHeights, setWaveHeights] = useState([14, 22, 32, 18, 28, 38, 24, 16]);
  const [transcript, setTranscript] = useState("Listening for your voice... Say whatever is on your heart.");
  const [bambiSpeaking, setBambiSpeaking] = useState(false);
  const [lastAIResponse, setLastAIResponse] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    if (!isOpen) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setBambiSpeaking(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          if (currentTranscript.trim()) {
            setTranscript(`“${currentTranscript.trim()}”`);
            handleVoiceInput(currentTranscript.trim());
          }
        };

        recognition.onerror = () => {
          // Gracefully continue with animated pulse
        };

        if (isListening) {
          recognition.start();
        }
        recognitionRef.current = recognition;
      } catch (err) {
        console.log('Speech recognition unavailable:', err);
      }
    } else {
      // Fallback demo simulation if Web Speech API is not supported in the environment
      const t = setTimeout(() => {
        if (isListening && transcript.startsWith("Listening")) {
          setTranscript("“I've had a really busy week, Bambi, and just needed a quiet moment to breathe.”");
          handleVoiceInput("I've had a really busy week and just needed a quiet moment to breathe.");
        }
      }, 4000);
      return () => clearTimeout(t);
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
    };
  }, [isOpen, isListening]);

  // Handle AI answer & speech
  const handleVoiceInput = (userText: string) => {
    setTimeout(() => {
      const response = generateBambiAIResponse(userText, 'vent', user.alias);
      setLastAIResponse(response.reply);

      if (ttsEnabled && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(response.reply);
        utterance.rate = 0.95;
        utterance.pitch = 1.05;
        utterance.onstart = () => setBambiSpeaking(true);
        utterance.onend = () => setBambiSpeaking(false);
        utterance.onerror = () => setBambiSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }
    }, 1500);
  };

  // Modulate waveform animation
  useEffect(() => {
    if (!isOpen || (!isListening && !bambiSpeaking)) return;

    const interval = setInterval(() => {
      setWaveHeights(prev => 
        prev.map(() => Math.floor(Math.random() * (bambiSpeaking ? 34 : 26)) + 8)
      );
    }, 120);

    return () => clearInterval(interval);
  }, [isOpen, isListening, bambiSpeaking]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm sm:max-w-md h-[560px] rounded-[42px] bg-gradient-to-b from-[#f5f1fc] via-[#f7f5ff] to-[#eae4f7] border border-white/70 shadow-2xl flex flex-col items-center justify-between p-6 sm:p-8 overflow-hidden select-none">
        
        {/* Subtle Ambient Background Light */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-purple-300/35 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-pink-300/35 blur-3xl pointer-events-none" />

        {/* Top Header Controls */}
        <div className="w-full flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-xs font-bold text-[#7c3aed] border border-white/90 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Voice Analysis & Listening</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTtsEnabled(!ttsEnabled)}
              className="w-9 h-9 rounded-full bg-white/80 hover:bg-white backdrop-blur-md border border-white/90 shadow-sm flex items-center justify-center text-[#5e6978] hover:text-[#7c3aed] transition-all"
              title={ttsEnabled ? "Mute Bambi's voice" : "Enable Bambi's voice"}
            >
              {ttsEnabled ? <Volume2 className="w-4 h-4 text-[#7c3aed]" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/80 hover:bg-white backdrop-blur-md border border-white/90 shadow-sm flex items-center justify-center text-[#5e6978] hover:text-[#152225] transition-all"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center: The Breathtaking Ethereal Pearlescent Orb (From Images 1 & 2) */}
        <div className="relative flex flex-col items-center justify-center my-auto w-full">
          
          {/* Outer Ambient Glow Rings */}
          <div className={`absolute w-64 h-64 rounded-full blur-2xl transition-all duration-700 ${
            bambiSpeaking 
              ? 'bg-gradient-to-tr from-purple-400/40 via-pink-300/50 to-indigo-300/40 scale-110' 
              : 'bg-gradient-to-tr from-purple-200/50 via-pink-100/40 to-sky-200/50'
          }`} />

          {/* The Iridescent Pearlescent Sphere */}
          <div 
            className={`w-44 h-44 sm:w-52 sm:h-52 rounded-full relative shadow-[0_20px_50px_rgba(168,85,247,0.28)] flex items-center justify-center overflow-hidden transition-all duration-700 ${
              bambiSpeaking ? 'scale-105' : 'scale-100'
            }`}
            style={{
              background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #fdf2f8 20%, #f3e8ff 45%, #e0e7ff 70%, #dbeafe 95%)'
            }}
          >
            {/* Iridescent internal reflection shimmer */}
            <div 
              className="absolute inset-0 opacity-80 mix-blend-overlay animate-breathe"
              style={{
                background: 'conic-gradient(from 180deg at 50% 50%, #fbcfe8, #ddd6fe, #bae6fd, #fed7aa, #fbcfe8)'
              }}
            />

            {/* Specular highlight */}
            <div className="absolute top-4 left-6 w-16 h-10 rounded-full bg-white/80 blur-md transform -rotate-12" />
          </div>

          {/* Frosted Glass Floating Capsule Pill: "Listening ||||||||" */}
          <div className="-mt-6 z-20 flex items-center gap-3 px-5 py-2 rounded-full bg-white/85 hover:bg-white backdrop-blur-xl border border-white/95 shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
            <span className="text-xs font-bold text-[#6d28d9] tracking-tight">
              {bambiSpeaking ? 'Bambi Speaking' : isListening ? 'Listening' : 'Paused'}
            </span>

            {/* Dynamic Sound Waveform Bars */}
            <div className="flex items-center gap-1 h-5 px-1">
              {waveHeights.map((h, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full bg-gradient-to-t from-[#7c3aed] to-[#38bdf8] transition-all duration-100"
                  style={{ height: (isListening || bambiSpeaking) ? `${h}px` : '4px' }}
                />
              ))}
            </div>
          </div>

          {/* Real-time transcribed speech or Bambi AI Answer */}
          <div className="mt-4 px-3 max-w-sm text-center">
            {lastAIResponse ? (
              <div className="space-y-1.5 animate-fade-in">
                <p className="text-[11px] font-bold text-[#7c3aed] uppercase tracking-wider">
                  Bambi's Reflection:
                </p>
                <p className="text-xs font-semibold text-[#152225] leading-relaxed bg-white/60 p-2.5 rounded-2xl border border-white/80">
                  {lastAIResponse}
                </p>
              </div>
            ) : (
              <p className="text-xs font-medium text-[#152225] leading-relaxed">
                {transcript}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar: Action Icons & Auto Transcribe Toggle */}
        <div className="w-full flex flex-col items-center gap-3 z-10">
          
          {/* Controls Row */}
          <div className="w-full flex items-center justify-between px-6">
            <button
              onClick={() => {
                onClose();
                setCurrentSpace('talk');
              }}
              className="w-11 h-11 rounded-full bg-white/80 hover:bg-white backdrop-blur-md border border-white/90 shadow-sm flex items-center justify-center text-[#5e6978] hover:text-[#7c3aed] transition-colors"
              title="Switch to Chat room"
            >
              <MessageSquare className="w-5 h-5" />
            </button>

            {/* Main Microphone Button */}
            <button
              onClick={() => setIsListening(!isListening)}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
                isListening
                  ? 'bg-gradient-to-tr from-[#7c3aed] to-[#a855f7] text-white shadow-purple-500/40 scale-105 ring-4 ring-purple-200/70'
                  : 'bg-white text-gray-500 border border-gray-200'
              }`}
            >
              {isListening ? <Mic className="w-6 h-6 animate-pulse" /> : <MicOff className="w-6 h-6" />}
            </button>

            <button
              onClick={onClose}
              className="w-11 h-11 rounded-full bg-white/80 hover:bg-white backdrop-blur-md border border-white/90 shadow-sm flex items-center justify-center text-[#5e6978] hover:text-rose-600 transition-colors"
              title="Cancel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Auto Transcribe Toggle (From Image 1) */}
          <div className="flex items-center gap-2.5 pt-1 text-xs text-[#5e6978]">
            <span className="font-semibold text-[11px]">Auto Transcribe</span>
            <button
              type="button"
              onClick={() => setAutoTranscribe(!autoTranscribe)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                autoTranscribe ? 'bg-[#7c3aed]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  autoTranscribe ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
