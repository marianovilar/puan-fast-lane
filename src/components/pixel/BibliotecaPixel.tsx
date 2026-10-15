import React from 'react';

export const BibliotecaPixel: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 320 200"
      className={`pixelated ${className}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Library Wall & Dark Wood Paneling */}
      <rect x="0" y="0" width="320" height="200" fill="#1b140e" />
      <rect x="0" y="0" width="320" height="60" fill="#2c2218" />

      {/* Tall Wooden Bookcases (Pared de libros) */}
      {Array.from({ length: 6 }).map((_, col) => (
        <g key={`shelf-${col}`}>
          <rect x={15 + col * 50} y="15" width="42" height="120" fill="#3e2715" />
          <rect x={17 + col * 50} y="17" width="38" height="116" fill="#26170d" />
          {/* Shelves */}
          {Array.from({ length: 4 }).map((_, row) => (
            <g key={`row-${row}`}>
              <rect x={17 + col * 50} y={35 + row * 24} width="38" height="3" fill="#54371f" />
              {/* Colorful books on each shelf */}
              {Array.from({ length: 8 }).map((_, book) => {
                const bookColors = ['#962d22', '#2c3e50', '#27ae60', '#f39c12', '#8e44ad', '#d35400', '#16a085', '#bdc3c7'];
                return (
                  <rect
                    key={`b-${book}`}
                    x={18 + col * 50 + book * 4.5}
                    y={19 + row * 24}
                    width="4"
                    height="16"
                    fill={bookColors[(col + row + book) % bookColors.length]}
                  />
                );
              })}
            </g>
          ))}
        </g>
      ))}

      {/* Library Wooden Card Catalog (Fichero tradicional) */}
      <rect x="250" y="110" width="55" height="40" fill="#4e342e" />
      <rect x="252" y="112" width="51" height="36" fill="#3e2723" />
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={`drawer-${i}`}>
          <rect x={255 + (i % 3) * 16} y={116 + Math.floor(i / 3) * 16} width="14" height="12" fill="#5d4037" />
          <rect x={260 + (i % 3) * 16} y={121 + Math.floor(i / 3) * 16} width="4" height="2" fill="#d4af37" />
        </g>
      ))}

      {/* Parquet / Linoleum Floor */}
      <rect x="0" y="140" width="320" height="60" fill="#513824" />
      <line x1="0" y1="140" x2="320" y2="140" stroke="#362417" strokeWidth="2" />
      {/* Floor tiles */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`fl-${i}`} x1={i * 40} y1="140" x2={i * 40} y2="200" stroke="#3e2918" strokeWidth="1" />
      ))}

      {/* Study Table with Green Banker Lamp */}
      <rect x="50" y="145" width="160" height="25" fill="#6d4c41" />
      <rect x="45" y="142" width="170" height="5" fill="#8d6e63" />
      {/* Table Legs */}
      <rect x="52" y="167" width="8" height="30" fill="#4e342e" />
      <rect x="195" y="167" width="8" height="30" fill="#4e342e" />

      {/* Open Philosophy Tomes & Photocopies on Table */}
      <rect x="80" y="138" width="22" height="6" fill="#fdfefe" />
      <line x1="91" y1="138" x2="91" y2="144" stroke="#7f8c8d" strokeWidth="1" />
      <rect x="140" y="139" width="18" height="5" fill="#ecf0f1" />

      {/* Green Banker's Lamp (Lámpara verde de lectura) */}
      {/* Base */}
      <rect x="115" y="137" width="10" height="5" fill="#d4af37" />
      <rect x="119" y="125" width="2" height="12" fill="#d4af37" />
      {/* Green Glass Shade */}
      <rect x="111" y="120" width="18" height="7" rx="2" fill="#27ae60" />
      <rect x="113" y="125" width="14" height="2" fill="#a9dfbf" />
      {/* Warm Light Glow Pool */}
      <polygon points="100,147 140,147 165,175 75,175" fill="#f9e79f" opacity="0.15" />

      {/* Sign: BIBLIOTECA CENTRAL - SILENCIO */}
      <rect x="100" y="2" width="120" height="12" fill="#2c3e50" rx="2" />
      <text x="160" y="10" fontSize="5" textAnchor="middle" fill="#ecf0f1" fontFamily="'Press Start 2P', monospace">
        SILENCIO / LECTURA
      </text>
    </svg>
  );
};
