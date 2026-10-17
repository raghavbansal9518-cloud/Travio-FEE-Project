import { useId } from 'react';

const artwork = {
  'mountain-explorer': <g>
    <circle cx="60" cy="51" r="21" fill="#67d4ff" opacity=".4" />
    <path d="m20 89 27-43 13 19 11-15 30 39H20Z" fill="#e8f7ff" />
    <path d="m20 89 27-43 10 17-6-2-5 7-5-2-4 7-5-1-5 8-7-1Z" fill="#5daeff" />
    <path d="m49 64 11-14 30 39-13-2-5-5-7 2-7-9-6 1Z" fill="#79d4a2" />
    <path d="m18 91 25-11 17 8 17-7 24 10v8H18Z" fill="#246f58" />
    <path d="m44 47 4-8 4 8M72 51l3-6 3 6" fill="none" stroke="#fff" strokeWidth="2" />
  </g>,
  'city-wanderer': <g>
    <circle cx="87" cy="38" r="12" fill="#ffd178" />
    <path d="M24 91h73v8H24Z" fill="#ffe1a5" />
    <path d="m53 45 7-12 7 12 4 45H49Z" fill="#ffb95f" />
    <path d="m24 64 18-15 17 15v27H24ZM72 59l12-10 13 10v32H72Z" fill="#526de0" />
    <path d="M57 46h6M56 56h8M55 67h10M55 78h10" stroke="#fff4db" strokeWidth="2" />
    <path d="M30 70h5v7h-5m9-7h5v7h-5m31-2h5v7h-5m13-13h5v7h-5" fill="#ffde8b" />
    <path d="m52 47 8-14 8 14" fill="none" stroke="#fff0c0" strokeWidth="2" />
  </g>,
  'beach-lover': <g>
    <circle cx="87" cy="38" r="13" fill="#ffe276" />
    <path d="M19 72q18-12 35 0t35 0q10-6 17 0v21H19Z" fill="#30d4d2" />
    <path d="M19 83q18-10 35 0t35 0q10-6 17 0v12H19Z" fill="#198eb0" />
    <path d="M20 94q27-18 51-4t35 2v9H20Z" fill="#f4c86b" />
    <path d="M48 81q5-28 3-43" stroke="#8e542e" strokeWidth="4" fill="none" />
    <path d="M50 43Q32 40 27 29q17-3 24 13Q51 28 66 25q-2 14-15 20 15-10 27-4-9 12-28 7" fill="#4cda92" stroke="#afffc3" strokeWidth="1.5" />
    <path d="M30 89q8-5 16 0m28 2q8-5 16 0" stroke="#fff0ba" strokeWidth="2" />
  </g>,
  'cultural-traveller': <g>
    <path d="M36 51h48v38H36Z" fill="#e45c9f" />
    <path d="M31 50h58v7H31Zm5-11h48l8 9H28Z" fill="#ffbd72" />
    <path d="M53 37q7-16 14 0l-2 3h-10Z" fill="#ffc85d" />
    <path d="M43 62h8v13h-8m26-13h8v13h-8" fill="#ffe6ae" />
    <path d="M56 65h9v24h-9Z" fill="#7140a1" />
    <path d="M25 44q-8-8-3-16 10 3 10 13m55 1q9-11 15-7-2 11-13 13" fill="#ff9bc9" />
    <circle cx="29" cy="35" r="4" fill="#ffe8f6" /><circle cx="91" cy="39" r="4" fill="#ffe8f6" />
    <path d="M30 94h59" stroke="#ffdf9d" strokeWidth="3" />
  </g>,
  'first-adventure': <g>
    <circle cx="60" cy="63" r="31" fill="#244a9b" stroke="#ffd65e" strokeWidth="5" />
    <circle cx="60" cy="63" r="23" fill="none" stroke="#a9caff" strokeWidth="2" />
    <path d="m60 38 7 21 18 4-18 5-7 18-6-18-18-5 18-4Z" fill="#ffe16a" stroke="#fff3b4" strokeWidth="2" />
    <circle cx="60" cy="63" r="4" fill="#fff" />
    <path d="m60 30 5 7h-10Zm0 66-5-7h10ZM27 63l7-5v10Zm66 0-7 5V58Z" fill="#ffe07a" />
  </g>,
  'global-explorer': <g>
    <circle cx="60" cy="64" r="32" fill="#35cfa7" stroke="#ffe074" strokeWidth="4" />
    <path d="M28 64h64M60 32q-18 14 0 32-18 20 0 32M60 32q18 14 0 32 18 20 0 32" fill="none" stroke="#e7fff0" strokeWidth="2.5" />
    <path d="m37 49 8-6 5 3-2 5 5 4-3 6-8-1-5-5Zm28-10 8 3 1 6-5 4-6-2-2-7Zm2 32 9-3 7 6-3 7-9 2-5-6Z" fill="#fedb63" />
    <path d="M48 88q12 7 24 0" fill="none" stroke="#d8fbff" strokeWidth="2" />
  </g>,
  'photo-master': <g>
    <path d="M28 49h17l5-8h20l6 8h16q5 0 5 6v32q0 6-6 6H29q-6 0-6-6V55q0-6 5-6Z" fill="#596eff" stroke="#c6ceff" strokeWidth="3" />
    <circle cx="59" cy="68" r="17" fill="#15294f" stroke="#ffce64" strokeWidth="5" />
    <circle cx="59" cy="68" r="9" fill="#72d8ff" />
    <circle cx="59" cy="68" r="4" fill="#153a65" />
    <path d="M77 57h9m-53 0h5m-3 30h10m25 0h10" stroke="#fff" strokeWidth="2" />
    <path d="m45 37 5-5 5 5m14 0 5-5 5 5" fill="none" stroke="#ffe17b" strokeWidth="2" />
  </g>,
  'adventure-seeker': <g>
    <path d="m38 47 11-8h22l12 8 6 42-9 8H39l-9-8Z" fill="#ef804c" stroke="#ffd16a" strokeWidth="3" />
    <path d="M49 40v-7h22v7M36 57h48v24H36Z" fill="#bd4d57" />
    <path d="M50 57h20v18H50Z" fill="#375d83" stroke="#ffe19a" strokeWidth="2" />
    <path d="m48 49 12-6 13 6M60 58v16" fill="none" stroke="#ffd273" strokeWidth="3" />
    <path d="m28 63-8 6 8 6m64-12 8 6-8 6" fill="none" stroke="#a8ebff" strokeWidth="3" />
    <path d="m56 86 4-7 4 7-4 7Z" fill="#fff1a6" />
  </g>,
  foodie: <g>
    <path d="M31 60h58q-2 29-29 31-27-2-29-31Z" fill="#f6a84c" stroke="#ffe08b" strokeWidth="3" />
    <path d="M34 58q8-9 14-1 8-14 16-1 9-13 17-1 6-7 10 2Z" fill="#72d681" />
    <path d="M38 62q10 7 20 0t23 1" stroke="#df5c58" strokeWidth="5" fill="none" />
    <circle cx="48" cy="55" r="4" fill="#ffe667" /><circle cx="71" cy="55" r="4" fill="#ff7771" />
    <path d="M28 93h64" stroke="#b57953" strokeWidth="4" />
    <path d="M41 43q-7-8-1-12m12 12q-6-9 0-14m12 14q-4-8 3-13m11 13q-3-8 4-11" fill="none" stroke="#ffe2b5" strokeWidth="2" />
  </g>,
  'frequent-traveller': <g>
    <path d="m22 62 27-5 8-20q3-7 7 0l8 20 27 5-2 7-27 1-5 17-6 5-5-5-5-17-27-1Z" fill="#edf2ff" stroke="#9bb5ff" strokeWidth="3" />
    <path d="m60 51 5 18-5 14-5-14Z" fill="#6f7fff" />
    <path d="M29 58 20 48l16 6m55 4 9-10-16 6" fill="#ffce69" stroke="#fff0ae" strokeWidth="2" />
    <path d="m35 39-5-5m59 5 5-5M60 28v-7" stroke="#ffe17d" strokeWidth="2" />
    <circle cx="60" cy="64" r="5" fill="#ffe376" />
  </g>,
  'winter-voyager': <g>
    <path d="M60 36v58M35 50l50 29M35 79l50-29" stroke="#e7f7ff" strokeWidth="6" strokeLinecap="round" />
    <path d="m60 36-6 8m6-8 6 8M60 94l-6-8m6 8 6-8M35 50l10 1m-10-1 4 9m46-9-10 1m10-1-4 9M35 79l10-1m-10 1 4-9m46 9-10-1m10 1-4-9" stroke="#e7f7ff" strokeWidth="4" strokeLinecap="round" />
    <circle cx="60" cy="65" r="9" fill="#9de1ff" stroke="#fff" strokeWidth="3" />
    <path d="M31 44 28 40m61 0-3 4M40 93l-4 4m48-4 4 4" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
  </g>,
  'desert-nomad': <g>
    <circle cx="83" cy="43" r="13" fill="#ffd56e" />
    <path d="M19 75q22-20 43-5 18 12 39-2v29H19Z" fill="#d58455" />
    <path d="M19 85q24-13 42-3 19 10 40-4v19H19Z" fill="#f4bd67" />
    <path d="M54 84V58q0-8 6-8t6 8v8h6V57q0-6 5-6t5 6v30" fill="none" stroke="#4caa6e" strokeWidth="7" strokeLinecap="round" />
    <path d="M54 66H45q-7 0-7-8t-6-7m39 17h9q7 0 7-8t6-7" fill="none" stroke="#4caa6e" strokeWidth="6" strokeLinecap="round" />
    <path d="M30 89q8-4 17 0m33 4q8-4 16 0" stroke="#ffe0a0" strokeWidth="2" />
  </g>,
  'forest-trekker': <g>
    <path d="m27 91 16-32 9 13 10-24 11 24 9-13 15 32Z" fill="#42bd79" stroke="#a8f1bc" strokeWidth="2" />
    <path d="m37 74 7-14 7 14m12 5 9-24 9 24m7 3 7-15 7 15" fill="#297e69" />
    <path d="M57 91V72h7v19" fill="#8f5b49" />
    <path d="M19 94q17-9 33-1t31 0q10-5 18 0" fill="none" stroke="#85d7a6" strokeWidth="4" />
    <circle cx="35" cy="45" r="4" fill="#ffe071" /><circle cx="84" cy="43" r="3" fill="#fff" />
  </g>,
  'island-hopper': <g>
    <circle cx="85" cy="39" r="12" fill="#ffdc79" />
    <path d="M19 78q17-10 34 0t34 0q9-5 14 0v16H19Z" fill="#39d5d1" />
    <path d="M19 87q17-7 34 1t34 0q9-4 14 0v9H19Z" fill="#2085ad" />
    <path d="M34 83q22-14 43 0v12H34Z" fill="#f4ce74" />
    <path d="M61 81q4-25 3-39" stroke="#865533" strokeWidth="4" fill="none" />
    <path d="M64 44Q46 41 42 31q15-3 22 13-1-14 13-18-1 14-13 20 14-9 24-3-8 11-24 7" fill="#4cdb8e" />
    <path d="M24 68h15m43 5h17" stroke="#b5f8ff" strokeWidth="2" />
  </g>,
  'volcano-conqueror': <g>
    <path d="m24 92 19-27 12-3 10-18 12 19 19 29Z" fill="#4b314f" stroke="#d191f2" strokeWidth="2" />
    <path d="m55 63 10-19 12 19-10-4-5 5Z" fill="#ffb340" />
    <path d="m64 60 7-13 8 14-8-3Z" fill="#ff624f" />
    <path d="M71 45q-7-10 0-16 3 7 8 9 4 6-1 11" fill="#ff8a43" />
    <path d="M35 90q12-10 26 0t28 0" fill="none" stroke="#ff693d" strokeWidth="5" />
    <circle cx="34" cy="48" r="3" fill="#ffd269" /><circle cx="88" cy="43" r="4" fill="#ff8c4d" />
  </g>,
  storyteller: <g>
    <path d="M28 45c10-6 22-5 32 3 10-8 22-9 32-3v45c-10-6-22-5-32 3-10-8-22-9-32-3Z" fill="#7c3aed" stroke="#c084fc" strokeWidth="2.5" />
    <path d="M60 48v45" stroke="#e9d5ff" strokeWidth="2" strokeDasharray="2 2" />
    <path d="M34 56h18M34 64h18M34 72h14M68 56h18M68 64h18M68 72h12" stroke="#f3e8ff" strokeWidth="2" strokeLinecap="round" />
    <circle cx="88" cy="40" r="10" fill="#ffd451" />
    <path d="m88 34 2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1Z" fill="#fff" />
  </g>,
  'wishlist-dreamer': <g>
    <circle cx="60" cy="62" r="28" fill="#881337" opacity=".4" />
    <path d="M60 84s-24-15-24-28a12 12 0 0 1 21-8l3 3 3-3a12 12 0 0 1 21 8c0 13-24 28-24 28Z" fill="#f43f5e" stroke="#fda4af" strokeWidth="3" />
    <circle cx="48" cy="50" r="3" fill="#ffe4e6" opacity=".8" />
    <path d="m30 36 2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1Zm58 6 1.5 3 3 1-2.5 2.5 1 3-3-1.5-3 1.5 1-3-2.5-2.5 3-1Z" fill="#ffd54f" />
  </g>,
  'master-packer': <g>
    <rect x="34" y="42" width="52" height="48" rx="8" fill="#0284c7" stroke="#7dd3fc" strokeWidth="3" />
    <path d="M48 42V35a6 6 0 0 1 12 0v7M60 35v7" stroke="#e0f2fe" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M34 58h52M45 42v48M75 42v48" stroke="#38bdf8" strokeWidth="2.5" />
    <circle cx="60" cy="58" r="4" fill="#fbbf24" stroke="#fff" strokeWidth="1.5" />
    <path d="M52 74l6 6 12-12" fill="none" stroke="#4ade80" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </g>
};

export default function BadgeArtwork({ badgeId, locked = false, className = '' }) {
  const rawId = useId().replace(/:/g, '');
  const gradientId = `badge-gradient-${rawId}`;
  const rimId = `badge-rim-${rawId}`;
  return (
    <svg
      className={`badge-art ${locked ? 'badge-art--locked' : ''} ${className}`.trim()}
      viewBox="0 0 120 130"
      role="img"
      aria-label={`${badgeId.replace(/-/g, ' ')} badge illustration${locked ? ', locked' : ''}`}
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1d5a9a" />
          <stop offset=".55" stopColor="#232c72" />
          <stop offset="1" stopColor="#171b47" />
        </linearGradient>
        <linearGradient id={rimId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff1a1" />
          <stop offset=".45" stopColor="#ffba4d" />
          <stop offset="1" stopColor="#e756ae" />
        </linearGradient>
      </defs>
      <path d="M60 5 108 28 101 84 60 122 19 84 12 28Z" fill="#080b22" opacity=".72" transform="translate(0 4)" />
      <path d="M60 4 107 27 100 82 60 118 20 82 13 27Z" fill={`url(#${rimId})`} stroke="#fff2b0" strokeWidth="2" />
      <path d="M60 10 100 30 94 78 60 108 26 78 20 30Z" fill={`url(#${gradientId})`} stroke="#98ceff" strokeWidth="2" />
      <path d="M60 13 96 32 91 76 60 103 29 76 24 32Z" fill="#112548" opacity=".45" />
      {artwork[badgeId] || artwork['first-adventure']}
      <path d="m31 25 3-6 3 6m46 0 3-6 3 6" fill="#fff2a0" />
      <path d="M41 110h38" stroke="#ffe28a" strokeWidth="3" strokeLinecap="round" opacity=".9" />
    </svg>
  );
}
