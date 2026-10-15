import React from 'react';

export const CefylPixel: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 320 200"
      className={`pixelated ${className}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Hall Walls */}
      <rect x="0" y="0" width="320" height="200" fill="#24283b" />
      <rect x="0" y="0" width="320" height="150" fill="#2d3246" />

      {/* Hanging Cloth Banner: CEFyL CONDUCCIÓN */}
      <polygon points="40,10 280,10 275,36 160,42 45,36" fill="#c0392b" />
      <text x="160" y="24" fontSize="8" textAnchor="middle" fill="#ffffff" fontFamily="'Press Start 2P', monospace" fontWeight="bold">
        CEFyL 480
      </text>
      <text x="160" y="34" fontSize="5" textAnchor="middle" fill="#f1c40f" fontFamily="'Press Start 2P', monospace">
        CENTRO DE ESTUDIANTES
      </text>

      {/* Massive Concrete Pillars Covered in Posters (Columnas de Puán empapeladas) */}
      {/* Pillar 1 (Left) */}
      <rect x="25" y="30" width="55" height="170" fill="#5c6375" />
      <rect x="25" y="30" width="5" height="170" fill="#7d869c" />
      {/* Posters on Pillar 1 */}
      <rect x="33" y="45" width="22" height="16" fill="#e67e22" />
      <text x="35" y="54" fontSize="3" fill="#ffffff" fontFamily="monospace">ASAMBLEA</text>
      <rect x="38" y="70" width="30" height="20" fill="#e74c3c" />
      <text x="40" y="80" fontSize="3" fill="#ffffff" fontFamily="monospace">¡PARO ACTIVO!</text>
      <rect x="32" y="98" width="26" height="18" fill="#9b59b6" />
      <text x="34" y="108" fontSize="3" fill="#ffffff" fontFamily="monospace">FESTIVAL</text>
      <rect x="35" y="125" width="32" height="24" fill="#3498db" />

      {/* Pillar 2 (Right) */}
      <rect x="240" y="30" width="55" height="170" fill="#5c6375" />
      <rect x="240" y="30" width="5" height="170" fill="#7d869c" />
      {/* Posters on Pillar 2 */}
      <rect x="248" y="48" width="30" height="22" fill="#2ecc71" />
      <text x="250" y="58" fontSize="3" fill="#ffffff" fontFamily="monospace">BOLETO</text>
      <rect x="245" y="80" width="35" height="26" fill="#f1c40f" />
      <text x="247" y="92" fontSize="3" fill="#2c3e50" fontFamily="monospace">ELECCIONES</text>
      <rect x="250" y="115" width="28" height="20" fill="#e74c3c" />

      {/* Hall Floor Tiles */}
      <rect x="0" y="150" width="320" height="50" fill="#3b4252" />
      <line x1="0" y1="150" x2="320" y2="150" stroke="#4c566a" strokeWidth="2" />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`hf-${i}`} x1={i * 40} y1="150" x2={i * 40} y2="200" stroke="#2e3440" strokeWidth="1" />
      ))}

      {/* Central Table (Mesa de Agrupación) */}
      <rect x="100" y="130" width="120" height="35" fill="#8b572a" />
      <rect x="96" y="126" width="128" height="6" fill="#c0392b" />
      {/* Table legs */}
      <rect x="105" y="165" width="6" height="30" fill="#4a2e16" />
      <rect x="209" y="165" width="6" height="30" fill="#4a2e16" />

      {/* Table Cloth draped over front with Slogan */}
      <rect x="100" y="132" width="120" height="25" fill="#962d22" />
      <text x="160" y="148" fontSize="6" textAnchor="middle" fill="#ffffff" fontFamily="'Press Start 2P', monospace">
        AGRUPACIÓN
      </text>

      {/* Items on Table: Flyers stacks, stickers, Megaphone, Mate */}
      {/* Stacks of Paper Flyers */}
      <rect x="110" y="120" width="16" height="6" fill="#ffffff" />
      <rect x="112" y="117" width="14" height="4" fill="#f1c40f" />
      
      <rect x="135" y="121" width="18" height="5" fill="#3498db" />

      {/* Megaphone (Megáfono de mano) */}
      <polygon points="175,123 188,118 188,126" fill="#ecf0f1" />
      <rect x="188" y="116" width="4" height="12" fill="#e74c3c" />
      <rect x="175" y="120" width="5" height="6" fill="#e74c3c" />
      <rect x="178" y="126" width="3" height="5" fill="#2c3e50" />

      {/* Thermos & Mate */}
      <rect x="200" y="115" width="6" height="12" fill="#7f8c8d" />
      <circle cx="212" cy="123" r="3" fill="#5d4037" />
      <line x1="213" y1="123" x2="216" y2="118" stroke="#bdc3c7" strokeWidth="1" />
    </svg>
  );
};
