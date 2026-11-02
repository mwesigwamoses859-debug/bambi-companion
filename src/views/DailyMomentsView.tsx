import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DAILY_AFFIRMATIONS } from '../data/initialData';
import { 
  Sun, 
  Sparkles, 
  Heart, 
  Shuffle, 
  CheckCircle2, 
  ArrowRight, 
  Bookmark, 
  Clock, 
  Send 
} from 'lucide-react';

export const DailyMomentsView: React.FC = () => {
  const { user, saveActionCard, setCurrentSpace } = useApp();

  // Affirmation state
  const [affirmationIdx, setAffirmationIdx] = useState(0);
  const currentAffirmation = DAILY_AFFIRMATIONS[affirmationIdx % DAILY_AFFIRMATIONS.length];

  // Daily check-in form state
  const [checkInEnergy, setCheckInEnergy] = useState<'low' | 'steady' | 'high'>('steady');
  const [checkInFeel, setCheckInFeel] = useState<'heavy' | 'seeking' | 'calm' | 'grateful'>('calm');
  const [checkInNeed, setCheckInNeed] = useState<string>('A peaceful moment of quiet');
  const [checkInResult, setCheckInResult] = useState<string | null>(null);

  // Tiny next move generator
  const [stuckTask, setStuckTask] = useState('');
  const [tinyStep, setTinyStep] = useState<string | null>(null);
  const [savedStep, setSavedStep] = useState(false);

  const handleNextAffirmation = () => {
    setAffirmationIdx(prev => (prev + 1) % DAILY_AFFIRMATIONS.length);
  };

  const handleCompleteCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    let advice = '';
    if (checkInFeel === 'heavy') {
      advice = `It is completely okay to feel weary today, ${user.alias}. When your energy is ${checkInEnergy}, your mind is asking you to protect your space. Give yourself permission to do only what is strictly necessary today. Everything else can wait.`;
    } else if (checkInFeel === 'seeking') {
      advice = `When you're searching for direction, clarity rarely comes from frantic thinking. It comes from quiet room. Take 5 minutes away from screens, drink a glass of water, and trust that the next right step will reveal itself.`;
    } else if (checkInFeel === 'grateful') {
      advice = `What a beautiful state to be in! Soak in this calm, ${user.alias}. Let this quiet contentment fill your cup so you have patience and gentleness for whatever comes next.`;
    } else {
      advice = `You are holding steady, and that is a real strength. Protect this balance today by setting one small boundary around your rest this evening.`;
    }
    setCheckInResult(advice);
  };

  const handleGenerateTinyStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stuckTask.trim()) return;

    const steps = [
      `Spend just 10 minutes writing out the absolute simplest version of "${stuckTask.trim()}". When the timer rings, stop completely.`,
      `Identify the single person or resource who can answer one question about "${stuckTask.trim()}", and send them a short two-line message.`,
      `Do not attempt to complete "${stuckTask.trim()}" today. Instead, just gather the papers, tools, or open the document so it is ready for tomorrow morning.`
    ];

    const chosen = steps[Math.floor(Math.random() * steps.length)];
    setTinyStep(chosen);
    setSavedStep(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
          <Sun className="w-3.5 h-3.5" />
          Daily Encouragement
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#152225]">
          Daily Moments of Grace
        </h1>
        <p className="text-sm text-[#5e6978] max-w-lg mx-auto">
          One mindful thought. One honest check-in. One tiny next step.
        </p>
      </div>

      {/* 1. Daily Affirmation Card */}
      <section className="bg-gradient-to-tr from-rose-50 via-white to-amber-50 rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <button
            onClick={handleNextAffirmation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs font-bold text-[#152225] border border-[#e2e6ef] shadow-sm transition-all"
            title="Read another affirmation"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#2255ee]" />
            <span>Next word</span>
          </button>
        </div>

        <div className="max-w-xl mx-auto text-center space-y-4 pt-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-rose-600 bg-rose-100/70 px-2.5 py-0.5 rounded-full">
            Today’s Whisper
          </span>

          <blockquote className="text-xl sm:text-2xl font-black text-[#152225] leading-relaxed italic">
            "{currentAffirmation.quote}"
          </blockquote>

          <div className="pt-2">
            <p className="text-xs font-bold text-[#5e6978] uppercase tracking-wider">
              Reflection for today:
            </p>
            <p className="text-sm font-medium text-[#152225] mt-0.5">
              {currentAffirmation.prompt}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Daily Check-in: "How am I, really?" */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e6ef] shadow-sm space-y-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2255ee]">
            Quick Check-in
          </span>
          <h2 className="text-xl font-bold text-[#152225] mt-1">
            How am I, really?
          </h2>
          <p className="text-xs text-[#5e6978]">
            An honest 60-second check-in to align with your current capacity.
          </p>
        </div>

        <form onSubmit={handleCompleteCheckIn} className="space-y-4">
          {/* Energy level */}
          <div>
            <label className="block text-xs font-bold text-[#152225] mb-2 uppercase tracking-wider">
              My current battery:
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'low', label: 'Low battery (need rest)', emoji: '🪫' },
                { id: 'steady', label: 'Steady / Holding on', emoji: '🔋' },
                { id: 'high', label: 'Energized & ready', emoji: '⚡' },
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCheckInEnergy(item.id as 'low' | 'steady' | 'high')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    checkInEnergy === item.id
                      ? 'border-[#2255ee] bg-[#2255ee]/5 font-bold shadow-sm'
                      : 'border-[#e2e6ef] bg-[#f8f9fd] hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg block mb-1">{item.emoji}</span>
                  <span className="text-xs text-[#152225]">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Emotional Weather */}
          <div>
            <label className="block text-xs font-bold text-[#152225] mb-2 uppercase tracking-wider">
              Dominant feeling right now:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'heavy', label: 'Heavy / Overwhelmed', emoji: '🌧️' },
                { id: 'seeking', label: 'Seeking clarity', emoji: '🧭' },
                { id: 'calm', label: 'Quiet / Grounded', emoji: '🌿' },
                { id: 'grateful', label: 'Grateful & warm', emoji: '☀️' },
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCheckInFeel(item.id as 'heavy' | 'seeking' | 'calm' | 'grateful')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    checkInFeel === item.id
                      ? 'border-[#2255ee] bg-[#2255ee]/5 font-bold shadow-sm'
                      : 'border-[#e2e6ef] bg-[#f8f9fd] hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg block mb-1">{item.emoji}</span>
                  <span className="text-xs text-[#152225]">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#2255ee] text-white text-xs font-bold hover:bg-[#1a44c2] shadow-sm transition-colors"
          >
            Reflect on my check-in
          </button>
        </form>

        {checkInResult && (
          <div className="mt-4 p-5 rounded-2xl bg-[#e6fb8b]/40 border border-[#d2ea6d] space-y-2 animate-fade-in">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#152225]">
              <Sparkles className="w-4 h-4 text-[#2255ee]" />
              <span>A gentle word for you:</span>
            </div>
            <p className="text-xs sm:text-sm text-[#152225] leading-relaxed">
              {checkInResult}
            </p>
          </div>
        )}
      </section>

      {/* 3. My Tiny Next Move */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e6ef] shadow-sm space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
            Micro-Action
          </span>
          <h2 className="text-xl font-bold text-[#152225] mt-1">
            My Tiny Next Move
          </h2>
          <p className="text-xs text-[#5e6978]">
            Turn a daunting question or someday dream into one practical 15-minute action.
          </p>
        </div>

        <form onSubmit={handleGenerateTinyStep} className="flex gap-2">
          <input
            type="text"
            required
            placeholder="e.g. Starting my bakery idea, talking to my manager, studying for exams..."
            value={stuckTask}
            onChange={e => setStuckTask(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#e2e6ef] text-xs font-medium bg-[#f8f9fd] focus:ring-2 focus:ring-[#2255ee] focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-[#152225] text-white text-xs font-bold hover:bg-black transition-colors shrink-0"
          >
            Find Tiny Step
          </button>
        </form>

        {tinyStep && (
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 space-y-3 animate-fade-in">
            <p className="text-xs font-bold text-sky-900">Your single micro-step:</p>
            <p className="text-sm text-[#152225] font-semibold leading-relaxed">
              {tinyStep}
            </p>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-[#5e6978] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Under 15 minutes
              </span>

              <button
                onClick={() => {
                  saveActionCard({
                    kind: 'ground',
                    title: `Micro-step: ${stuckTask.slice(0, 30)}`,
                    summary: `One manageable step toward ${stuckTask}.`,
                    actions: [tinyStep]
                  });
                  setSavedStep(true);
                }}
                className="flex items-center gap-1 text-xs font-bold text-[#2255ee] hover:underline"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{savedStep ? 'Saved to My Space!' : 'Save this action card'}</span>
              </button>
            </div>
          </div>
        )}
      </section>

    </div>
  );
};
