import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { PrivacyBanner } from './components/PrivacyBanner';
import { OnboardingModal } from './components/OnboardingModal';
import { UrgentHelpModal } from './components/UrgentHelpModal';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

// Views
import { DualShowcaseView } from './views/DualShowcaseView';
import { LaptopDashboard } from './views/LaptopDashboard';
import { AndroidAppView } from './views/AndroidAppView';
import { HomeView } from './views/HomeView';
import { ListenSpaceView } from './views/ListenSpaceView';
import { TalkSpaceView } from './views/TalkSpaceView';
import { MySpaceView } from './views/MySpaceView';
import { DailyMomentsView } from './views/DailyMomentsView';
import { PeerMatchView } from './views/PeerMatchView';
import { FreeToolsView } from './views/FreeToolsView';
import { AdminView } from './views/AdminView';

const MainContent: React.FC = () => {
  const { currentSpace, setCurrentSpace, setShowUrgentHelp } = useApp();

  // Detect mobile screen or standalone Android app
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const isMainMobileHome = isMobile && (currentSpace === 'home' || currentSpace === 'showcase' || currentSpace === 'android');

  const getPageTitle = () => {
    switch (currentSpace) {
      case 'listen': return 'Listen Sanctuary';
      case 'talk': return 'Talk with Bambi';
      case 'peermatch': return 'Ugandan Peer Pilot';
      case 'myspace': return 'My Space Journal';
      case 'daily': return 'Daily Moments';
      case 'freetools': return 'Free Tools & Quiz';
      case 'admin': return 'Pilot Admin & Ledger';
      default: return 'Bambi Space';
    }
  };

  const renderView = () => {
    switch (currentSpace) {
      case 'home':
      case 'android':
        return <AndroidAppView isMockup={false} />;
      case 'laptop':
        return <LaptopDashboard />;
      case 'showcase':
        return isMobile ? <AndroidAppView isMockup={false} /> : <DualShowcaseView />;
      case 'listen':
        return <ListenSpaceView />;
      case 'talk':
        return <TalkSpaceView />;
      case 'myspace':
        return <MySpaceView />;
      case 'daily':
        return <DailyMomentsView />;
      case 'peermatch':
        return <PeerMatchView />;
      case 'freetools':
        return <FreeToolsView />;
      case 'admin':
        return <AdminView />;
      default:
        return <AndroidAppView isMockup={false} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f3fc] text-[#152225] selection:bg-[#dcd1ff]">
      {/* On desktop: show PrivacyBanner & Navbar */}
      {!isMobile && <PrivacyBanner />}
      {!isMobile && <Navbar />}

      {/* On mobile: if user navigated into an inner subview, show a dedicated Mobile Header */}
      {isMobile && !isMainMobileHome && (
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-[#ece7f7] shadow-sm">
          <button 
            onClick={() => setCurrentSpace('home')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#7c3aed] bg-[#f6f3fc] px-3 py-1.5 rounded-xl border border-[#ece7f7]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </button>
          
          <span className="text-xs font-extrabold text-[#152225]">
            {getPageTitle()}
          </span>

          <button 
            onClick={() => setShowUrgentHelp(true)}
            className="p-2 rounded-xl text-rose-600 bg-rose-50 border border-rose-200"
            title="Urgent Help"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>
        </header>
      )}

      {/* Main View Area */}
      <main className={`flex-1 w-full mx-auto ${isMobile ? 'p-0 pb-20' : 'max-w-7xl px-2 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-16'}`}>
        {renderView()}
      </main>

      {/* Mobile Bottom Navigation (Visible on inner pages on mobile) */}
      {isMobile && !isMainMobileHome && <BottomNav />}

      {/* Modals */}
      <OnboardingModal />
      <UrgentHelpModal />

      {/* Minimal Footer (Desktop Only) */}
      {!isMobile && (
        <footer className="border-t border-[#ece7f7] bg-white py-6 text-center text-xs text-[#5e6978]">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} Bambi · My Little Space. Designed for Moses.</p>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentSpace('showcase')} 
                className="hover:text-[#7c3aed] font-semibold transition-colors"
              >
                Dual Showcase
              </button>
              <button 
                onClick={() => setCurrentSpace('laptop')} 
                className="hover:text-[#7c3aed] transition-colors"
              >
                Laptop Dashboard
              </button>
              <button 
                onClick={() => setCurrentSpace('android')} 
                className="hover:text-[#7c3aed] transition-colors"
              >
                Android App View
              </button>
              <button 
                onClick={() => setCurrentSpace('peermatch')} 
                className="hover:text-[#7c3aed] transition-colors"
              >
                Peer Matching
              </button>
              <button 
                onClick={() => setCurrentSpace('freetools')} 
                className="hover:text-[#7c3aed] transition-colors"
              >
                Free Tools
              </button>
              <button 
                onClick={() => setShowUrgentHelp(true)} 
                className="text-rose-600 font-semibold hover:underline"
              >
                Urgent Help
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
