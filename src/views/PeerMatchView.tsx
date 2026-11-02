import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TOPICS, LANGUAGES, AVATARS } from '../data/initialData';
import { ListenerProfile, SessionRatings } from '../types';
import { 
  Users, 
  Search, 
  MessageCircle, 
  Mic, 
  Star, 
  Clock, 
  ShieldCheck, 
  Check, 
  X, 
  Send, 
  AlertTriangle,
  Heart
} from 'lucide-react';

export const PeerMatchView: React.FC = () => {
  const { 
    user, 
    listeners, 
    activeSession, 
    startSession, 
    endActiveSession, 
    sendSessionMessage 
  } = useApp();

  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');

  // Request modal state
  const [targetListener, setTargetListener] = useState<ListenerProfile | null>(null);
  const [sessionMinutes, setSessionMinutes] = useState<5 | 15 | 30>(15);
  const [sessionIntent, setSessionIntent] = useState<'vent' | 'advice' | 'listen'>('listen');
  const [sessionChannel, setSessionChannel] = useState<'chat' | 'voice'>('chat');

  // Active chat state
  const [chatInput, setChatInput] = useState('');

  // Rating modal state
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratings, setRatings] = useState<SessionRatings>({
    supportScore: 5,
    listeningScore: 5,
    languageScore: 5,
    comfortScore: 5,
    attentionScore: 5,
    timeScore: 5,
    shareNoteWithListener: true
  });
  const [feedbackNote, setFeedbackNote] = useState('');

  // Filter listeners
  const filteredListeners = listeners.filter(lis => {
    if (selectedTopic !== 'all' && !lis.topics.some(t => t.toLowerCase().includes(selectedTopic.toLowerCase()))) {
      return false;
    }
    if (selectedLanguage !== 'all' && !lis.languages.includes(selectedLanguage)) {
      return false;
    }
    return true;
  });

  const handleStartRequest = () => {
    if (!targetListener) return;
    startSession({
      callerAlias: user.alias,
      callerAvatar: user.avatarId,
      listenerId: targetListener.id,
      listenerName: targetListener.alias,
      topic: selectedTopic === 'all' ? 'General Listening' : selectedTopic,
      intent: sessionIntent,
      minutes: sessionMinutes,
      channel: sessionChannel
    });
    setTargetListener(null);
  };

  const handleFinishSession = () => {
    setShowRatingModal(true);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    endActiveSession({
      ...ratings,
      feedbackNote: feedbackNote.trim() || undefined
    });
    setShowRatingModal(false);
  };

  // ACTIVE SESSION VIEW
  if (activeSession) {
    return (
      <div className="max-w-3xl mx-auto space-y-4 pb-20 animate-fade-in">
        {/* Active Session Header */}
        <div className="bg-white rounded-3xl p-5 border border-[#e2e6ef] shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-lg">
              🌱
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-sm text-[#152225]">{activeSession.listenerName}</h2>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <p className="text-[11px] text-[#5e6978]">
                {activeSession.topic} · {activeSession.minutes} min agreed time
              </p>
            </div>
          </div>

          <button
            onClick={handleFinishSession}
            className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-colors"
          >
            End & Review
          </button>
        </div>

        {/* Message Stream */}
        <div className="bg-white rounded-3xl p-5 border border-[#e2e6ef] shadow-sm min-h-[420px] flex flex-col justify-between">
          <div className="space-y-4 overflow-y-auto max-h-[460px]">
            {activeSession.messages.map(msg => {
              const isCaller = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isCaller ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs shrink-0">
                    {isCaller ? '👤' : '🎧'}
                  </div>
                  <div
                    className={`max-w-[78%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isCaller
                        ? 'bg-[#2255ee] text-white rounded-tr-none'
                        : 'bg-[#f8f9fd] text-[#152225] border border-[#e2e6ef] rounded-tl-none'
                    }`}
                  >
                    {msg.isVoiceNote ? (
                      <div className="flex items-center gap-2">
                        <Mic className="w-4 h-4 text-emerald-400" />
                        <span>Voice Note ({msg.voiceDurationSec || 8}s)</span>
                      </div>
                    ) : (
                      msg.text
                    )}
                    <span className="block text-[9px] mt-1 opacity-70">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input form */}
          <form
            onSubmit={e => {
              e.preventDefault();
              if (!chatInput.trim()) return;
              sendSessionMessage(chatInput.trim());
              setChatInput('');
            }}
            className="mt-4 pt-3 border-t border-[#e2e6ef] flex items-center gap-2"
          >
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-[#e2e6ef] bg-[#f8f9fd] text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2255ee]"
            />
            <button
              type="button"
              onClick={() => sendSessionMessage("Voice note sent privately.", true, 10)}
              className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#5e6978] transition-colors"
              title="Simulate Voice Note"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-[#2255ee] hover:bg-[#1a44c2] text-white font-bold transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* REVIEW MODAL */}
        {showRatingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#e2e6ef] max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-[#152225]">Review Your Conversation</h2>
              <p className="text-xs text-[#5e6978] mt-1">
                Your feedback directly shapes test points and quality in this pilot. Ratings are neutral-first and private.
              </p>

              <form onSubmit={handleSubmitReview} className="space-y-4 mt-4">
                {[
                  { key: 'supportScore' as const, label: '1. Got the support I asked for' },
                  { key: 'listeningScore' as const, label: '2. Listening and understanding' },
                  { key: 'languageScore' as const, label: '3. Respectful, clear language' },
                  { key: 'comfortScore' as const, label: '4. Comfort and ease' },
                  { key: 'attentionScore' as const, label: '5. Personal, attentive and human' },
                  { key: 'timeScore' as const, label: '6. Agreed time was honoured' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#152225]">{item.label}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRatings(prev => ({ ...prev, [item.key]: star }))}
                          className={`p-1 rounded ${
                            ratings[item.key] >= star
                              ? 'text-amber-500'
                              : 'text-gray-300'
                          }`}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <textarea
                  rows={2}
                  placeholder="Optional written note for the Listener..."
                  value={feedbackNote}
                  onChange={e => setFeedbackNote(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#e2e6ef] text-xs focus:ring-2 focus:ring-[#2255ee] focus:outline-none"
                />

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#2255ee] text-white text-xs font-bold hover:bg-[#1a44c2]"
                  >
                    Submit Review & Complete
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // DIRECTORY VIEW
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#e6fb8b] text-[#152225] border border-[#d2ea6d]">
          <Users className="w-3.5 h-3.5" />
          Ugandan Peer Listening Pilot
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#152225]">
          Find Someone to Listen
        </h1>
        <p className="text-sm text-[#5e6978] max-w-xl mx-auto">
          Connect with vetted community listeners who have lived, learned, or helped someone through similar moments. Free trial access.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#e2e6ef] shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Topic selector */}
        <div className="w-full md:w-1/2">
          <label className="block text-[11px] font-bold text-[#152225] uppercase tracking-wider mb-1">
            Topic Focus:
          </label>
          <select
            value={selectedTopic}
            onChange={e => setSelectedTopic(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-[#e2e6ef] text-xs font-medium bg-[#f8f9fd] focus:ring-2 focus:ring-[#2255ee] focus:outline-none"
          >
            <option value="all">All Topics</option>
            {TOPICS.map(t => (
              <option key={t.id} value={t.label}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* Language selector */}
        <div className="w-full md:w-1/2">
          <label className="block text-[11px] font-bold text-[#152225] uppercase tracking-wider mb-1">
            Language:
          </label>
          <select
            value={selectedLanguage}
            onChange={e => setSelectedLanguage(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-[#e2e6ef] text-xs font-medium bg-[#f8f9fd] focus:ring-2 focus:ring-[#2255ee] focus:outline-none"
          >
            <option value="all">All Languages</option>
            {LANGUAGES.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Listeners Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredListeners.map(lis => {
          const avatar = AVATARS.find(a => a.id === lis.avatarId) || AVATARS[0];
          return (
            <div
              key={lis.id}
              className="bg-white rounded-3xl p-6 border border-[#e2e6ef] hover:border-[#2255ee] transition-all shadow-sm flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border ${avatar.bg}`}>
                      {avatar.emoji}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#152225]">{lis.alias}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1 text-xs text-amber-600 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          {lis.ratingScore.toFixed(1)}
                        </span>
                        <span className="text-[11px] text-[#5e6978]">
                          ({lis.completedSessions} sessions)
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    lis.isAvailable 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {lis.isAvailable ? 'Available Now' : 'Offline'}
                  </span>
                </div>

                <p className="text-xs text-[#5e6978] mt-3 leading-relaxed">
                  {lis.bio}
                </p>

                {/* Topics & Languages badges */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {lis.languages.map(lang => (
                    <span key={lang} className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-100">
                      🗣️ {lang}
                    </span>
                  ))}
                  {lis.topics.map(t => (
                    <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#f8f9fd] text-[#5e6978] border border-[#e2e6ef]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#e2e6ef] flex items-center justify-between">
                <span className="text-[11px] text-[#5e6978]">
                  Experience: <strong>{lis.experienceLevel}</strong>
                </span>

                <button
                  onClick={() => setTargetListener(lis)}
                  className="px-4 py-2 rounded-xl bg-[#2255ee] hover:bg-[#1a44c2] text-white text-xs font-bold transition-colors shadow-sm"
                >
                  Ask to connect
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* REQUEST MODAL */}
      {targetListener && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#e2e6ef] space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#152225]">
                Connect with {targetListener.alias}
              </h2>
              <button onClick={() => setTargetListener(null)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-[#e6fb8b]/30 rounded-2xl border border-[#d2ea6d] text-xs text-[#152225]">
              <p className="font-bold">✨ Free Trial Day Pass Active</p>
              <p className="text-[11px] text-[#5e6978] mt-0.5">
                Future day pass: UGX 500. During this pilot, no money is collected and chats are 100% free.
              </p>
            </div>

            {/* Time Agreement */}
            <div>
              <label className="block text-xs font-bold text-[#152225] uppercase tracking-wider mb-2">
                Agreed Duration:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {([5, 15, 30] as const).map(mins => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setSessionMinutes(mins)}
                    className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                      sessionMinutes === mins
                        ? 'border-[#2255ee] bg-[#2255ee] text-white shadow-sm'
                        : 'border-[#e2e6ef] bg-[#f8f9fd] text-[#152225]'
                    }`}
                  >
                    {mins} mins
                  </button>
                ))}
              </div>
            </div>

            {/* Intent */}
            <div>
              <label className="block text-xs font-bold text-[#152225] uppercase tracking-wider mb-2">
                What would feel good right now?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'vent', label: 'Just vent' },
                  { id: 'listen', label: 'Active listen' },
                  { id: 'advice', label: 'Perspective' },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSessionIntent(item.id as 'vent' | 'advice' | 'listen')}
                    className={`py-2 px-1 rounded-xl border text-[11px] font-bold text-center transition-all ${
                      sessionIntent === item.id
                        ? 'border-[#2255ee] bg-[#2255ee]/10 text-[#2255ee]'
                        : 'border-[#e2e6ef] bg-[#f8f9fd] text-[#5e6978]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-[#5e6978]">
              You will appear as <strong>{user.alias}</strong>. Your personal contact details and email stay strictly hidden.
            </p>

            <button
              onClick={handleStartRequest}
              className="w-full py-3 rounded-xl bg-[#2255ee] text-white text-xs font-bold hover:bg-[#1a44c2] shadow-md transition-colors"
            >
              Start Conversation Now
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
