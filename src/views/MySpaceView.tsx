import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  BookOpen, 
  Heart, 
  Trash2, 
  Plus, 
  Smile, 
  Sparkles, 
  Check, 
  Settings, 
  Bookmark, 
  Share2, 
  RotateCcw
} from 'lucide-react';
import { AVATARS } from '../data/initialData';

export const MySpaceView: React.FC = () => {
  const { 
    user, 
    updateUser, 
    journalEntries, 
    addJournalEntry, 
    deleteJournalEntry, 
    moodLogs, 
    addMoodLog, 
    savedCards, 
    deleteActionCard, 
    setShowOnboarding,
    resetAllData 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'journal' | 'mood' | 'saved' | 'profile'>('journal');

  // New Journal Form State
  const [showNewJournal, setShowNewJournal] = useState(false);
  const [journalTitle, setJournalTitle] = useState('');
  const [journalContent, setJournalContent] = useState('');
  const [journalMood, setJournalMood] = useState('Peaceful');
  const [gratitude1, setGratitude1] = useState('');
  const [gratitude2, setGratitude2] = useState('');

  // New Mood Log Form State
  const [showNewMood, setShowNewMood] = useState(false);
  const [selectedMoodLevel, setSelectedMoodLevel] = useState(4);
  const [moodLabel, setMoodLabel] = useState('Grounded');
  const [moodEnergy, setMoodEnergy] = useState('Medium');
  const [moodNote, setMoodNote] = useState('');

  const activeAvatar = AVATARS.find(a => a.id === user.avatarId) || AVATARS[0];

  const handleSaveJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalContent.trim()) return;

    const gratitudeList = [gratitude1, gratitude2].filter(g => g.trim().length > 0);
    addJournalEntry({
      title: journalTitle.trim() || 'Quiet Reflection',
      content: journalContent.trim(),
      mood: journalMood,
      gratitude: gratitudeList.length ? gratitudeList : undefined
    });

    setJournalTitle('');
    setJournalContent('');
    setGratitude1('');
    setGratitude2('');
    setShowNewJournal(false);
  };

  const handleSaveMood = (e: React.FormEvent) => {
    e.preventDefault();
    addMoodLog({
      level: selectedMoodLevel,
      moodLabel: moodLabel,
      energyLevel: moodEnergy,
      tags: [moodLabel, moodEnergy],
      note: moodNote.trim() || undefined
    });
    setMoodNote('');
    setShowNewMood(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-fade-in">
      
      {/* Space Hero & Profile Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e6ef] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border-2 shadow-sm ${activeAvatar.bg}`}>
            {activeAvatar.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-[#152225]">{user.alias}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#dcd1ff] text-[#152225]">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-[#5e6978] mt-0.5">
              Your private sanctuary · Stored safely in this browser only
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowOnboarding(true)}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#f8f9fd] border border-[#e2e6ef] hover:border-[#2255ee] text-xs font-bold text-[#152225] transition-colors"
          >
            Customize Look
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-[#e2e6ef] pb-3 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('journal')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
            activeTab === 'journal'
              ? 'bg-[#2255ee] text-white shadow-sm'
              : 'text-[#5e6978] hover:text-[#152225] hover:bg-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>My Journal ({journalEntries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('mood')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
            activeTab === 'mood'
              ? 'bg-[#2255ee] text-white shadow-sm'
              : 'text-[#5e6978] hover:text-[#152225] hover:bg-white'
          }`}
        >
          <Smile className="w-4 h-4" />
          <span>Emotional Weather ({moodLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
            activeTab === 'saved'
              ? 'bg-[#2255ee] text-white shadow-sm'
              : 'text-[#5e6978] hover:text-[#152225] hover:bg-white'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Discoveries ({savedCards.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
            activeTab === 'profile'
              ? 'bg-[#2255ee] text-white shadow-sm'
              : 'text-[#5e6978] hover:text-[#152225] hover:bg-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Preferences & Data</span>
        </button>
      </div>

      {/* TAB 1: JOURNAL */}
      {activeTab === 'journal' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#152225]">Personal Reflections</h2>
              <p className="text-xs text-[#5e6978]">A safe space to write what’s on your mind.</p>
            </div>
            {!showNewJournal && (
              <button
                onClick={() => setShowNewJournal(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2255ee] text-white text-xs font-bold hover:bg-[#1a44c2] shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Write reflection</span>
              </button>
            )}
          </div>

          {/* New Journal Form */}
          {showNewJournal && (
            <form onSubmit={handleSaveJournal} className="bg-white rounded-3xl p-6 border border-[#2255ee]/30 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#152225]">New Journal Entry</h3>
                <button
                  type="button"
                  onClick={() => setShowNewJournal(false)}
                  className="text-xs text-[#5e6978] hover:text-[#152225]"
                >
                  Cancel
                </button>
              </div>

              <input
                type="text"
                placeholder="Title or focus for today..."
                value={journalTitle}
                onChange={e => setJournalTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-[#e2e6ef] text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#2255ee]"
              />

              <textarea
                rows={4}
                required
                placeholder="Write freely. No one else will ever read this..."
                value={journalContent}
                onChange={e => setJournalContent(e.target.value)}
                className="w-full p-4 rounded-xl border border-[#e2e6ef] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2255ee] leading-relaxed"
              />

              {/* Gratitude prompts */}
              <div className="p-3 bg-[#f8f9fd] rounded-xl border border-[#e2e6ef] space-y-2">
                <span className="text-[11px] font-bold text-[#152225] uppercase tracking-wider">
                  Two little things I'm grateful for right now (optional):
                </span>
                <input
                  type="text"
                  placeholder="1. e.g. A warm morning breeze..."
                  value={gratitude1}
                  onChange={e => setGratitude1(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#e2e6ef] text-xs bg-white"
                />
                <input
                  type="text"
                  placeholder="2. e.g. A kind message from a friend..."
                  value={gratitude2}
                  onChange={e => setGratitude2(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#e2e6ef] text-xs bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewJournal(false)}
                  className="px-4 py-2 rounded-xl border border-[#e2e6ef] text-xs font-semibold text-[#5e6978]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2255ee] text-white text-xs font-bold hover:bg-[#1a44c2] shadow-sm"
                >
                  Save Reflection
                </button>
              </div>
            </form>
          )}

          {/* Journal Entries List */}
          {journalEntries.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-[#e2e6ef] p-8">
              <BookOpen className="w-8 h-8 text-[#5e6978] mx-auto mb-2 opacity-50" />
              <h3 className="font-bold text-sm text-[#152225]">Your journal is quiet</h3>
              <p className="text-xs text-[#5e6978] mt-1 max-w-sm mx-auto">
                Write a quick thought, note down a small realization, or express how your day unfolded.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {journalEntries.map(entry => (
                <div key={entry.id} className="bg-white rounded-2xl p-5 border border-[#e2e6ef] hover:border-gray-300 transition-all shadow-sm space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#2255ee] bg-[#2255ee]/10 px-2 py-0.5 rounded">
                        {entry.date}
                      </span>
                      <h3 className="text-base font-bold text-[#152225] mt-1.5">{entry.title}</h3>
                    </div>
                    <button
                      onClick={() => deleteJournalEntry(entry.id)}
                      className="p-1 text-gray-400 hover:text-rose-600 transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5e6978] leading-relaxed whitespace-pre-wrap">
                    {entry.content}
                  </p>

                  {entry.gratitude && entry.gratitude.length > 0 && (
                    <div className="pt-2 border-t border-[#e2e6ef]/60">
                      <p className="text-[10px] font-bold text-[#152225] uppercase tracking-wider mb-1">
                        Little Gratitudes:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {entry.gratitude.map((g, i) => (
                          <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 font-medium">
                            🌱 {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MOOD & EMOTIONAL WEATHER */}
      {activeTab === 'mood' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#152225]">Emotional Weather Tracker</h2>
              <p className="text-xs text-[#5e6978]">Track your feelings over time without judgement.</p>
            </div>
            {!showNewMood && (
              <button
                onClick={() => setShowNewMood(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2255ee] text-white text-xs font-bold hover:bg-[#1a44c2] shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Log Today's Mood</span>
              </button>
            )}
          </div>

          {/* New Mood Log Modal / Form */}
          {showNewMood && (
            <form onSubmit={handleSaveMood} className="bg-white rounded-3xl p-6 border border-[#e2e6ef] shadow-md space-y-4">
              <h3 className="font-bold text-sm text-[#152225]">How is your emotional weather right now?</h3>

              {/* Mood Level Selector */}
              <div className="grid grid-cols-5 gap-2">
                {[
                  { lvl: 1, label: 'Stormy', emoji: '⛈️' },
                  { lvl: 2, label: 'Cloudy', emoji: '☁️' },
                  { lvl: 3, label: 'Tender', emoji: '⛅' },
                  { lvl: 4, label: 'Grounded', emoji: '🌤️' },
                  { lvl: 5, label: 'Radiant', emoji: '☀️' },
                ].map(item => (
                  <button
                    key={item.lvl}
                    type="button"
                    onClick={() => {
                      setSelectedMoodLevel(item.lvl);
                      setMoodLabel(item.label);
                    }}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      selectedMoodLevel === item.lvl
                        ? 'border-[#2255ee] bg-[#2255ee]/10 font-bold scale-105 shadow-sm'
                        : 'border-[#e2e6ef] bg-[#f8f9fd] hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{item.emoji}</span>
                    <span className="text-[11px] text-[#152225] font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Optional short note (e.g. Taking it one hour at a time)..."
                value={moodNote}
                onChange={e => setMoodNote(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#e2e6ef] text-xs"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewMood(false)}
                  className="px-4 py-2 rounded-xl border border-[#e2e6ef] text-xs font-semibold text-[#5e6978]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2255ee] text-white text-xs font-bold hover:bg-[#1a44c2]"
                >
                  Log Weather
                </button>
              </div>
            </form>
          )}

          {/* Mood Logs History */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {moodLogs.map(log => (
              <div key={log.id} className="p-4 rounded-2xl bg-white border border-[#e2e6ef] shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">
                    {log.level === 5 ? '☀️' : log.level === 4 ? '🌤️' : log.level === 3 ? '⛅' : log.level === 2 ? '☁️' : '⛈️'}
                  </span>
                  <span className="text-[10px] text-[#5e6978]">{log.timestamp}</span>
                </div>
                <h4 className="font-bold text-sm text-[#152225]">{log.moodLabel}</h4>
                {log.note && (
                  <p className="text-xs text-[#5e6978] italic">"{log.note}"</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SAVED CARDS */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#152225]">Saved Action Cards</h2>
            <p className="text-xs text-[#5e6978]">Actionable next steps from your self-discovery explorations.</p>
          </div>

          {savedCards.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-[#e2e6ef] p-8">
              <Bookmark className="w-8 h-8 text-[#5e6978] mx-auto mb-2 opacity-50" />
              <h3 className="font-bold text-sm text-[#152225]">No saved cards yet</h3>
              <p className="text-xs text-[#5e6978] mt-1 max-w-sm mx-auto">
                Explore the free 2-minute "Know Myself" quiz or "My tiny next move" in Free Tools, and save your outcome cards here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedCards.map(card => (
                <div key={card.id} className="p-5 rounded-2xl bg-white border border-[#e2e6ef] shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                        {card.kind} · Saved {card.savedAt}
                      </span>
                      <button
                        onClick={() => deleteActionCard(card.id)}
                        className="text-gray-400 hover:text-rose-600 p-1"
                        title="Remove card"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3 className="font-bold text-base text-[#152225] mt-2">{card.title}</h3>
                    <p className="text-xs text-[#5e6978] mt-1 leading-relaxed">{card.summary}</p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-[#e2e6ef]">
                    <p className="text-[11px] font-bold text-[#152225] uppercase tracking-wider">Suggested Actions:</p>
                    {card.actions.map((act, i) => (
                      <p key={i} className="text-xs text-[#5e6978] flex items-start gap-1.5">
                        <span className="text-[#2255ee] font-bold">›</span>
                        <span>{act}</span>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PREFERENCES & DATA */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e6ef] shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#152225]">Preferences & Privacy Controls</h2>
            <p className="text-xs text-[#5e6978]">Manage how Bambi runs on this device.</p>
          </div>

          <div className="space-y-4 max-w-xl">
            <div className="p-4 rounded-2xl bg-[#f8f9fd] border border-[#e2e6ef] flex items-center justify-between">
              <div>
                <p className="font-bold text-xs sm:text-sm text-[#152225]">Solo Practice Mode</p>
                <p className="text-[11px] text-[#5e6978]">
                  When active, peer listening is safely simulated locally.
                </p>
              </div>
              <input
                type="checkbox"
                checked={user.isSoloPractice}
                onChange={e => updateUser({ isSoloPractice: e.target.checked })}
                className="w-5 h-5 accent-[#2255ee] rounded cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#f8f9fd] border border-[#e2e6ef] flex items-center justify-between">
              <div>
                <p className="font-bold text-xs sm:text-sm text-[#152225]">Anonymous Usage Metrics</p>
                <p className="text-[11px] text-[#5e6978]">
                  Counts visits to improve pilot. Never includes chat or identity.
                </p>
              </div>
              <input
                type="checkbox"
                checked={user.metricsEnabled}
                onChange={e => updateUser({ metricsEnabled: e.target.checked })}
                className="w-5 h-5 accent-[#2255ee] rounded cursor-pointer"
              />
            </div>

            <div className="pt-4 border-t border-[#e2e6ef]">
              <p className="text-xs font-bold text-rose-600 mb-1">Clear Local Data</p>
              <p className="text-xs text-[#5e6978] mb-3">
                Wipes all locally stored journal entries, mood history, and saved cards from this device.
              </p>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset all local data?')) {
                    resetAllData();
                  }
                }}
                className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-colors"
              >
                Reset all browser data
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
