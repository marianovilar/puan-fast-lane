import React from 'react';

export const PuanPatioPixel: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 320 200"
      className={`pixelated ${className}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="patioSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6488a4" />
          <stop offset="60%" stopColor="#96b6cf" />
          <stop offset="100%" stopColor="#cfdfeb" />
        </linearGradient>
      </defs>

      {/* Sky between buildings */}
      <rect x="0" y="0" width="320" height="90" fill="url(#patioSky)" />

      {/* Left Wing Building (Pabellón izquierdo) */}
      <rect x="0" y="20" width="105" height="150" fill="#a89a83" />
      <rect x="0" y="20" width="105" height="4" fill="#beb19b" />
      {/* Left wing windows */}
      <rect x="15" y="35" width="22" height="24" fill="#202c39" />
      <rect x="55" y="35" width="22" height="24" fill="#202c39" />
      <rect x="15" y="75" width="22" height="24" fill="#202c39" />
      <rect x="55" y="75" width="22" height="24" fill="#202c39" />

      {/* Right Wing Building (Pabellón derecho) */}
      <rect x="235" y="10" width="85" height="160" fill="#a89a83" />
      <rect x="235" y="10" width="85" height="4" fill="#beb19b" />
      {/* Right wing vertical windows */}
      <rect x="250" y="25" width="16" height="35" fill="#202c39" />
      <rect x="280" y="25" width="16" height="35" fill="#202c39" />
      <rect x="250" y="75" width="16" height="40" fill="#202c39" />
      <rect x="280" y="75" width="16" height="40" fill="#202c39" />

      {/* THE FAMOUS CYLINDRICAL GLASS TOWER (Torre de vidrio de Puán) */}
      <rect x="110" y="20" width="90" height="120" fill="#4a6572" rx="4" />
      <rect x="115" y="20" width="80" height="120" fill="#759da8" rx="3" />
      {/* Curved glass vertical ribs */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={`rib-${i}`}
          x1={115 + i * 10}
          y1="20"
          x2={115 + i * 10}
          y2="140"
          stroke="#34495e"
          strokeWidth="1.5"
        />
      ))}
      {/* Glass horizontal floors/mullions */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`floor-${i}`}
          x1="110"
          y1={30 + i * 14}
          x2="200"
          y2={30 + i * 14}
          stroke="#2c3e50"
          strokeWidth="2"
        />
      ))}
      {/* Glass highlights */}
      <path d="M 125 25 L 140 140" stroke="#ffffff" strokeWidth="2" opacity="0.3" />
      <path d="M 155 25 L 170 140" stroke="#ffffff" strokeWidth="2" opacity="0.3" />

      {/* TRIANGULAR METAL PERGOLA / CANOPY (from real photo) */}
      {/* Roof truss framework connecting to hall */}
      <polygon points="10,95 130,95 130,120 10,110" fill="#1b2430" opacity="0.85" />
      {/* Truss crossbars */}
      <line x1="10" y1="95" x2="130" y2="120" stroke="#34495e" strokeWidth="1.5" />
      <line x1="10" y1="110" x2="130" y2="95" stroke="#34495e" strokeWidth="1.5" />
      <line x1="30" y1="95" x2="50" y2="114" stroke="#34495e" strokeWidth="1.5" />
      <line x1="70" y1="95" x2="90" y2="117" stroke="#34495e" strokeWidth="1.5" />
      {/* Support steel columns */}
      <rect x="12" y="110" width="4" height="45" fill="#111722" />
      <rect x="70" y="115" width="4" height="40" fill="#111722" />
      <rect x="126" y="120" width="4" height="35" fill="#111722" />

      {/* Buffet Doorway with warm yellow glow & sign */}
      <rect x="24" y="116" width="30" height="29" fill="#151b24" />
      <rect x="26" y="119" width="26" height="26" fill="#f39c12" opacity="0.35" />
      <rect x="22" y="112" width="34" height="6" fill="#1e272e" rx="1" />
      <text x="39" y="116.5" fontSize="3.5" textAnchor="middle" fill="#f1c40f" fontFamily="'Press Start 2P', monospace">BUFFET</text>

      {/* COURTYARD GROUND PAVEMENT (Baldosas de cemento de Puán) */}
      <rect x="0" y="145" width="320" height="55" fill="#b8af9e" />
      <line x1="0" y1="145" x2="320" y2="145" stroke="#8d8170" strokeWidth="2" />
      {/* Grid of square pavement slabs */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={`pv-${i}`} x1={i * 45} y1="145" x2={i * 45} y2="200" stroke="#a49a88" strokeWidth="1" />
      ))}
      <line x1="0" y1="165" x2="320" y2="165" stroke="#a49a88" strokeWidth="1" />
      <line x1="0" y1="185" x2="320" y2="185" stroke="#a49a88" strokeWidth="1" />

      {/* CENTRAL SQUARE PLANTER & ICONIC TALL PINE TREE */}
      {/* Concrete Planter Box */}
      <rect x="180" y="140" width="55" height="18" fill="#786c5a" />
      <rect x="180" y="140" width="55" height="3" fill="#998b76" />
      <rect x="183" y="143" width="49" height="12" fill="#3e2723" />

      {/* The Tall Pine Tree Trunk */}
      <rect x="202" y="55" width="8" height="90" fill="#4e342e" />
      {/* Pine Needle Clusters (rising high against the glass tower) */}
      <polygon points="206,15 185,55 227,55" fill="#1b4d2e" />
      <polygon points="206,35 180,80 232,80" fill="#2d5a27" />
      <polygon points="206,60 175,110 237,110" fill="#1e4620" />
      <polygon points="206,85 170,135 242,135" fill="#2a5223" />

      {/* FAMOUS CURVED CONCRETE BENCHES (Bancos de cemento con stencils) */}
      {/* Foreground Left Bench */}
      <rect x="35" y="158" width="80" height="18" rx="4" fill="#6d7a71" />
      <rect x="35" y="158" width="80" height="4" rx="2" fill="#88978c" />
      <rect x="42" y="176" width="10" height="12" fill="#4d5750" />
      <rect x="98" y="176" width="10" height="12" fill="#4d5750" />
      {/* Graffiti/Stencil on the bench */}
      <text x="45" y="171" fontSize="5" fill="#e74c3c" fontFamily="monospace" fontWeight="bold">CEFyL</text>
      <circle cx="75" cy="168" r="3" fill="#ffffff" opacity="0.6" />
      <text x="82" y="171" fontSize="5" fill="#f1c40f" fontFamily="monospace">UBA</text>

      {/* Right Background Bench */}
      <rect x="245" y="150" width="60" height="14" rx="3" fill="#7d8a81" />
      <rect x="245" y="150" width="60" height="3" rx="1" fill="#98a79c" />
      <rect x="250" y="164" width="8" height="10" fill="#58635c" />
      <rect x="290" y="164" width="8" height="10" fill="#58635c" />

      {/* Mate & Backpack on bench */}
      {/* Backpack */}
      <rect x="100" y="152" width="10" height="10" rx="2" fill="#2980b9" />
      {/* Mate gourd & bombilla */}
      <circle cx="70" cy="155" r="3" fill="#5d4037" />
      <line x1="71" y1="155" x2="74" y2="149" stroke="#bdc3c7" strokeWidth="1" />

      {/* Banner / Poster on left wall */}
      <rect x="5" y="80" width="22" height="12" fill="#e74c3c" />
      <text x="7" y="88" fontSize="3" fill="#ffffff" fontFamily="'Press Start 2P', monospace">PARO</text>
    </svg>
  );
};
