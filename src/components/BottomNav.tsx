import React from 'react';
import { useApp } from '../context/AppContext';
import { SpaceId } from '../types';
import { Heart, Headphones, MessageSquare, Sun, BookOpen } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentSpace, setCurrentSpace } = useApp();

  const tabs: { id: SpaceId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Heart className="w-5 h-5" /> },
    { id: 'listen', label: 'Listen', icon: <Headphones className="w-5 h-5" /> },
    { id: 'talk', label: 'Talk', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'daily', label: 'Daily', icon: <Sun className="w-5 h-5" /> },
    { id: 'myspace', label: 'My Space', icon: <BookOpen className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#ece7f7] px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map(tab => {
          const isActive = currentSpace === tab.id || (tab.id === 'home' && currentSpace === 'android');
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentSpace(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all ${
                isActive
                  ? 'text-[#7c3aed] font-black scale-105'
                  : 'text-[#5e6978] hover:text-[#152225] font-semibold'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-colors ${isActive ? 'bg-purple-100/80 text-[#7c3aed]' : ''}`}>
                {tab.icon}
              </div>
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
