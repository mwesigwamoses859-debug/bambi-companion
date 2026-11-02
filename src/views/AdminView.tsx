import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Clock, 
  Coins, 
  FileSpreadsheet, 
  CheckCircle, 
  PauseCircle, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const { 
    listeners, 
    updateListener, 
    completedSessions, 
    testPointsTotal 
  } = useApp();

  const [simulatedClockHours, setSimulatedClockHours] = useState(0);
  const [payoutNotice, setPayoutNotice] = useState<string | null>(null);

  // Test ledger calculations (Authentic Bambi economics formula)
  const passPriceUGX = 500;
  const processingFee = 15;
  const netPool = passPriceUGX - processingFee; // 485
  const listenerPoolPts = Math.round(netPool * 0.6); // 291
  const referralBonusPts = 30;
  const platformPts = netPool - listenerPoolPts - referralBonusPts; // 164

  const handleSimulatePayout = () => {
    setPayoutNotice(`Simulated weekly payout recorded: UGX ${(testPointsTotal * 1).toLocaleString()} for ${listeners.length} active listeners. Unique test ref: #PAY-${Date.now().toString().slice(-6)}. No actual money moved.`);
    setTimeout(() => setPayoutNotice(null), 5000);
  };

  const handleAdvanceClock = () => {
    setSimulatedClockHours(prev => prev + 72);
    setPayoutNotice('Practice review clock advanced 72 hours. All provisional ratings are now eligible for weekly reconciliation.');
    setTimeout(() => setPayoutNotice(null), 4000);
  };

  const handleExportCSV = () => {
    const rows = [
      ['Session ID', 'Caller', 'Listener', 'Topic', 'Agreed Mins', 'Status', 'Rating Average'],
      ...completedSessions.map(s => [
        s.id,
        s.callerAlias,
        s.listenerName,
        s.topic,
        s.minutes.toString(),
        s.status,
        s.ratings ? (
          (s.ratings.supportScore + s.ratings.listeningScore + s.ratings.languageScore + 
           s.ratings.comfortScore + s.ratings.attentionScore + s.ratings.timeScore) / 6
        ).toFixed(1) : 'Unreviewed'
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bambi_pilot_sessions_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-fade-in">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e6ef] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2255ee]">
            Solo Practice Console
          </span>
          <h1 className="text-2xl font-black text-[#152225] mt-1">
            Pilot Management & Test Ledger
          </h1>
          <p className="text-xs text-[#5e6978] mt-1">
            Review applicant listeners, simulate weekly payouts, inspect the UGX 500 pass formula, and export data.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm shrink-0"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {payoutNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 animate-fade-in">
          {payoutNotice}
        </div>
      )}

      {/* 1. Pass Economics Ledger Strip */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e6ef] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#152225]">UGX 500 Day Pass Allocation Model</h2>
            <p className="text-xs text-[#5e6978]">Verified mathematical funding breakdown per participant pass.</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#e6fb8b] text-[#152225] border border-[#d2ea6d]">
            Gross: UGX 500
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-[#f8f9fd] border border-[#e2e6ef]">
            <span className="text-[10px] font-bold text-[#5e6978] uppercase tracking-wider block">Processing Fee:</span>
            <span className="text-lg font-black text-[#152225]">UGX {processingFee}</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">60% Listener Pool:</span>
            <span className="text-lg font-black text-emerald-950">{listenerPoolPts} pts</span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
            <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block">Referral Bonus:</span>
            <span className="text-lg font-black text-purple-950">{referralBonusPts} pts</span>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100">
            <span className="text-[10px] font-bold text-sky-800 uppercase tracking-wider block">Bambi Platform:</span>
            <span className="text-lg font-black text-sky-950">{platformPts} pts</span>
          </div>
        </div>

        {/* Formula Explainer */}
        <div className="p-4 rounded-2xl bg-[#f8f9fd] border border-[#e2e6ef] text-xs text-[#5e6978] space-y-1.5">
          <p className="font-bold text-[#152225]">Formula rules:</p>
          <p>
            • The Listener pool is divided equally across distinct Listeners with a completed session.
          </p>
          <p>
            • Each share is multiplied by the Caller’s review quality: 1/5 = 0%, 3/5 = 50%, 5/5 = 100%. Unreviewed sessions remain provisionally neutral.
          </p>
          <p>
            • Minimum 20,000 cleared points is proposed for weekly Mobile Money redemption in the production service.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={handleAdvanceClock}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#152225] hover:bg-black text-white text-xs font-bold transition-colors"
          >
            <Clock className="w-4 h-4" />
            <span>Advance Practice Clock (+72 hrs)</span>
          </button>

          <button
            onClick={handleSimulatePayout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2255ee] hover:bg-[#1a44c2] text-white text-xs font-bold transition-colors shadow-sm"
          >
            <Coins className="w-4 h-4" />
            <span>Simulate Weekly Payout</span>
          </button>
        </div>
      </section>

      {/* 2. Listener Application Management */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e6ef] shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-bold text-[#152225]">Peer Listeners Roster</h2>
          <p className="text-xs text-[#5e6978]">Review approvals and availability for this workspace.</p>
        </div>

        <div className="space-y-3">
          {listeners.map(lis => (
            <div
              key={lis.id}
              className="p-4 rounded-2xl bg-[#f8f9fd] border border-[#e2e6ef] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-[#152225]">{lis.alias}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    lis.approval === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {lis.approval}
                  </span>
                </div>
                <p className="text-xs text-[#5e6978] mt-0.5">
                  Languages: {lis.languages.join(', ')} · Points: <strong>{lis.testPointsEarned.toLocaleString()}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                {lis.approval === 'approved' ? (
                  <button
                    onClick={() => updateListener(lis.id, { approval: 'paused', isAvailable: false })}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 text-xs font-bold transition-colors"
                  >
                    <PauseCircle className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </button>
                ) : (
                  <button
                    onClick={() => updateListener(lis.id, { approval: 'approved', isAvailable: true })}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold transition-colors"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                )}

                <button
                  onClick={() => updateListener(lis.id, { isAvailable: !lis.isAvailable })}
                  className="px-3 py-1.5 rounded-lg border border-[#e2e6ef] bg-white text-xs font-bold text-[#152225] hover:bg-gray-50 transition-colors"
                >
                  {lis.isAvailable ? 'Go Offline' : 'Go Online'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
