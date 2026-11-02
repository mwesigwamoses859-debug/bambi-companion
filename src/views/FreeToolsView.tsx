import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QUIZ_QUESTIONS, QUIZ_OPTIONS, QUIZ_OUTCOMES } from '../data/initialData';
import { 
  Sparkles, 
  Calculator, 
  Lightbulb, 
  Bookmark, 
  Check, 
  ArrowRight, 
  RotateCcw 
} from 'lucide-react';

export const FreeToolsView: React.FC = () => {
  const { saveActionCard, setCurrentSpace } = useApp();

  const [activeTool, setActiveTool] = useState<'quiz' | 'kolakit' | 'idea'>('quiz');

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<number[]>([-1, -1, -1, -1, -1, -1]);
  const [quizResult, setQuizResult] = useState<{ title: string; summary: string; actions: string[] } | null>(null);
  const [quizSaved, setQuizSaved] = useState(false);

  // KolaKit State
  const [costUGX, setCostUGX] = useState<number>(15000);
  const [marginPercent, setMarginPercent] = useState<number>(25);

  // Idea Clarifier State
  const [ideaBrand, setIdeaBrand] = useState('My Neighborhood Bakery');
  const [ideaAudience, setIdeaAudience] = useState('Busy families in Kampala');
  const [ideaProblem, setIdeaProblem] = useState('Finding fresh healthy breakfast before school');
  const [ideaOffer, setIdeaOffer] = useState('Warm fresh rolls ready for early pickup');
  const [ideaGenerated, setIdeaGenerated] = useState(false);
  const [ideaSaved, setIdeaSaved] = useState(false);

  // KolaKit calculation (from original Bambi source: Ht(e,t))
  const calculatedPrice = marginPercent < 99 
    ? Math.ceil(costUGX / (1 - marginPercent / 100))
    : costUGX * 2;
  const calculatedContribution = calculatedPrice - costUGX;

  // Handle Quiz selection
  const handleSelectOption = (qIdx: number, optIdx: number) => {
    const next = [...quizAnswers];
    next[qIdx] = optIdx;
    setQuizAnswers(next);

    // If all answered
    if (next.every(ans => ans !== -1)) {
      // Tally choices (from original Bambi Vt(e) function)
      const counts = [0, 0, 0, 0];
      next.forEach(val => counts[val]++);
      const maxCount = Math.max(...counts);
      const topIndices = counts.flatMap((c, i) => c === maxCount ? [i] : []);
      
      if (topIndices.length > 1) {
        setQuizResult({
          title: 'You have more than one way forward',
          summary: 'Your answers today draw on several approaches. You do not need a single personality label: the useful question is which approach will help with the situation in front of you.',
          actions: [
            'Choose one situation you want to understand this week.',
            'Try one small action, then make time to reflect on what changed.',
            'Ask for a different perspective when your usual approach is not helping.'
          ]
        });
      } else {
        setQuizResult(QUIZ_OUTCOMES[topIndices[0]]);
      }
      setQuizSaved(false);
    }
  };

  const handleResetQuiz = () => {
    setQuizAnswers([-1, -1, -1, -1, -1, -1]);
    setQuizResult(null);
    setQuizSaved(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#dcd1ff] text-[#152225]">
          <Sparkles className="w-3.5 h-3.5 text-[#2255ee]" />
          Free Discovery Tools
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#152225]">
          Tools For Clarity & Growth
        </h1>
        <p className="text-sm text-[#5e6978] max-w-lg mx-auto">
          Lightweight, reflective micro-tools to help you know yourself, clarify your ideas, and understand your numbers.
        </p>
      </div>

      {/* Tool Selector Tabs */}
      <div className="flex items-center justify-center gap-2 border-b border-[#e2e6ef] pb-3 text-xs font-bold">
        <button
          onClick={() => setActiveTool('quiz')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
            activeTool === 'quiz'
              ? 'bg-[#2255ee] text-white shadow-sm'
              : 'text-[#5e6978] hover:text-[#152225] bg-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Know Myself (6 Questions)</span>
        </button>

        <button
          onClick={() => setActiveTool('kolakit')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
            activeTool === 'kolakit'
              ? 'bg-[#2255ee] text-white shadow-sm'
              : 'text-[#5e6978] hover:text-[#152225] bg-white'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>KolaKit Price Calculator</span>
        </button>

        <button
          onClick={() => setActiveTool('idea')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
            activeTool === 'idea'
              ? 'bg-[#2255ee] text-white shadow-sm'
              : 'text-[#5e6978] hover:text-[#152225] bg-white'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>Grow My Idea</span>
        </button>
      </div>

      {/* TOOL 1: QUIZ */}
      {activeTool === 'quiz' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e6ef] shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#152225]">Know Myself in 6 Questions</h2>
              <p className="text-xs text-[#5e6978]">Select the option that feels most natural to you today.</p>
            </div>
            {quizResult && (
              <button
                onClick={handleResetQuiz}
                className="flex items-center gap-1 text-xs text-[#5e6978] hover:text-[#152225] font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>
            )}
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {QUIZ_QUESTIONS.map((q, qIdx) => (
              <div key={qIdx} className="space-y-2.5">
                <p className="text-xs sm:text-sm font-bold text-[#152225]">
                  {qIdx + 1}. {q}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {QUIZ_OPTIONS[qIdx].map((opt, optIdx) => {
                    const isSelected = quizAnswers[qIdx] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(qIdx, optIdx)}
                        className={`text-left p-3 rounded-2xl border text-xs transition-all ${
                          isSelected
                            ? 'border-[#2255ee] bg-[#2255ee]/10 text-[#2255ee] font-bold shadow-sm'
                            : 'border-[#e2e6ef] bg-[#f8f9fd] text-[#5e6978] hover:border-gray-300 hover:text-[#152225]'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Outcome Card */}
          {quizResult && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-50 via-white to-sky-50 border border-purple-200 space-y-3 animate-fade-in">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                Your Reflection Outcome
              </span>
              <h3 className="text-lg font-bold text-[#152225]">{quizResult.title}</h3>
              <p className="text-xs sm:text-sm text-[#5e6978] leading-relaxed">
                {quizResult.summary}
              </p>

              <div className="space-y-1 pt-2">
                <p className="text-xs font-bold text-[#152225]">Three small steps for you:</p>
                {quizResult.actions.map((act, i) => (
                  <p key={i} className="text-xs text-[#5e6978] flex items-start gap-1.5">
                    <span className="text-[#2255ee] font-bold">›</span>
                    <span>{act}</span>
                  </p>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    saveActionCard({
                      kind: 'discover',
                      title: quizResult.title,
                      summary: quizResult.summary,
                      actions: quizResult.actions
                    });
                    setQuizSaved(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2255ee] text-white text-xs font-bold hover:bg-[#1a44c2] shadow-sm"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{quizSaved ? 'Saved to My Space!' : 'Save this Action Card'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TOOL 2: KOLAKIT CALCULATOR */}
      {activeTool === 'kolakit' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e6ef] shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Pricing Clarity
            </span>
            <h2 className="text-xl font-bold text-[#152225] mt-1">KolaKit: Know Your Numbers</h2>
            <p className="text-xs text-[#5e6978]">
              A clearer starting price for your products, freelance work, or jobs in Ugandan Shillings (UGX).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#152225] mb-1">
                Full Product or Job Cost (UGX):
              </label>
              <input
                type="number"
                value={costUGX}
                onChange={e => setCostUGX(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full p-2.5 rounded-xl border border-[#e2e6ef] text-sm font-semibold bg-[#f8f9fd]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#152225] mb-1">
                Target Margin (%):
              </label>
              <input
                type="number"
                min="0"
                max="95"
                value={marginPercent}
                onChange={e => setMarginPercent(Math.min(95, Math.max(0, parseFloat(e.target.value) || 0)))}
                className="w-full p-2.5 rounded-xl border border-[#e2e6ef] text-sm font-semibold bg-[#f8f9fd]"
              />
            </div>
          </div>

          {/* Results Strip */}
          <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div>
              <span className="text-xs text-emerald-800 font-semibold block">Selling Price:</span>
              <span className="text-2xl font-black text-emerald-950">
                UGX {calculatedPrice.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-xs text-emerald-800 font-semibold block">Gross Contribution:</span>
              <span className="text-2xl font-black text-emerald-950">
                UGX {calculatedContribution.toLocaleString()}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-[#5e6978]">
            * Margin is the percentage of the selling price left after entered direct costs. Output taxes and delivery discounts are not included.
          </p>
        </div>
      )}

      {/* TOOL 3: GROW MY IDEA */}
      {activeTool === 'idea' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e6ef] shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              Idea Builder
            </span>
            <h2 className="text-xl font-bold text-[#152225] mt-1">Give Your Idea a Clearer Story</h2>
            <p className="text-xs text-[#5e6978]">
              Turn a vague business dream into an audience, problem, and concrete offer.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#152225] mb-1">
                Idea or Business Name:
              </label>
              <input
                type="text"
                value={ideaBrand}
                onChange={e => setIdeaBrand(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#e2e6ef] text-xs font-semibold bg-[#f8f9fd]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#152225] mb-1">
                Who do you want to serve? (Audience):
              </label>
              <input
                type="text"
                value={ideaAudience}
                onChange={e => setIdeaAudience(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#e2e6ef] text-xs font-semibold bg-[#f8f9fd]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#152225] mb-1">
                What do they need help with? (Problem):
              </label>
              <input
                type="text"
                value={ideaProblem}
                onChange={e => setIdeaProblem(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#e2e6ef] text-xs font-semibold bg-[#f8f9fd]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#152225] mb-1">
                What could you offer? (Offer):
              </label>
              <input
                type="text"
                value={ideaOffer}
                onChange={e => setIdeaOffer(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#e2e6ef] text-xs font-semibold bg-[#f8f9fd]"
              />
            </div>

            <button
              onClick={() => setIdeaGenerated(true)}
              className="px-5 py-2.5 rounded-xl bg-[#2255ee] text-white text-xs font-bold hover:bg-[#1a44c2] shadow-sm"
            >
              Assemble My Story
            </button>
          </div>

          {ideaGenerated && (
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3 animate-fade-in">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                Your 1-Paragraph Story
              </span>
              <p className="text-sm font-semibold text-[#152225] leading-relaxed">
                "{ideaBrand} helps {ideaAudience} solve {ideaProblem} by providing {ideaOffer}."
              </p>

              <div className="pt-2">
                <button
                  onClick={() => {
                    saveActionCard({
                      kind: 'business',
                      title: `Idea: ${ideaBrand}`,
                      summary: `${ideaBrand} helps ${ideaAudience} solve ${ideaProblem} through ${ideaOffer}.`,
                      actions: [
                        'Talk to 3 people in your audience and ask how they currently solve this.',
                        'Make one small prototype sample.',
                        'Set a simple price using KolaKit.'
                      ]
                    });
                    setIdeaSaved(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-700 text-white text-xs font-bold hover:bg-amber-800"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{ideaSaved ? 'Saved to My Space!' : 'Save this Action Card'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
