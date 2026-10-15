import React from 'react';

export const InstitutoPixel: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 320 200"
      className={`pixelated ${className}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Floor 5 Wall & Window */}
      <rect x="0" y="0" width="320" height="200" fill="#1e272e" />
      <rect x="0" y="0" width="320" height="145" fill="#2c3e50" />

      {/* High Window overlooking Buenos Aires roofs */}
      <rect x="35" y="15" width="65" height="55" fill="#487eb0" />
      <rect x="37" y="17" width="61" height="51" fill="#718093" />
      {/* Window panes */}
      <line x1="68" y1="17" x2="68" y2="68" stroke="#2c3e50" strokeWidth="2" />
      <line x1="37" y1="42" x2="98" y2="42" stroke="#2c3e50" strokeWidth="2" />

      {/* Diploma and Academic Degrees Framed on Wall */}
      <rect x="140" y="20" width="38" height="26" fill="#d4af37" />
      <rect x="143" y="23" width="32" height="20" fill="#f5f6fa" />
      <rect x="148" y="27" width="22" height="3" fill="#2f3640" />
      <rect x="153" y="33" width="12" height="2" fill="#718093" />
      <circle cx="159" cy="38" r="2" fill="#c23616" />

      {/* Archival Boxes on Shelves (Cajas de archivo CONICET) */}
      <rect x="215" y="15" width="85" height="130" fill="#353b48" />
      <rect x="218" y="18" width="79" height="124" fill="#2f3640" />
      {Array.from({ length: 3 }).map((_, shelf) => (
        <g key={`arch-shelf-${shelf}`}>
          <rect x="218" y={55 + shelf * 38} width="79" height="3" fill="#718093" />
          {/* Cardboard boxes */}
          <rect x="222" y={25 + shelf * 38} width="22" height="28" fill="#dcdde1" />
          <rect x="225" y={32 + shelf * 38} width="16" height="5" fill="#e84118" />
          <rect x="248" y={25 + shelf * 38} width="22" height="28" fill="#f5cd79" />
          <rect x="251" y={32 + shelf * 38} width="16" height="5" fill="#2f3640" />
          <rect x="274" y={25 + shelf * 38} width="18" height="28" fill="#dcdde1" />
        </g>
      ))}

      {/* Wooden Desk with 90s PC / Microfilm Terminal */}
      <rect x="20" y="125" width="180" height="40" fill="#7f8c8d" />
      <rect x="16" y="122" width="188" height="6" fill="#95a5a6" />
      <rect x="25" y="165" width="10" height="30" fill="#57606f" />
      <rect x="180" y="165" width="10" height="30" fill="#57606f" />

      {/* Floor */}
      <rect x="0" y="155" width="320" height="45" fill="#2f3542" />
      <line x1="0" y1="155" x2="320" y2="155" stroke="#57606f" strokeWidth="2" />

      {/* Vintage 1990 CRT Computer / Microfilm Terminal (con pantalla ámbar) */}
      <rect x="60" y="85" width="38" height="32" fill="#dcdde1" rx="2" />
      <rect x="64" y="89" width="30" height="24" fill="#1e272e" rx="1" />
      {/* Amber Glowing Phosphor Screen */}
      <rect x="66" y="91" width="26" height="20" fill="#f39c12" opacity="0.85" rx="1" />
      <line x1="68" y1="96" x2="88" y2="96" stroke="#2c3e50" strokeWidth="1" />
      <line x1="68" y1="100" x2="84" y2="100" stroke="#2c3e50" strokeWidth="1" />
      <line x1="68" y1="104" x2="90" y2="104" stroke="#2c3e50" strokeWidth="1" />
      {/* Computer base & keyboard */}
      <rect x="72" y="117" width="14" height="5" fill="#bdc3c7" />
      <rect x="58" y="122" width="42" height="6" fill="#dcdde1" />

      {/* Magnifying Glass & Manuscript */}
      <rect x="115" y="118" width="25" height="6" fill="#f5f6fa" />
      <line x1="118" y1="120" x2="135" y2="120" stroke="#718093" strokeWidth="1" />
      <line x1="118" y1="122" x2="132" y2="122" stroke="#718093" strokeWidth="1" />
      {/* Magnifier */}
      <circle cx="150" cy="120" r="5" stroke="#f1c40f" strokeWidth="1.5" fill="none" />
      <line x1="154" y1="123" x2="160" y2="128" stroke="#485460" strokeWidth="2" />

      {/* CONICET Coffee Mug */}
      <rect x="170" y="114" width="8" height="10" rx="1" fill="#ecf0f1" />
      <rect x="178" y="117" width="2" height="5" fill="#bdc3c7" />

      {/* Sign: INSTITUTO DE INVESTIGACIÓN */}
      <rect x="90" y="4" width="140" height="10" fill="#2f3640" rx="2" />
      <text x="160" y="11" fontSize="4.5" textAnchor="middle" fill="#f5cd79" fontFamily="'Press Start 2P', monospace">
        INSTITUTO / ARCHIVO
      </text>
    </svg>
  );
};
