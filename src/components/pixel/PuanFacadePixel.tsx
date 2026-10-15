import React from 'react';

export const PuanFacadePixel: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 320 200"
      className={`pixelated ${className}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Sky gradient */}
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4377a8" />
          <stop offset="60%" stopColor="#7ba5cb" />
          <stop offset="100%" stopColor="#b4d2e8" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect x="0" y="0" width="320" height="70" fill="url(#skyGrad)" />
      
      {/* Distant BA buildings silhouettes */}
      <rect x="0" y="45" width="25" height="25" fill="#6c8ca3" />
      <rect x="295" y="40" width="25" height="30" fill="#6c8ca3" />

      {/* Street power lines (authentic Buenos Aires) */}
      <line x1="0" y1="18" x2="320" y2="28" stroke="#253545" strokeWidth="1" opacity="0.6" />
      <line x1="0" y1="24" x2="320" y2="35" stroke="#253545" strokeWidth="1" opacity="0.4" />

      {/* MAIN PUÁN 480 BUILDING FACADE (Sand/Beige architectural stone) */}
      <rect x="20" y="30" width="280" height="150" fill="#c4b59b" />
      <rect x="20" y="30" width="280" height="4" fill="#dfd6c3" />
      <rect x="20" y="34" width="280" height="3" fill="#9e8e75" />

      {/* Floor Dividing Moldings */}
      <rect x="20" y="65" width="280" height="3" fill="#b0a086" />
      <rect x="20" y="102" width="280" height="3" fill="#b0a086" />
      <rect x="20" y="138" width="280" height="4" fill="#a49377" />

      {/* Mosaic Decorative Frieze Band above Ground Floor (from real photo) */}
      <rect x="20" y="142" width="280" height="4" fill="#786a55" />
      {Array.from({ length: 28 }).map((_, i) => (
        <rect key={i} x={25 + i * 10} y="143" width="4" height="2" fill="#d2cbbe" />
      ))}

      {/* 4TH FLOOR WINDOWS - Row with iconic RED LOUVER SHUTTERS */}
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={`f4-${i}`}>
          <rect x={35 + i * 32} y="42" width="22" height="18" fill="#1b2430" />
          {/* Red Louver Shutters */}
          <rect x={36 + i * 32} y="43" width="20" height="16" fill="#c0392b" />
          <line x1={40 + i * 32} y1="43" x2={40 + i * 32} y2="59" stroke="#962d22" strokeWidth="1" />
          <line x1={44 + i * 32} y1="43" x2={44 + i * 32} y2="59" stroke="#962d22" strokeWidth="1" />
          <line x1={48 + i * 32} y1="43" x2={48 + i * 32} y2="59" stroke="#962d22" strokeWidth="1" />
          <line x1={52 + i * 32} y1="43" x2={52 + i * 32} y2="59" stroke="#962d22" strokeWidth="1" />
        </g>
      ))}

      {/* 3RD FLOOR WINDOWS - Row with RED LOUVER SHUTTERS */}
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={`f3-${i}`}>
          <rect x={35 + i * 32} y="74" width="22" height="22" fill="#1b2430" />
          <rect x={36 + i * 32} y="75" width="20" height="20" fill="#c0392b" />
          <line x1={40 + i * 32} y1="75" x2={40 + i * 32} y2="95" stroke="#962d22" strokeWidth="1" />
          <line x1={44 + i * 32} y1="75" x2={44 + i * 32} y2="95" stroke="#962d22" strokeWidth="1" />
          <line x1={48 + i * 32} y1="75" x2={48 + i * 32} y2="95" stroke="#962d22" strokeWidth="1" />
          <line x1={52 + i * 32} y1="75" x2={52 + i * 32} y2="95" stroke="#962d22" strokeWidth="1" />
        </g>
      ))}

      {/* 2ND FLOOR WINDOWS */}
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={`f2-${i}`}>
          <rect x={35 + i * 32} y="110" width="22" height="22" fill="#1b2430" />
          <rect x={36 + i * 32} y="111" width="20" height="20" fill="#c0392b" />
          <line x1={40 + i * 32} y1="111" x2={40 + i * 32} y2="131" stroke="#962d22" strokeWidth="1" />
          <line x1={44 + i * 32} y1="111" x2={44 + i * 32} y2="131" stroke="#962d22" strokeWidth="1" />
          <line x1={48 + i * 32} y1="111" x2={48 + i * 32} y2="131" stroke="#962d22" strokeWidth="1" />
          <line x1={52 + i * 32} y1="111" x2={52 + i * 32} y2="131" stroke="#962d22" strokeWidth="1" />
        </g>
      ))}

      {/* GROUND FLOOR (Planta Baja) */}
      {/* Left and Right Ground Windows */}
      <rect x="35" y="152" width="50" height="28" fill="#1b2430" />
      <rect x="37" y="154" width="46" height="24" fill="#2d3b48" />
      <line x1="60" y1="154" x2="60" y2="178" stroke="#1b2430" strokeWidth="2" />

      <rect x="235" y="152" width="50" height="28" fill="#1b2430" />
      <rect x="237" y="154" width="46" height="24" fill="#2d3b48" />
      <line x1="260" y1="154" x2="260" y2="178" stroke="#1b2430" strokeWidth="2" />

      {/* FAMOUS CENTRAL ENTRANCE ARCH (El Gran Arco de Entrada de Puán 480) */}
      {/* Arch Outline & Keystones */}
      <path
        d="M 125 180 L 125 145 C 125 125 195 125 195 145 L 195 180 Z"
        fill="#222730"
      />
      {/* Outer arch decorative masonry ring */}
      <path
        d="M 121 180 L 121 144 C 121 120 199 120 199 144 L 199 180 L 195 180 L 195 145 C 195 125 125 125 125 145 L 125 180 Z"
        fill="#a49377"
      />

      {/* Interior Entrance Gate & Turnstiles */}
      <rect x="135" y="150" width="50" height="30" fill="#0d1117" />
      {/* Rolling shutter metal slats */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1="135" y1={152 + i * 3} x2="185" y2={152 + i * 3} stroke="#1f242d" strokeWidth="1" />
      ))}
      <rect x="145" y="165" width="30" height="15" fill="#f5f0d0" opacity="0.3" />

      {/* UBA Shield / Plaque above the Arch */}
      <circle cx="160" cy="120" r="5" fill="#e5dfd0" stroke="#786a55" strokeWidth="1" />
      <text x="160" y="122" fontSize="4" textAnchor="middle" fill="#2c3e50" fontFamily="monospace" fontWeight="bold">UBA</text>

      {/* Street Sign: PUÁN 480 */}
      <rect x="142" y="132" width="36" height="6" fill="#1e272e" rx="1" />
      <text x="160" y="136.5" fontSize="4" textAnchor="middle" fill="#f5cd79" fontFamily="'Press Start 2P', monospace">PUAN 480</text>

      {/* Sidewalk & Asphalt Street */}
      <rect x="0" y="180" width="320" height="6" fill="#95a5a6" />
      <rect x="0" y="186" width="320" height="14" fill="#34495e" />
      <line x1="0" y1="180" x2="320" y2="180" stroke="#7f8c8d" strokeWidth="1" />

      {/* Street Tree on the Left (from real photo) */}
      <rect x="12" y="70" width="8" height="110" fill="#4a3728" />
      {/* Leaves Cluster */}
      <circle cx="16" cy="65" r="24" fill="#2d5a27" />
      <circle cx="28" cy="55" r="18" fill="#38761d" />
      <circle cx="6" cy="58" r="16" fill="#274e13" />
      <circle cx="20" cy="40" r="14" fill="#4e9a30" />

      {/* Street Tree on the Right */}
      <rect x="290" y="90" width="6" height="90" fill="#4a3728" />
      <circle cx="295" cy="85" r="20" fill="#2d5a27" />
      <circle cx="305" cy="75" r="16" fill="#38761d" />

      {/* Student Folding Table with Flyers (Mesa de Agrupación afuera) */}
      <rect x="105" y="172" width="16" height="8" fill="#c0392b" />
      <rect x="107" y="171" width="5" height="1" fill="#ecf0f1" />
      <rect x="114" y="171" width="4" height="1" fill="#f1c40f" />
      <line x1="107" y1="180" x2="107" y2="172" stroke="#2c3e50" strokeWidth="1" />
      <line x1="119" y1="180" x2="119" y2="172" stroke="#2c3e50" strokeWidth="1" />

      {/* Lamp Post with street light */}
      <line x1="210" y1="180" x2="210" y2="20" stroke="#2c3e50" strokeWidth="2" />
      <path d="M 210 25 L 225 15" stroke="#2c3e50" strokeWidth="2" />
      <rect x="223" y="14" width="8" height="4" fill="#f39c12" />
    </svg>
  );
};
