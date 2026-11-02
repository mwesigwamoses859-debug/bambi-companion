# Bambi · My Little Space (Digital Companion & Peer Sanctuary)

A compassionate, anonymous digital companion platform built for everyday emotional support, peaceful audio listening, reflective self-discovery tools, and Ugandan peer support.

---

## 🌟 What's New in this Enhanced Release

Following the interface review on [ChatGPT](https://chatgpt.com/share/6ae84aa0-55d4-83ea-8831-f7f82a02e78b), Bambi was elevated from a single-flow prototype into a **complete digital companion platform** featuring 4 dedicated, intuitive spaces:

1. 🎧 **Listen Space**:
   - **Synthesized Ambient Soundscapes**: Procedural Web Audio engine generating *Warm Rain on Iron Sheets*, *Lake Victoria Evening Breeze*, *Calming Waves*, *Mindful Tibetan Chime*, and *Kampala Night Solitude* (100% offline, zero bandwidth usage).
   - **90-Second Breathing Pacer**: Visual, calming box-breathing sphere with timed phases (Inhale 4s, Hold 4s, Exhale 6s).
   - **Solo Voice Rehearsal Studio**: Safe private recorder to hear your own voice before speaking with peers.

2. 💬 **Talk Space**:
   - **Empathetic Bambi AI Companion**: Real-time compassionate dialogue with mood modes (*Just Vent*, *Think Through*, *Gentle Comfort*).
   - **Prompt Chips**: Immediate entrance with *"I just want to vent"*, *"Help me think this through"*, *"Can we take it slowly?"*.
   - **Seamless Human Switch**: 1-click option to connect with real community listeners.

3. 📖 **My Space**:
   - **Personal Reflection Journal**: Private diary with custom entries and *Two Little Gratitudes* tracker.
   - **Emotional Weather Log**: Visual mood tracking (*Stormy*, *Cloudy*, *Tender*, *Grounded*, *Radiant*) over time.
   - **Saved Action Cards**: Quick access to action plans generated from self-discovery tools.
   - **Identity & Privacy Customizer**: Instant avatar selection, nickname generator, and local data reset.

4. ☀️ **Daily Moments**:
   - **Daily Encouragement / Whisper**: Inspiring daily quotes with guided reflection questions.
   - **"How am I, really?" Quick Check-in**: 60-second battery & feeling assessment giving tailored words of grace.
   - **"My Tiny Next Move"**: Deconstructs daunting worries into concrete, 15-minute micro-actions.

5. 🇺🇬 **Authentic Ugandan Peer Listening Pilot & Economics**:
   - **Directory & Filters**: Vetted peer listeners filterable by local Ugandan languages (*Luganda, English, Swahili, Runyankole, Rukiga, Lusoga, Acholi, Ateso, Lugbara*) and life topics.
   - **Verified Pass Economics**: Interactive breakdown of the proposed UGX 500 day pass (UGX 15 fee, 60% listener pool, 30 pt referral bonus, review-quality multipliers, ringfenced community pool).
   - **6-Dimension Review Rating**: Authentic rating system across support, listening, language, comfort, human attention, and time honored.
   - **Solo Practice Simulator & Admin**: Test ledger clock advancement, simulated weekly payouts, and CSV export.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
# Clone or navigate to the project directory
cd "C:\Users\Mwesigwa Moses\.gemini\antigravity\scratch\bambi-companion"

# Install dependencies
npm install

# Start local dev server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🛠️ Build for Production
```bash
npm run build
```
The compiled, production-ready static assets are output to the `dist/` directory, ready to deploy to Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

---

## 📂 Project Structure

```text
bambi-companion/
├── index.html                   # Entry HTML with meta & PWA headers
├── package.json                 # Project dependencies & scripts
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Bambi color palette & animations
├── src/
│   ├── main.tsx                 # React DOM mount point
│   ├── App.tsx                  # App root, space router & layout
│   ├── index.css                # Tailwind base & animations
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces for sessions, users, tools
│   ├── data/
│   │   └── initialData.ts       # Avatars, listeners, quiz data, soundscapes
│   ├── context/
│   │   └── AppContext.tsx       # State management & localStorage persistence
│   ├── utils/
│   │   └── soundEngine.ts       # Procedural Web Audio synthesizer (zero audio files needed!)
│   ├── components/
│   │   ├── Navbar.tsx           # Brand, space switcher, mode indicator, user menu
│   │   ├── BottomNav.tsx        # Mobile thumb navigation bar
│   │   ├── PrivacyBanner.tsx    # Anonymous metrics notice & controls
│   │   ├── OnboardingModal.tsx  # Welcoming look & nickname picker
│   │   └── UrgentHelpModal.tsx  # Ugandan emergency helplines & grounding tips
│   └── views/
│       ├── HomeView.tsx         # Welcoming hero & 4 spaces overview
│       ├── ListenSpaceView.tsx  # Ambient sounds, breathing guide & voice rehearsal
│       ├── TalkSpaceView.tsx    # Conversational Bambi companion & prompt chips
│       ├── MySpaceView.tsx      # Personal journal, mood tracker, saved cards
│       ├── DailyMomentsView.tsx # Daily whisper, check-in & tiny next move
│       ├── PeerMatchView.tsx    # Ugandan peer directory, live chat & 6D reviews
│       ├── FreeToolsView.tsx    # 6-Question quiz, KolaKit UGX calculator, Idea clarifier
│       └── AdminView.tsx        # Solo practice test ledger, simulated payouts, CSV export
```

---

## 🔒 Privacy & Safety Guarantee
- **Zero Chat Tracking**: All reflections and chats stay within your private browser session.
- **Anonymous Identity**: No real names, phone numbers, or passwords required.
- **Emergency Resources**: Prominent, one-click access to emergency helplines (Uganda Police 999/112, Child Helpline Sauti 116, Butabika Hospital support).
