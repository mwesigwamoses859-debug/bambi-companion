import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AVATARS, NICKNAMES, LANGUAGES } from '../data/initialData';
import { Sparkles, Check, X, Shuffle, ArrowRight } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { user, updateUser, showOnboarding, setShowOnboarding, setCurrentSpace } = useApp();

  const [selectedAvatar, setSelectedAvatar] = useState(user.avatarId);
  const [alias, setAlias] = useState(user.alias);
  const [primaryLang, setPrimaryLang] = useState(user.languages[0] || 'English');

  if (!showOnboarding) return null;

  const handleRandomizeName = () => {
    const random = NICKNAMES[Math.floor(Math.random() * NICKNAMES.length)];
    setAlias(random);
  };

  const handleSave = (targetSpace?: 'listen' | 'talk' | 'daily' | 'myspace') => {
    updateUser({
      avatarId: selectedAvatar,
      alias: alias.trim() || 'GentleFriend',
      languages: [primaryLang, ...user.languages.filter(l => l !== primaryLang)]
    });
    setShowOnboarding(false);
    if (targetSpace) {
      setCurrentSpace(targetSpace);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#e2e6ef] relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setShowOnboarding(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-[#5e6978] hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#dcd1ff] text-[#152225] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#2255ee]" />
            A Little Space. A Little More You.
          </span>
          <h2 className="text-2xl font-bold text-[#152225]">Welcome to Bambi</h2>
          <p className="text-sm text-[#5e6978] mt-1">
            Choose how you want to show up today. Your real identity and email stay completely confidential.
          </p>
        </div>

        {/* Choose Avatar */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-[#152225] uppercase tracking-wider mb-2">
            1. Pick Your Avatar
          </label>
          <div className="grid grid-cols-4 gap-2.5">
            {AVATARS.map(avatar => {
              const isSelected = selectedAvatar === avatar.id;
              return (
                <button
                  key={avatar.id}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? 'border-[#2255ee] bg-[#2255ee]/5 scale-105 shadow-sm'
                      : 'border-[#e2e6ef] hover:border-gray-300 bg-[#f8f9fd]'
                  }`}
                >
                  <span className="text-2xl mb-1">{avatar.emoji}</span>
                  <span className="text-[10px] font-medium text-[#5e6978] truncate w-full text-center">
                    {avatar.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Choose Alias */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-[#152225] uppercase tracking-wider">
              2. Your Nickname For Now
            </label>
            <button
              type="button"
              onClick={handleRandomizeName}
              className="flex items-center gap-1 text-xs text-[#2255ee] font-semibold hover:underline"
            >
              <Shuffle className="w-3 h-3" />
              Surprise me
            </button>
          </div>
          <input
            type="text"
            value={alias}
            onChange={e => setAlias(e.target.value)}
            maxLength={24}
            className="w-full px-4 py-2.5 rounded-xl border border-[#e2e6ef] focus:outline-none focus:ring-2 focus:ring-[#2255ee] text-[#152225] font-medium text-sm bg-[#f8f9fd]"
            placeholder="Enter a nickname..."
          />
        </div>

        {/* Language */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-[#152225] uppercase tracking-wider mb-2">
            3. Preferred Language
          </label>
          <select
            value={primaryLang}
            onChange={e => setPrimaryLang(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-[#e2e6ef] focus:outline-none focus:ring-2 focus:ring-[#2255ee] text-[#152225] font-medium text-sm bg-[#f8f9fd]"
          >
            {LANGUAGES.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => handleSave()}
            className="w-full py-3 rounded-xl bg-[#2255ee] text-white font-bold text-sm hover:bg-[#1a44c2] transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <span>Save & Enter My Space</span>
            <Check className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-center text-[#5e6978] pt-1">
            Or dive straight into an experience:
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => handleSave('listen')}
              className="p-2.5 rounded-xl border border-[#e2e6ef] bg-[#f8f9fd] hover:bg-white text-xs font-semibold text-[#152225] flex items-center justify-center gap-1 transition-colors"
            >
              🎧 Go to Listen Space
            </button>
            <button
              onClick={() => handleSave('talk')}
              className="p-2.5 rounded-xl border border-[#e2e6ef] bg-[#f8f9fd] hover:bg-white text-xs font-semibold text-[#152225] flex items-center justify-center gap-1 transition-colors"
            >
              💬 Go to Talk Space
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
