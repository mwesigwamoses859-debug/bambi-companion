import { ListenerProfile, SoundscapeTrack } from '../types';

export const AVATARS = [
  { id: 'av-1', label: 'Warm Sun', emoji: '☀️', bg: 'bg-amber-100 text-amber-700 border-amber-300' },
  { id: 'av-2', label: 'Gentle Heart', emoji: '💖', bg: 'bg-rose-100 text-rose-700 border-rose-300' },
  { id: 'av-3', label: 'Calm River', emoji: '🌊', bg: 'bg-sky-100 text-sky-700 border-sky-300' },
  { id: 'av-4', label: 'Little Sprout', emoji: '🌱', bg: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { id: 'av-5', label: 'Lilac Moon', emoji: '🌙', bg: 'bg-indigo-100 text-indigo-700 border-indigo-300' },
  { id: 'av-6', label: 'Soft Cloud', emoji: '☁️', bg: 'bg-slate-100 text-slate-700 border-slate-300' },
  { id: 'av-7', label: 'Sparkle Star', emoji: '✨', bg: 'bg-purple-100 text-purple-700 border-purple-300' },
  { id: 'av-8', label: 'Peace Dove', emoji: '🕊️', bg: 'bg-teal-100 text-teal-700 border-teal-300' },
];

export const TOPICS = [
  { id: 'self-discovery', label: 'Self-discovery', desc: 'Identity, confidence, feelings and personal growth' },
  { id: 'life-changes', label: 'Life changes', desc: 'Love, family, friendship, loss and belonging' },
  { id: 'relationships', label: 'Relationships', desc: 'Navigating friends, heartbreaks, boundaries & connection' },
  { id: 'spirituality', label: 'Spirituality & Stillness', desc: 'Stillness, spirituality, grounding and purpose' },
  { id: 'career-direction', label: 'Career direction', desc: 'Careers, learning, work decisions and next moves' },
  { id: 'business-ideas', label: 'Business ideas', desc: 'Starting out, validating offers, and making things happen' },
  { id: 'money-pressure', label: 'Money pressure', desc: 'Budgeting worries, family expectations, and financial stress' },
];

export const LANGUAGES = [
  'English',
  'Luganda',
  'Runyankole',
  'Rukiga',
  'Lusoga',
  'Acholi',
  'Ateso',
  'Lugbara',
  'Swahili',
  'Mandarin Chinese',
  'International'
];

export const INITIAL_LISTENERS: ListenerProfile[] = [
  {
    id: 'lis-1',
    alias: 'Kato · Safe Haven',
    avatarId: 'av-4',
    languages: ['English', 'Luganda'],
    topics: ['Self-discovery', 'Life changes', 'Money pressure'],
    experienceLevel: 'Regularly support others',
    bio: 'Lived through major family and career resets in Kampala. Here to listen quietly, hold space, and help you breathe without any rush.',
    approval: 'approved',
    isAvailable: true,
    ratingScore: 4.9,
    completedSessions: 38,
    testPointsEarned: 11400
  },
  {
    id: 'lis-2',
    alias: 'Patricia M.',
    avatarId: 'av-2',
    languages: ['English', 'Luganda', 'Lusoga'],
    topics: ['Relationships', 'Life changes', 'Self-discovery'],
    experienceLevel: 'Personal lived experience',
    bio: 'Big believer in the healing power of being heard. You do not have to have everything figured out before you speak.',
    approval: 'approved',
    isAvailable: true,
    ratingScore: 4.8,
    completedSessions: 24,
    testPointsEarned: 7200
  },
  {
    id: 'lis-3',
    alias: 'Brian O. · Practical Ear',
    avatarId: 'av-1',
    languages: ['English', 'Acholi', 'Swahili'],
    topics: ['Career direction', 'Business ideas', 'Money pressure'],
    experienceLevel: 'Extensive experience supporting others',
    bio: 'Worked with youth entrepreneurs and tech creators. Great for sorting through noisy thoughts into one tangible next step.',
    approval: 'approved',
    isAvailable: false,
    ratingScore: 5.0,
    completedSessions: 42,
    testPointsEarned: 12600
  },
  {
    id: 'lis-4',
    alias: 'Faith Namuli',
    avatarId: 'av-5',
    languages: ['English', 'Luganda', 'Runyankole'],
    topics: ['Spirituality & Stillness', 'Self-discovery'],
    experienceLevel: 'Personal lived experience',
    bio: 'When the world gets loud, having someone present without judgement is medicine. Let’s sit with what is.',
    approval: 'approved',
    isAvailable: true,
    ratingScore: 4.9,
    completedSessions: 19,
    testPointsEarned: 5700
  }
];

export const SOUNDSCAPES: SoundscapeTrack[] = [
  {
    id: 'rain',
    title: 'Warm Rain on Iron Sheets',
    description: 'A cozy, steady downpour that wraps your room in warmth and gentle quiet.',
    category: 'Water & Elements',
    iconName: 'CloudRain'
  },
  {
    id: 'breeze',
    title: 'Lake Victoria Breeze',
    description: 'Soft whisper of evening wind through acacia trees and quiet shores.',
    category: 'Nature & Wind',
    iconName: 'Wind'
  },
  {
    id: 'waves',
    title: 'Calming Waves',
    description: 'Rhythmic, gentle waves rolling in and out, syncing with peaceful breathing.',
    category: 'Water & Elements',
    iconName: 'Waves'
  },
  {
    id: 'chime',
    title: 'Mindful Tibetan Chime',
    description: 'Deep resonant bell frequency to center attention, clear fog, and ground the spirit.',
    category: 'Meditation & Focus',
    iconName: 'Bell'
  },
  {
    id: 'night',
    title: 'Kampala Night Solitude',
    description: 'Distant crickets and serene night ambience for unwinding before sleep.',
    category: 'Evening & Rest',
    iconName: 'Moon'
  }
];

export const QUIZ_QUESTIONS = [
  'When something new begins, what do you naturally do?',
  'What gives you the strongest sense of a good day?',
  'When you feel stuck, what usually helps you begin?',
  'What do people often ask you to help with?',
  'Which kind of space brings out your best?',
  'What would you like to make more room for this month?'
];

export const QUIZ_OPTIONS = [
  ['Explore what is possible', 'Make a practical plan', 'Talk it through with someone', 'Take time to understand it'],
  ['I learned something new', 'I completed something useful', 'I helped someone feel included', 'I understood something about myself'],
  ['Try a different approach', 'Break it into smaller steps', 'Find someone to think with', 'Write and reflect quietly'],
  ['Ideas and possibilities', 'Organising and getting things done', 'Listening and encouragement', 'Thinking carefully about a decision'],
  ['Room to experiment', 'A clear goal and enough structure', 'A kind, collaborative group', 'Some quiet and time to think'],
  ['Curiosity', 'Consistency', 'Connection', 'Reflection']
];

export const QUIZ_OUTCOMES = [
  {
    title: 'Make room for your curiosity',
    summary: 'Your answers today lean towards exploring possibilities and learning by trying. That can help you notice a new route when the old one feels narrow.',
    actions: [
      'Choose one idea and give it a small, low-cost experiment this week.',
      'Set a finishing point before you start, so curiosity becomes something you can use.',
      'Ask one person for feedback on what you tried.'
    ]
  },
  {
    title: 'Let small steps carry you forward',
    summary: 'Your answers today lean towards structure and practical progress. Clear steps may help you turn uncertainty into something you can work on.',
    actions: [
      'Choose one thing you can finish in the next 20 minutes.',
      'Leave room in your plan for rest and an unexpected change.',
      'Notice the progress you made, rather than only what is still unfinished.'
    ]
  },
  {
    title: 'Connection is one of your resources',
    summary: 'Your answers today lean towards listening and thinking with other people. A thoughtful conversation may help you find clarity and encourage someone else.',
    actions: [
      'Reach out to one person you trust and ask for a short conversation.',
      'Say what you need: listening, ideas, encouragement or practical help.',
      'Keep one boundary that protects your own time and energy.'
    ]
  },
  {
    title: 'Give your reflection somewhere to go',
    summary: "Your answers today lean towards understanding before acting. Quiet reflection may help you notice what matters beneath other people's expectations.",
    actions: [
      'Write down what you know, what you assume and what you still need to learn.',
      'Choose one small action that tests an assumption.',
      'Give yourself a decision point so reflection does not become endless waiting.'
    ]
  }
];

export const DAILY_AFFIRMATIONS = [
  {
    quote: "You don't have to carry every worry at once. Just breathe through this single hour.",
    author: "Bambi Companion",
    prompt: "What is one expectation you can gently set down today?"
  },
  {
    quote: "Being heard is not a luxury. It is a fundamental human need.",
    author: "Bambi Whisper",
    prompt: "Who has made you feel truly seen lately, or how can you give that gift to yourself?"
  },
  {
    quote: "Small, quiet steps count just as much as loud leaps forward.",
    author: "Bambi Reflection",
    prompt: "What is one tiny victory from your day that only you noticed?"
  },
  {
    quote: "Give yourself permission to pause without feeling guilty.",
    author: "Bambi Sanctuary",
    prompt: "Can you gift yourself 90 seconds of stillness right now?"
  }
];

export const NICKNAMES = [
  'GentleSun', 'CozySparrow', 'RiverPearl', 'WarmBreeze', 'QuietPine', 
  'AmberLeaf', 'SilverDew', 'LilacCloud', 'PeaceSeeker', 'MorningMist', 
  'GoldenAcorn', 'VelvetSky', 'CalmEcho', 'BrightSeed'
];
