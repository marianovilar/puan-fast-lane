import React from 'react';

export const CasaPixel: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 320 200"
      className={`pixelated ${className}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Room Walls at Twilight / Evening */}
      <rect x="0" y="0" width="320" height="200" fill="#1e1822" />
      <rect x="0" y="0" width="320" height="150" fill="#292030" />

      {/* Window showing Buenos Aires rooftops at dusk */}
      <rect x="180" y="20" width="85" height="70" fill="#151b29" />
      <rect x="182" y="22" width="81" height="66" fill="#1a233a" />
      {/* Sunset sky gradient */}
      <rect x="182" y="22" width="81" height="35" fill="#e67e22" opacity="0.4" />
      <rect x="182" y="57" width="81" height="31" fill="#8e44ad" opacity="0.3" />
      {/* Distant building silhouettes & antenna */}
      <rect x="190" y="60" width="20" height="28" fill="#0d1117" />
      <rect x="220" y="50" width="25" height="38" fill="#0d1117" />
      <line x1="232" y1="50" x2="232" y2="35" stroke="#0d1117" strokeWidth="1" />
      {/* Window wooden frame */}
      <line x1="222" y1="22" x2="222" y2="88" stroke="#3e2723" strokeWidth="2" />
      <line x1="182" y1="55" x2="263" y2="55" stroke="#3e2723" strokeWidth="2" />

      {/* Wooden Floor Planks */}
      <rect x="0" y="150" width="320" height="50" fill="#4a2e1b" />
      <line x1="0" y1="150" x2="320" y2="150" stroke="#361f10" strokeWidth="2" />
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={`plank-${i}`} x1={i * 45} y1="150" x2={i * 45} y2="200" stroke="#361f10" strokeWidth="1" />
      ))}

      {/* Student Bed with Pillow and Blanket */}
      <rect x="25" y="125" width="115" height="40" fill="#2c3e50" rx="3" />
      {/* Mattress base */}
      <rect x="20" y="145" width="125" height="15" fill="#5d4037" />
      {/* Blanket (blue/grey) */}
      <rect x="55" y="125" width="90" height="30" fill="#34495e" rx="2" />
      <rect x="60" y="130" width="80" height="8" fill="#415b76" />
      {/* Fluffy Pillow */}
      <rect x="25" y="122" width="28" height="16" rx="4" fill="#ecf0f1" />
      <rect x="28" y="125" width="22" height="10" rx="2" fill="#bdc3c7" />

      {/* Nightstand with Table Fan & Stack of Cátedra Photocopies */}
      <rect x="150" y="135" width="28" height="28" fill="#6d4c41" />
      {/* Photocopies on floor */}
      <rect x="30" y="170" width="20" height="6" fill="#f5f6fa" />
      <rect x="32" y="167" width="18" height="4" fill="#dcdde1" />
      <rect x="55" y="172" width="22" height="6" fill="#f5cd79" />

      {/* Gas Stove with Metal Pava (Kettle) & Mate */}
      <rect x="270" y="135" width="35" height="35" fill="#7f8c8d" />
      <rect x="272" y="137" width="31" height="10" fill="#34495e" />
      {/* Pava / Kettle */}
      <path d="M 280 135 L 292 135 L 290 125 L 282 125 Z" fill="#bdc3c7" />
      <line x1="281" y1="125" x2="277" y2="128" stroke="#bdc3c7" strokeWidth="2" />
      <path d="M 283 125 C 283 120 289 120 289 125" stroke="#2c3e50" strokeWidth="1.5" fill="none" />
      {/* Mate gourd with bombilla */}
      <circle cx="295" cy="148" r="4" fill="#5d4037" />
      <line x1="296" y1="148" x2="300" y2="140" stroke="#bdc3c7" strokeWidth="1.5" />

      {/* Poster on Wall: Rock Nacional / Cine Arte */}
      <rect x="40" y="30" width="35" height="45" fill="#c0392b" />
      <rect x="42" y="32" width="31" height="35" fill="#1e272e" />
      <circle cx="57" cy="48" r="10" fill="#f1c40f" opacity="0.6" />
      <text x="57" y="73" fontSize="4" textAnchor="middle" fill="#ffffff" fontFamily="monospace">CHARLY</text>

      {/* Sign: CASA / REFUGIO */}
      <rect x="100" y="4" width="120" height="10" fill="#2c2233" rx="2" />
      <text x="160" y="11" fontSize="4.5" textAnchor="middle" fill="#e056fd" fontFamily="'Press Start 2P', monospace">
        CASA / PENSIÓN
      </text>
    </svg>
  );
};
