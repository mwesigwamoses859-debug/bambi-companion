import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, Phone, HeartHandshake, X } from 'lucide-react';

export const UrgentHelpModal: React.FC = () => {
  const { showUrgentHelp, setShowUrgentHelp } = useApp();

  if (!showUrgentHelp) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-rose-200 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setShowUrgentHelp(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-[#5e6978] hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 text-rose-600 mb-3">
          <ShieldAlert className="w-6 h-6 shrink-0" />
          <span className="text-xs font-black uppercase tracking-wider">Urgent Support & Safety</span>
        </div>

        <h2 className="text-2xl font-bold text-[#152225] leading-snug">
          Don’t wait for a chat response
        </h2>

        <p className="text-sm text-[#5e6978] mt-2 leading-relaxed">
          Peer listening is for everyday listening and sharing lived experiences. It is <strong>not emergency care or medical treatment</strong>. If you or someone you know is in immediate physical danger, experiencing acute distress, or having thoughts of self-harm, please reach out to local emergency services right away:
        </p>

        <div className="mt-5 space-y-3">
          {/* Uganda Police */}
          <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-100 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#152225]">Uganda Police Emergency</p>
              <p className="text-xs text-[#5e6978]">Toll-Free: <strong>999</strong> or <strong>112</strong></p>
            </div>
          </div>

          {/* Child Helpline Sauti */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#152225]">Uganda Child Helpline (Sauti)</p>
              <p className="text-xs text-[#5e6978]">Toll-Free: <strong>116</strong> (Confidential support for youth & families)</p>
            </div>
          </div>

          {/* Mental Health First Aid */}
          <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-sky-100 text-sky-700">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#152225]">Butabika National Referral Hospital</p>
              <p className="text-xs text-[#5e6978]">Mental health emergency desk: <strong>+256 414 504 376</strong></p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-[#f8f9fd] border border-[#e2e6ef] text-xs text-[#5e6978]">
          <p className="font-semibold text-[#152225] mb-1">Gentle grounding right now:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Place your feet firmly on the ground.</li>
            <li>Take three slow, deep breaths: in for 4 seconds, out for 6 seconds.</li>
            <li>If possible, ask someone you trust nearby to stay with you in person.</li>
          </ul>
        </div>

        <button
          onClick={() => setShowUrgentHelp(false)}
          className="mt-6 w-full py-2.5 rounded-xl bg-gray-900 text-white font-medium text-xs hover:bg-black transition-colors"
        >
          Close this notice
        </button>

      </div>
    </div>
  );
};
