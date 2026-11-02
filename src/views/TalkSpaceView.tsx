import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ChatMessage } from '../types';
import { 
  Send, 
  Mic, 
  MicOff,
  Users, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  RotateCcw,
  Volume2,
  VolumeX,
  ArrowLeft
} from 'lucide-react';
import { AVATARS } from '../data/initialData';
import { generateBambiAIResponse } from '../utils/bambiAI';

export const TalkSpaceView: React.FC = () => {
  const { user, setCurrentSpace } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-0',
      sender: 'bambi',
      senderName: 'Bambi Companion',
      senderAvatar: 'av-2',
      text: `Hello ${user.alias}. Welcome into this little room. You don't have to have any perfect words here. How is your heart doing today?`,
      timestamp: 'Just now'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [talkMode, setTalkMode] = useState<'vent' | 'think' | 'gentle'>('vent');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceInputActive, setIsVoiceInputActive] = useState(false);
  const [activeSpeakingId, setActiveSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const userAvatar = AVATARS.find(a => a.id === user.avatarId) || AVATARS[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakText = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (activeSpeakingId === msgId) {
      window.speechSynthesis.cancel();
      setActiveSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    utterance.onstart = () => setActiveSpeakingId(msgId);
    utterance.onend = () => setActiveSpeakingId(null);
    utterance.onerror = () => setActiveSpeakingId(null);
    window.speechSynthesis.speak(utterance);
  };

  const toggleMicInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition isn't available in this browser. You can type your message freely.");
      return;
    }

    if (isVoiceInputActive) {
      try { recognitionRef.current?.stop(); } catch (e) {}
      setIsVoiceInputActive(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsVoiceInputActive(true);
      recognition.onresult = (event: any) => {
        const spoken = event.results[0][0].transcript;
        if (spoken) {
          setInputText(spoken);
          handleSendMessage(spoken);
        }
      };
      recognition.onend = () => setIsVoiceInputActive(false);
      recognition.onerror = () => setIsVoiceInputActive(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      setIsVoiceInputActive(false);
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      senderName: user.alias,
      senderAvatar: user.avatarId,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // AI Bambi Companion response generator
    setTimeout(() => {
      const aiResult = generateBambiAIResponse(text, talkMode, user.alias);

      const botMsgId = 'bot-' + Date.now();
      const botMsg: ChatMessage = {
        id: botMsgId,
        sender: 'bambi',
        senderName: 'Bambi Companion',
        senderAvatar: 'av-2',
        text: aiResult.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);

      // Auto speak response softly if desired
      if ('speechSynthesis' in window && window.innerWidth >= 768) {
        speakText(botMsgId, aiResult.reply);
      }
    }, 1100);
  };

  const chips = [
    "I just want to vent",
    "Help me think this through",
    "Feeling overwhelmed today",
    "Can we take it slowly?",
    "Need gentle encouragement",
    "Life in Kampala is doing life"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-fade-in font-sans">
      
      {/* Header & Mode Switch */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#ece7f7] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentSpace('home')}
              className="p-1 rounded-xl text-[#7c3aed] hover:bg-purple-50 transition-colors mr-1"
              title="Back to Home"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="p-1.5 rounded-xl bg-purple-100 text-[#7c3aed]">
              <Sparkles className="w-4 h-4" />
            </span>
            <h1 className="text-xl font-black text-[#152225]">
              Talk with Bambi Companion
            </h1>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              AI Active
            </span>
          </div>
          <p className="text-xs text-[#5e6978] mt-1">
            Private, compassionate listening. Zero conversation logging or data sharing.
          </p>
        </div>

        {/* Talk Style Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-[#f6f3fc] rounded-2xl border border-[#ece7f7] text-xs font-bold">
          <button
            onClick={() => setTalkMode('vent')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              talkMode === 'vent'
                ? 'bg-[#7c3aed] text-white shadow-sm'
                : 'text-[#5e6978] hover:text-[#7c3aed]'
            }`}
          >
            Just Vent
          </button>
          <button
            onClick={() => setTalkMode('think')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              talkMode === 'think'
                ? 'bg-[#7c3aed] text-white shadow-sm'
                : 'text-[#5e6978] hover:text-[#7c3aed]'
            }`}
          >
            Think Through
          </button>
          <button
            onClick={() => setTalkMode('gentle')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              talkMode === 'gentle'
                ? 'bg-[#7c3aed] text-white shadow-sm'
                : 'text-[#5e6978] hover:text-[#7c3aed]'
            }`}
          >
            Gentle Comfort
          </button>
        </div>
      </div>

      {/* Human Peer Option Callout */}
      <div className="bg-gradient-to-r from-[#fdfbf7] to-[#fbf7ff] border border-amber-200/80 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#152225]">Prefer a real Ugandan human listener?</p>
            <p className="text-[11px] text-[#5e6978]">
              Connect anonymously with approved Ugandan peer listeners in Luganda, English, Runyankole or Swahili · UGX 500 pilot.
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentSpace('peermatch')}
          className="shrink-0 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-sm"
        >
          Find a Listener
        </button>
      </div>

      {/* Chat Messages Log */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#ece7f7] shadow-sm min-h-[440px] flex flex-col justify-between">
        
        <div className="space-y-4 overflow-y-auto max-h-[480px] pr-1">
          {messages.map(msg => {
            const isMe = msg.sender === 'user';
            const isSpeaking = activeSpeakingId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center text-sm shrink-0 border ${
                    isMe ? userAvatar.bg : 'bg-purple-100 border-purple-200 text-[#7c3aed]'
                  }`}
                >
                  {isMe ? userAvatar.emoji : '🤖'}
                </div>

                {/* Message Bubble */}
                <div className="max-w-[82%] sm:max-w-[72%] space-y-1">
                  <div
                    className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed ${
                      isMe
                        ? 'bg-[#7c3aed] text-white rounded-tr-none shadow-md shadow-purple-200'
                        : 'bg-[#f6f3fc] text-[#152225] border border-[#ece7f7] rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  
                  <div className={`flex items-center gap-2 text-[10px] text-[#5e6978] px-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <span>{msg.senderName} · {msg.timestamp}</span>

                    {/* Listen to message aloud button */}
                    {!isMe && (
                      <button
                        onClick={() => speakText(msg.id, msg.text)}
                        className={`p-1 rounded-full hover:bg-purple-100 transition-colors ${
                          isSpeaking ? 'text-[#7c3aed] animate-pulse font-bold' : 'text-gray-400'
                        }`}
                        title={isSpeaking ? "Stop speaking" : "Listen aloud"}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-[#6d28d9] bg-[#f6f3fc] p-3 rounded-2xl w-fit border border-[#ece7f7]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] animate-bounce [animation-delay:0.4s]" />
              <span className="font-semibold text-xs">Bambi is reflecting with care...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar & Chips */}
        <div className="mt-4 pt-4 border-t border-[#ece7f7] space-y-3">
          
          {/* Preset Emotion Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {chips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(chip)}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-[#f6f3fc] hover:bg-[#ede7fa] hover:text-[#7c3aed] border border-[#ece7f7] text-[11px] font-semibold text-[#5e6978] transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Text Input Area */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleMicInput}
              className={`p-3 rounded-2xl border transition-all ${
                isVoiceInputActive 
                  ? 'bg-rose-100 text-rose-600 border-rose-300 animate-pulse' 
                  : 'bg-[#f6f3fc] text-[#5e6978] hover:text-[#7c3aed] border-[#ece7f7]'
              }`}
              title={isVoiceInputActive ? "Listening... click to stop" : "Speak your message"}
            >
              {isVoiceInputActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Say what you need today... (Bambi is listening)"
              className="flex-1 px-4 py-3 rounded-2xl border border-[#ece7f7] focus:outline-none focus:ring-2 focus:ring-[#7c3aed] bg-[#f6f3fc] text-[#152225] text-xs sm:text-sm font-medium"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-3 rounded-2xl bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-40 text-white font-bold transition-all shadow-md shrink-0"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
