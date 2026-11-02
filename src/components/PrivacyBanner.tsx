import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Check, X } from 'lucide-react';

export const PrivacyBanner: React.FC = () => {
  const { user, updateUser } = useApp();
  const [dismissed, setDismissed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  if (dismissed) return null;

  return (
    <aside aria-label="Privacy and metrics notice" className="bg-[#f8f9fd] border-b border-[#e2e6ef] px-4 py-2.5 text-xs text-[#5e6978]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#2255ee] shrink-0" />
          <p>
            Bambi counts anonymous visits and feature use to improve this pilot. No chat text, aliases or contact details go into these metrics.{' '}
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-[#2255ee] font-semibold underline underline-offset-2 ml-1"
            >
              {showDetails ? 'Hide details' : 'Privacy details'}
            </button>
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => updateUser({ metricsEnabled: !user.metricsEnabled })}
            className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white border border-[#e2e6ef] hover:bg-gray-50 text-[#152225] transition-colors"
          >
            {user.metricsEnabled ? 'Turn metrics off' : 'Metrics are off'}
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-[#5e6978] hover:text-[#152225] rounded transition-colors"
            title="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-[#e2e6ef] text-[11px] text-[#5e6978] grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white p-2.5 rounded-lg border border-[#e2e6ef]">
            <p className="font-bold text-[#152225] mb-0.5">🔒 Zero Chat Logging</p>
            <p>Your conversations and reflections are never shared or sold. In solo practice, everything stays right inside your browser.</p>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-[#e2e6ef]">
            <p className="font-bold text-[#152225] mb-0.5">🎭 Pseudonymous Identity</p>
            <p>No real names, phone numbers, or passwords required. You choose an avatar and a temporary nickname.</p>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-[#e2e6ef]">
            <p className="font-bold text-[#152225] mb-0.5">🇺🇬 Community-Centric</p>
            <p>Designed for Uganda with localized languages, culturally grounded peer support, and a proposed fair UGX 500 day pass.</p>
          </div>
        </div>
      )}
    </aside>
  );
};
