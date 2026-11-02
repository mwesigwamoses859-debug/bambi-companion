export type SpaceId = 
  | 'home' 
  | 'listen' 
  | 'talk' 
  | 'myspace' 
  | 'daily' 
  | 'peermatch' 
  | 'freetools' 
  | 'admin'
  | 'showcase'
  | 'laptop'
  | 'android';

export type DeviceMode = 'showcase' | 'laptop' | 'android' | 'standard';

export type UserRole = 'caller' | 'listener' | 'admin';

export type UserProfile = {
  alias: string;
  avatarId: string;
  role: UserRole;
  isSoloPractice: boolean;
  languages: string[];
  trialPassActive: boolean;
  trialPassExpiry?: string;
  agreedTerms: boolean;
  metricsEnabled: boolean;
};

export type ListenerApproval = 'approved' | 'review' | 'paused';

export type ListenerProfile = {
  id: string;
  alias: string;
  avatarId: string;
  languages: string[];
  topics: string[];
  experienceLevel: string;
  bio: string;
  approval: ListenerApproval;
  isAvailable: boolean;
  ratingScore: number;
  completedSessions: number;
  testPointsEarned: number;
};

export type ChatMessage = {
  id: string;
  sender: 'user' | 'bambi' | 'peer';
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isVoiceNote?: boolean;
  voiceDurationSec?: number;
};

export type PeerSession = {
  id: string;
  callerAlias: string;
  callerAvatar: string;
  listenerId: string;
  listenerName: string;
  topic: string;
  intent: 'vent' | 'advice' | 'listen';
  minutes: number;
  channel: 'chat' | 'voice';
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  startedAt?: string;
  endedAt?: string;
  messages: ChatMessage[];
  ratings?: SessionRatings;
  reportNote?: string;
};

export type SessionRatings = {
  supportScore: number;       // Got the support I asked for
  listeningScore: number;     // Listening and understanding
  languageScore: number;      // Respectful, clear language
  comfortScore: number;       // Comfort and ease
  attentionScore: number;     // Personal, attentive and human
  timeScore: number;          // Agreed time honoured
  feedbackNote?: string;
  shareNoteWithListener: boolean;
  flaggedSafety?: boolean;
};

export type JournalEntry = {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: string;
  gratitude?: string[];
};

export type MoodLog = {
  id: string;
  timestamp: string;
  level: number; // 1 to 5
  moodLabel: string;
  energyLevel: string;
  tags: string[];
  note?: string;
};

export type ActionCard = {
  id: string;
  kind: 'discover' | 'ground' | 'career' | 'business';
  title: string;
  summary: string;
  actions: string[];
  savedAt: string;
};

export type SoundscapeType = 'rain' | 'breeze' | 'waves' | 'chime' | 'night';

export type SoundscapeTrack = {
  id: SoundscapeType;
  title: string;
  description: string;
  category: string;
  iconName: string;
};
