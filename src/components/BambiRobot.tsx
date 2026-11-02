import React from 'react';

interface BambiRobotProps {
  size?: number | string;
  className?: string;
  animated?: boolean;
}

export const BambiRobot: React.FC<BambiRobotProps> = ({ 
  size = 180, 
  className = '', 
  animated = true 
}) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none ${animated ? 'animate-float' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Background Soft Glow */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#dcd1ff] via-[#f3efff] to-[#ffccd5] blur-xl opacity-70 -z-10" />

      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg"
      >
        <defs>
          {/* Head & Body Gradients */}
          <linearGradient id="robotWhite" x1="60" y1="40" x2="180" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.85" stopColor="#E6ECF5" />
            <stop offset="1" stopColor="#D2DBEA" />
          </linearGradient>

          {/* Screen Face */}
          <linearGradient id="faceScreen" x1="70" y1="50" x2="170" y2="130" gradientUnits="userSpaceOnUse">
            <stop stopColor="#151A26" />
            <stop offset="1" stopColor="#0A0E17" />
          </linearGradient>

          {/* Purple Headphones */}
          <linearGradient id="headphonePurple" x1="20" y1="60" x2="220" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9333EA" />
            <stop offset="0.5" stopColor="#7E22CE" />
            <stop offset="1" stopColor="#6B21A8" />
          </linearGradient>

          {/* Cyan Glow Rings */}
          <linearGradient id="cyanNeon" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#38BDF8" />
            <stop offset="1" stopColor="#818CF8" />
          </linearGradient>

          {/* Glowing Heart */}
          <linearGradient id="heartPink" x1="90" y1="130" x2="150" y2="190" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F472B6" />
            <stop offset="0.5" stopColor="#EC4899" />
            <stop offset="1" stopColor="#A855F7" />
          </linearGradient>

          {/* Soft Shadow Filter */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="heartGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Headphone Arch */}
        <path
          d="M48 95C48 55 78 30 120 30C162 30 192 55 192 95"
          stroke="url(#headphonePurple)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M50 95C50 58 79 35 120 35C161 35 190 58 190 95"
          stroke="#C084FC"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Robot Torso / Body */}
        <rect
          x="75"
          y="135"
          width="90"
          height="80"
          rx="32"
          fill="url(#robotWhite)"
          stroke="#CBD5E1"
          strokeWidth="2.5"
        />

        {/* Robot Head */}
        <rect
          x="55"
          y="42"
          width="130"
          height="100"
          rx="44"
          fill="url(#robotWhite)"
          stroke="#CBD5E1"
          strokeWidth="3"
        />

        {/* Head Highlight */}
        <path
          d="M75 52C85 47 110 46 135 47C150 48 160 52 165 55"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Dark Screen Face */}
        <rect
          x="68"
          y="54"
          width="104"
          height="76"
          rx="32"
          fill="url(#faceScreen)"
        />

        {/* Joyful Eyes (Curved Glowing Arcs) */}
        <path
          d="M86 86C86 78 94 72 102 76"
          stroke="#38BDF8"
          strokeWidth="4.5"
          strokeLinecap="round"
          filter="url(#softGlow)"
        />
        <path
          d="M138 76C146 72 154 78 154 86"
          stroke="#38BDF8"
          strokeWidth="4.5"
          strokeLinecap="round"
          filter="url(#softGlow)"
        />

        {/* Blushing Cheeks */}
        <ellipse cx="88" cy="98" rx="7" ry="4" fill="#F472B6" opacity="0.65" />
        <ellipse cx="152" cy="98" rx="7" ry="4" fill="#F472B6" opacity="0.65" />

        {/* Sweet Smiling Mouth */}
        <path
          d="M112 96C116 102 124 102 128 96"
          stroke="#38BDF8"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Left Headphone Ear Cup */}
        <g>
          <rect
            x="32"
            y="70"
            width="22"
            height="50"
            rx="11"
            fill="url(#headphonePurple)"
            stroke="#581C87"
            strokeWidth="2"
          />
          <circle cx="43" cy="95" r="7" fill="url(#cyanNeon)" opacity="0.9" />
          <circle cx="43" cy="95" r="4" fill="#FFFFFF" />
        </g>

        {/* Right Headphone Ear Cup */}
        <g>
          <rect
            x="186"
            y="70"
            width="22"
            height="50"
            rx="11"
            fill="url(#headphonePurple)"
            stroke="#581C87"
            strokeWidth="2"
          />
          <circle cx="197" cy="95" r="7" fill="url(#cyanNeon)" opacity="0.9" />
          <circle cx="197" cy="95" r="4" fill="#FFFFFF" />
        </g>

        {/* Arms Holding Heart */}
        <path
          d="M75 160C75 178 88 190 102 184"
          stroke="url(#robotWhite)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d="M165 160C165 178 152 190 138 184"
          stroke="url(#robotWhite)"
          strokeWidth="16"
          strokeLinecap="round"
        />

        {/* Glowing Radiant 3D Heart */}
        <g filter="url(#heartGlow)">
          <path
            d="M120 188C120 188 95 170 95 152C95 141 103 134 113 134C118 134 120 137 120 137C120 137 122 134 127 134C137 134 145 141 145 152C145 170 120 188 120 188Z"
            fill="url(#heartPink)"
          />
          {/* Heart Sheen */}
          <path
            d="M103 140C100 142 98 147 98 152"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>

        {/* Little Floating Decorative Hearts */}
        <path
          d="M196 46C196 46 189 40 189 34C189 30 192 27 195 27C196 27 196 28 196 28C196 28 197 27 198 27C201 27 204 30 204 34C204 40 196 46 196 46Z"
          fill="#C084FC"
          opacity="0.8"
        />
        <path
          d="M40 148C40 148 35 143 35 138C35 135 37 133 39 133C40 133 40 134 40 134C40 134 41 133 42 133C44 133 46 135 46 138C46 143 40 148 40 148Z"
          fill="#F472B6"
          opacity="0.8"
        />
      </svg>
    </div>
  );
};
