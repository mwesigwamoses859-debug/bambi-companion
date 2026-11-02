import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SOUNDSCAPES } from '../data/initialData';
import { SoundscapeType } from '../types';
import { 
  Play, 
  Square, 
  Volume2, 
  VolumeX, 
  CloudRain, 
  Wind, 
  Waves, 
  Bell, 
  Moon, 
  Mic, 
  MicOff, 
  RotateCcw, 
  Check, 
  Sparkles,
  Headphones
} from 'lucide-react';

export const ListenSpaceView: React.FC = () => {
  const { 
    isAudioPlaying, 
    activeTrackId, 
    audioVolume, 
    playTrack, 
    stopAudio, 
    setAudioVolume 
  } = useApp();

  // Breathing guide state
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timerSeconds, setTimerSeconds] = useState(90);

  // Simulated Voice Note Rehearsal
  const [isRecording, setIsRecording] = useState(false);
  const [recordSec, setRecordSec] = useState(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [rehearsalSaved, setRehearsalSaved] = useState(false);

  // Soundscape Icon lookup
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'CloudRain': return <CloudRain className="w-5 h-5" />;
      case 'Wind': return <Wind className="w-5 h-5" />;
      case 'Waves': return <Waves className="w-5 h-5" />;
      case 'Bell': return <Bell className="w-5 h-5" />;
      case 'Moon': return <Moon className="w-5 h-5" />;
      default: return <Headphones className="w-5 h-5" />;
    }
  };

  // Breathing Phase Timer
  useEffect(() => {
    if (!breathingActive) return;

    let timeout: NodeJS.Timeout;
    if (breathPhase === 'inhale') {
      timeout = setTimeout(() => setBreathPhase('hold'), 4000);
    } else if (breathPhase === 'hold') {
      timeout = setTimeout(() => setBreathPhase('exhale'), 4000);
    } else {
      timeout = setTimeout(() => setBreathPhase('inhale'), 6000);
    }

    return () => clearTimeout(timeout);
  }, [breathingActive, breathPhase]);

  // 90-second countdown
  useEffect(() => {
    if (!breathingActive || timerSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [breathingActive, timerSeconds]);

  // Voice note timer simulation
  useEffect(() => {
    if (!isRecording) return;
    const interval = setInterval(() => {
      setRecordSec(prev => {
        if (prev >= 12) {
          setIsRecording(false);
          setRecordedAudioUrl('simulated-voice-note');
          return 12;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordSec(0);
    setRecordedAudioUrl(null);
    setRehearsalSaved(false);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordedAudioUrl('simulated-voice-note');
  };

  return (
    <div className="space-y-10 pb-16 animate-fade-in max-w-5xl mx-auto">
      
      {/* Space Header */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
          <Headphones className="w-3.5 h-3.5" />
          The Listening Sanctuary
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#152225]">
          A Little Stillness For Your Ears
        </h1>
        <p className="text-sm text-[#5e6978] max-w-xl mx-auto">
          Immerse yourself in gentle soundscapes, sync your breath to a soothing rhythm, or practice hearing your own voice out loud in safety.
        </p>
      </div>

      {/* 1. Ambient Soundscape Synthesizer */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e6ef] shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#152225] flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-[#2255ee]" />
              Ambient Soundscapes
            </h2>
            <p className="text-xs text-[#5e6978]">
              Live procedural acoustic synthesis. Zero data usage, runs 100% offline.
            </p>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 bg-[#f8f9fd] px-3.5 py-1.5 rounded-2xl border border-[#e2e6ef] w-full sm:w-auto">
            {audioVolume === 0 ? (
              <VolumeX className="w-4 h-4 text-[#5e6978]" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#2255ee]" />
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={audioVolume}
              onChange={e => setAudioVolume(parseFloat(e.target.value))}
              className="w-28 accent-[#2255ee] cursor-pointer"
            />
            <span className="text-xs font-semibold text-[#5e6978] w-8">
              {Math.round(audioVolume * 100)}%
            </span>
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SOUNDSCAPES.map(track => {
            const isThisPlaying = isAudioPlaying && activeTrackId === track.id;
            return (
              <div
                key={track.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isThisPlaying
                    ? 'border-[#2255ee] bg-[#2255ee]/5 shadow-sm ring-1 ring-[#2255ee]'
                    : 'border-[#e2e6ef] bg-[#f8f9fd] hover:border-gray-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-2 rounded-xl bg-white text-[#2255ee] border border-[#e2e6ef]">
                      {getIcon(track.iconName)}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#5e6978] bg-white px-2 py-0.5 rounded border border-[#e2e6ef]">
                      {track.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-[#152225]">{track.title}</h3>
                  <p className="text-xs text-[#5e6978] mt-1 leading-relaxed">
                    {track.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#e2e6ef]/60 flex items-center justify-between">
                  {isThisPlaying ? (
                    <button
                      onClick={stopAudio}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold transition-colors"
                    >
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>Stop</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => playTrack(track.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2255ee] text-white hover:bg-[#1a44c2] text-xs font-bold transition-colors shadow-sm"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Listen</span>
                    </button>
                  )}

                  {isThisPlaying && (
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-[#2255ee]">
                      <span className="w-2 h-2 rounded-full bg-[#2255ee] animate-ping" />
                      <span>Playing</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. 90-Second Guided Breathing Circle */}
      <section className="bg-gradient-to-b from-[#f8f9fd] to-white rounded-3xl p-6 sm:p-10 border border-[#e2e6ef] text-center space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
            Mindful Pause
          </span>
          <h2 className="text-2xl font-black text-[#152225] mt-2">
            90-Second Breathing Pacer
          </h2>
          <p className="text-xs sm:text-sm text-[#5e6978] max-w-md mx-auto mt-1">
            Box breathing to calm your nervous system. Inhale 4s, hold 4s, exhale 6s.
          </p>
        </div>

        {/* The Animated Breathing Sphere */}
        <div className="flex flex-col items-center justify-center py-6">
          <div className="relative flex items-center justify-center w-56 h-56">
            
            {/* Outer Pulsing Rings */}
            <div 
              className={`absolute inset-0 rounded-full bg-teal-200/40 transition-all duration-[4000ms] ease-in-out ${
                breathingActive && breathPhase === 'inhale' ? 'scale-110 opacity-70' :
                breathingActive && breathPhase === 'hold' ? 'scale-110 opacity-90' :
                'scale-90 opacity-30'
              }`} 
            />

            {/* Inner Core */}
            <div 
              className={`w-40 h-40 rounded-full bg-gradient-to-tr from-teal-500 to-[#2255ee] text-white flex flex-col items-center justify-center shadow-xl transition-all duration-[4000ms] ease-in-out ${
                breathingActive && breathPhase === 'inhale' ? 'scale-105 shadow-teal-500/30' :
                breathingActive && breathPhase === 'hold' ? 'scale-105 shadow-teal-500/50' :
                'scale-90 shadow-none'
              }`}
            >
              <span className="text-xs uppercase font-black tracking-widest text-teal-100">
                {breathingActive ? breathPhase : 'Ready'}
              </span>
              <p className="text-base font-bold mt-0.5">
                {breathingActive 
                  ? (breathPhase === 'inhale' ? 'Breathe In' : breathPhase === 'hold' ? 'Hold Space' : 'Slow Exhale') 
                  : 'Start Pause'}
              </p>
              {breathingActive && (
                <span className="text-xs text-teal-100/90 mt-1 font-mono">
                  {Math.floor(timerSeconds / 60)}:{String(timerSeconds % 60).padStart(2, '0')}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Breathing Controls */}
        <div className="flex items-center justify-center gap-3">
          {!breathingActive ? (
            <button
              onClick={() => {
                setBreathingActive(true);
                setBreathPhase('inhale');
                setTimerSeconds(90);
                if (!isAudioPlaying) playTrack('waves');
              }}
              className="px-6 py-2.5 rounded-2xl bg-[#007e75] text-white font-bold text-sm hover:bg-[#00655e] transition-colors shadow-md flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Begin 90-Second Pause</span>
            </button>
          ) : (
            <button
              onClick={() => setBreathingActive(false)}
              className="px-6 py-2.5 rounded-2xl bg-gray-200 text-[#152225] font-bold text-sm hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>Pause / Reset</span>
            </button>
          )}
        </div>
      </section>

      {/* 3. Voice Rehearsal & Audio Reflection */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e6ef]">
        <div className="max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2255ee]">
            Solo Rehearsal
          </span>
          <h2 className="text-xl font-bold text-[#152225] mt-1">
            Private Voice Note Rehearsal
          </h2>
          <p className="text-xs text-[#5e6978] mt-1">
            Practice speaking your thoughts out loud before talking with a friend or peer listener. Stored only in your local browser space.
          </p>
        </div>

        <div className="mt-6 p-5 rounded-2xl bg-[#f8f9fd] border border-[#e2e6ef] max-w-lg space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#152225]">
              Max 12 seconds rehearsal note
            </span>
            <span className="text-xs font-mono font-bold text-[#2255ee]">
              00:{String(recordSec).padStart(2, '0')} / 00:12
            </span>
          </div>

          {/* Waveform graphic */}
          <div className="h-10 bg-white rounded-xl border border-[#e2e6ef] flex items-center justify-center px-4 gap-1 overflow-hidden">
            {[4, 8, 14, 6, 12, 18, 10, 16, 20, 12, 8, 15, 22, 11, 7, 14, 9, 5].map((h, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-200 ${
                  isRecording 
                    ? 'bg-rose-500 animate-pulse' 
                    : recordedAudioUrl 
                    ? 'bg-[#2255ee]' 
                    : 'bg-gray-200'
                }`}
                style={{ height: isRecording ? `${Math.min(32, h * (recordSec % 3 + 1))}px` : `${h}px` }}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 pt-1">
            {!isRecording ? (
              <button
                onClick={handleStartRecording}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors shadow-sm"
              >
                <Mic className="w-4 h-4" />
                <span>{recordedAudioUrl ? 'Record Again' : 'Record Voice Note'}</span>
              </button>
            ) : (
              <button
                onClick={handleStopRecording}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-black transition-colors"
              >
                <MicOff className="w-4 h-4 text-rose-400" />
                <span>Stop Recording</span>
              </button>
            )}

            {recordedAudioUrl && !isRecording && (
              <button
                onClick={() => setRehearsalSaved(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>{rehearsalSaved ? 'Saved locally!' : 'Keep this note'}</span>
              </button>
            )}
          </div>

          {rehearsalSaved && (
            <p className="text-xs text-emerald-700 font-medium">
              ✓ Local voice rehearsal saved. No audio sent over internet.
            </p>
          )}
        </div>
      </section>

    </div>
  );
};
