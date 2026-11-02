import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  SpaceId, 
  DeviceMode,
  UserProfile, 
  ListenerProfile, 
  PeerSession, 
  JournalEntry, 
  MoodLog, 
  ActionCard,
  ChatMessage
} from '../types';
import { INITIAL_LISTENERS, AVATARS, NICKNAMES } from '../data/initialData';
import { soundEngine } from '../utils/soundEngine';

interface AppContextType {
  currentSpace: SpaceId;
  setCurrentSpace: (space: SpaceId) => void;
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  listeners: ListenerProfile[];
  updateListener: (id: string, updates: Partial<ListenerProfile>) => void;
  activeSession: PeerSession | null;
  startSession: (session: Omit<PeerSession, 'id' | 'status' | 'messages'>) => void;
  endActiveSession: (ratings?: PeerSession['ratings']) => void;
  sendSessionMessage: (text: string, isVoice?: boolean, voiceDur?: number) => void;
  completedSessions: PeerSession[];
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
  deleteJournalEntry: (id: string) => void;
  moodLogs: MoodLog[];
  addMoodLog: (log: Omit<MoodLog, 'id' | 'timestamp'>) => void;
  savedCards: ActionCard[];
  saveActionCard: (card: Omit<ActionCard, 'id' | 'savedAt'>) => void;
  deleteActionCard: (id: string) => void;
  isAudioPlaying: boolean;
  activeTrackId: string | null;
  audioVolume: number;
  playTrack: (trackId: string) => void;
  stopAudio: () => void;
  setAudioVolume: (vol: number) => void;
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  showUrgentHelp: boolean;
  setShowUrgentHelp: (show: boolean) => void;
  resetAllData: () => void;
  testPointsTotal: number;
}

const DEFAULT_USER: UserProfile = {
  alias: 'GentleSeeker',
  avatarId: 'av-1',
  role: 'caller',
  isSoloPractice: true,
  languages: ['English', 'Luganda'],
  trialPassActive: true,
  trialPassExpiry: '24 hours remaining',
  agreedTerms: true,
  metricsEnabled: false
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation: defaults directly to the home screen (which renders the phone interface)
  const [currentSpace, setCurrentSpace] = useState<SpaceId>('home');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('android');

  // User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('bambi_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  // Listeners Directory
  const [listeners, setListeners] = useState<ListenerProfile[]>(() => {
    try {
      const saved = localStorage.getItem('bambi_listeners');
      return saved ? JSON.parse(saved) : INITIAL_LISTENERS;
    } catch {
      return INITIAL_LISTENERS;
    }
  });

  // Sessions
  const [activeSession, setActiveSession] = useState<PeerSession | null>(() => {
    try {
      const saved = localStorage.getItem('bambi_active_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [completedSessions, setCompletedSessions] = useState<PeerSession[]>(() => {
    try {
      const saved = localStorage.getItem('bambi_completed_sessions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Journal Entries
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    try {
      const saved = localStorage.getItem('bambi_journal');
      return saved ? JSON.parse(saved) : [
        {
          id: 'j-1',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          title: 'Finding stillness today',
          content: 'Took a few minutes to step away from the noise and just breathe. Bambi reminds me that I don’t have to solve everything in one single afternoon.',
          mood: 'Peaceful',
          gratitude: ['Quiet breeze', 'A warm cup of tea', 'Space to just be']
        }
      ];
    } catch {
      return [];
    }
  });

  // Mood Logs
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>(() => {
    try {
      const saved = localStorage.getItem('bambi_mood_logs');
      return saved ? JSON.parse(saved) : [
        {
          id: 'm-1',
          timestamp: 'Today, 9:00 AM',
          level: 4,
          moodLabel: 'Grounded & Hopeful',
          energyLevel: 'Medium',
          tags: ['Relaxed', 'Reflective'],
          note: 'Started the morning with a gentle 90-second pause.'
        }
      ];
    } catch {
      return [];
    }
  });

  // Action Cards / Discoveries
  const [savedCards, setSavedCards] = useState<ActionCard[]>(() => {
    try {
      const saved = localStorage.getItem('bambi_saved_cards');
      return saved ? JSON.parse(saved) : [
        {
          id: 'c-1',
          kind: 'discover',
          title: 'Make room for your curiosity',
          summary: 'Your answers lean towards exploring possibilities and learning by trying.',
          actions: [
            'Choose one idea and give it a small, low-cost experiment this week.',
            'Set a finishing point before you start.',
            'Ask one person for feedback on what you tried.'
          ],
          savedAt: 'Nov 2'
        }
      ];
    } catch {
      return [];
    }
  });

  // Soundscape State
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [audioVolume, setAudioVolumeState] = useState<number>(0.5);

  // Modals
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [showUrgentHelp, setShowUrgentHelp] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('bambi_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('bambi_listeners', JSON.stringify(listeners));
  }, [listeners]);

  useEffect(() => {
    localStorage.setItem('bambi_active_session', JSON.stringify(activeSession));
  }, [activeSession]);

  useEffect(() => {
    localStorage.setItem('bambi_completed_sessions', JSON.stringify(completedSessions));
  }, [completedSessions]);

  useEffect(() => {
    localStorage.setItem('bambi_journal', JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    localStorage.setItem('bambi_mood_logs', JSON.stringify(moodLogs));
  }, [moodLogs]);

  useEffect(() => {
    localStorage.setItem('bambi_saved_cards', JSON.stringify(savedCards));
  }, [savedCards]);

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const updateListener = (id: string, updates: Partial<ListenerProfile>) => {
    setListeners(prev => prev.map(lis => lis.id === id ? { ...lis, ...updates } : lis));
  };

  const startSession = (sessionData: Omit<PeerSession, 'id' | 'status' | 'messages'>) => {
    const newSession: PeerSession = {
      ...sessionData,
      id: 'sess-' + Date.now(),
      status: 'active',
      startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messages: [
        {
          id: 'msg-0',
          sender: 'peer',
          senderName: sessionData.listenerName,
          senderAvatar: 'av-2',
          text: `Hello ${sessionData.callerAlias}! I'm here and ready to listen. Take your time, there is no rush at all.`,
          timestamp: 'Just now'
        }
      ]
    };
    setActiveSession(newSession);
    setCurrentSpace('peermatch');
  };

  const sendSessionMessage = (text: string, isVoice = false, voiceDur = 0) => {
    if (!activeSession) return;
    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      senderName: activeSession.callerAlias,
      senderAvatar: activeSession.callerAvatar,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isVoiceNote: isVoice,
      voiceDurationSec: voiceDur
    };

    const updatedSession = {
      ...activeSession,
      messages: [...activeSession.messages, userMsg]
    };
    setActiveSession(updatedSession);

    // Simulate warm empathetic peer reply after 2.5s in Solo Practice
    if (user.isSoloPractice) {
      setTimeout(() => {
        setActiveSession(curr => {
          if (!curr) return null;
          const peerReply: ChatMessage = {
            id: 'msg-' + (Date.now() + 1),
            sender: 'peer',
            senderName: curr.listenerName,
            senderAvatar: 'av-2',
            text: isVoice 
              ? "Thank you for sending that voice note. Hearing the emotion behind your words makes a difference. I'm listening closely." 
              : "I hear you completely. It takes genuine courage to put that into words. How does it feel just saying it out loud?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          return {
            ...curr,
            messages: [...curr.messages, peerReply]
          };
        });
      }, 2000);
    }
  };

  const endActiveSession = (ratings?: PeerSession['ratings']) => {
    if (!activeSession) return;
    const finished: PeerSession = {
      ...activeSession,
      status: 'completed',
      endedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ratings
    };
    setCompletedSessions(prev => [finished, ...prev]);
    setActiveSession(null);
  };

  const addJournalEntry = (entry: Omit<JournalEntry, 'id' | 'date'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: 'j-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setJournalEntries(prev => [newEntry, ...prev]);
  };

  const deleteJournalEntry = (id: string) => {
    setJournalEntries(prev => prev.filter(e => e.id !== id));
  };

  const addMoodLog = (log: Omit<MoodLog, 'id' | 'timestamp'>) => {
    const newLog: MoodLog = {
      ...log,
      id: 'm-' + Date.now(),
      timestamp: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMoodLogs(prev => [newLog, ...prev]);
  };

  const saveActionCard = (card: Omit<ActionCard, 'id' | 'savedAt'>) => {
    const newCard: ActionCard = {
      ...card,
      id: 'card-' + Date.now(),
      savedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
    setSavedCards(prev => [newCard, ...prev]);
  };

  const deleteActionCard = (id: string) => {
    setSavedCards(prev => prev.filter(c => c.id !== id));
  };

  // Audio Controls
  const playTrack = (trackId: string) => {
    soundEngine.play(trackId);
    setActiveTrackId(trackId);
    setIsAudioPlaying(true);
  };

  const stopAudio = () => {
    soundEngine.stop();
    setActiveTrackId(null);
    setIsAudioPlaying(false);
  };

  const setAudioVolume = (vol: number) => {
    soundEngine.setVolume(vol);
    setAudioVolumeState(vol);
  };

  const resetAllData = () => {
    localStorage.clear();
    setUser(DEFAULT_USER);
    setListeners(INITIAL_LISTENERS);
    setActiveSession(null);
    setCompletedSessions([]);
    setJournalEntries([]);
    setMoodLogs([]);
    setSavedCards([]);
    stopAudio();
    setCurrentSpace('home');
  };

  const testPointsTotal = listeners.reduce((acc, lis) => acc + (lis.testPointsEarned || 0), 0);

  return (
    <AppContext.Provider
      value={{
        currentSpace,
        setCurrentSpace,
        deviceMode,
        setDeviceMode,
        user,
        updateUser,
        listeners,
        updateListener,
        activeSession,
        startSession,
        endActiveSession,
        sendSessionMessage,
        completedSessions,
        journalEntries,
        addJournalEntry,
        deleteJournalEntry,
        moodLogs,
        addMoodLog,
        savedCards,
        saveActionCard,
        deleteActionCard,
        isAudioPlaying,
        activeTrackId,
        audioVolume,
        playTrack,
        stopAudio,
        setAudioVolume,
        showOnboarding,
        setShowOnboarding,
        showUrgentHelp,
        setShowUrgentHelp,
        resetAllData,
        testPointsTotal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
