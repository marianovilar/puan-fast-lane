import React, { useState, useEffect } from 'react';
import type { ArchetypeId, LocationId } from '../../types/game';
import dialogosData from '../../dialogos.json';

interface PixelCharacterProps {
  archetypeId: ArchetypeId;
  currentLocation: LocationId;
  mentalHealth: number;
  energy: number;
  className?: string;
  showSpeechBubble?: boolean;
  actionTrigger?: number;
}

export const PixelCharacter: React.FC<PixelCharacterProps> = ({
  archetypeId,
  currentLocation,
  mentalHealth,
  energy,
  className = 'w-48 h-56',
  showSpeechBubble = true,
  actionTrigger = 0,
}) => {
  const isBurnedOut = mentalHealth < 30;
  const isLowEnergy = energy < 25;
  const [quoteIdx, setQuoteIdx] = useState(0);

  // Pool calculation from dialogos.json
  const getQuotesPool = (): string[] => {
    if (isBurnedOut && dialogosData.estados_especiales?.burnout?.length) {
      return dialogosData.estados_especiales.burnout;
    }
    if (isLowEnergy && dialogosData.estados_especiales?.baja_energia?.length) {
      return dialogosData.estados_especiales.baja_energia;
    }

    const locMap = (dialogosData.pensamientos_por_lugar || {}) as Record<string, string[] | undefined>;
    const basePool = locMap[currentLocation] || locMap.aula || ['...'];
    const arqMap = (dialogosData.por_arquetipo || {}) as Record<string, Record<string, string[] | undefined> | undefined>;
    const bonus = arqMap[archetypeId]?.[currentLocation];
    return bonus ? [...bonus, ...basePool] : basePool;
  };

  const pool = getQuotesPool();
  const safePool = pool.length > 0 ? pool : ['...'];

  // Rotate to next quote automatically whenever an action is performed, location changes, or status changes
  useEffect(() => {
    setQuoteIdx(prev => prev + 1);
  }, [actionTrigger, currentLocation, isBurnedOut, isLowEnergy]);

  const currentQuote = safePool[quoteIdx % safePool.length];

  return (
    <div className={`relative flex flex-col items-center justify-end ${className}`}>
      {/* Speech Bubble (Displayed only when showSpeechBubble is true) */}
      {showSpeechBubble && (
        <div className="absolute -top-11 sm:-top-13 z-20 max-w-[240px] sm:max-w-[280px] bg-slate-900/95 border-2 border-amber-400 p-2 sm:p-2.5 rounded-lg shadow-2xl text-center select-none animate-in fade-in duration-150">
          <p className="text-[10px] sm:text-[11px] font-mono font-bold text-amber-200 leading-snug">
            "{currentQuote}"
          </p>
          {/* Bubble Tail */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-8 border-t-amber-400" />
        </div>
      )}

      {/* Pixel Character SVG Sprite */}
      <svg
        viewBox="0 0 100 130"
        className={`w-full h-full pixelated ${isBurnedOut ? 'animate-pixel-stress' : 'animate-pixel-idle'}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow under feet */}
        <ellipse cx="50" cy="122" rx="24" ry="5" fill="#000000" opacity="0.45" />

        {/* 1. EL PERFIL CONICET */}
        {archetypeId === 'conicet' && (
          <g id="conicet-sprite">
            {/* Feet / Leather shoes */}
            <rect x="36" y="112" width="12" height="8" rx="2" fill="#3e2723" />
            <rect x="52" y="112" width="12" height="8" rx="2" fill="#3e2723" />

            {/* Corduroy Trousers */}
            <rect x="37" y="86" width="11" height="28" fill="#5d4037" />
            <rect x="52" y="86" width="11" height="28" fill="#5d4037" />
            <rect x="42" y="82" width="16" height="8" fill="#4e342e" />

            {/* Tweed Blazer / Jacket */}
            <rect x="30" y="52" width="40" height="34" rx="3" fill="#795548" />
            <rect x="30" y="52" width="40" height="4" fill="#8d6e63" />
            {/* White shirt / dark tie */}
            <polygon points="46,52 54,52 50,62" fill="#ecf0f1" />
            <polygon points="49,60 51,60 50,74" fill="#962d22" />
            {/* Elbow suede patches */}
            <ellipse cx="28" cy="68" rx="3" ry="5" fill="#4e342e" />
            <ellipse cx="72" cy="68" rx="3" ry="5" fill="#4e342e" />

            {/* Left Arm holding thick book */}
            <rect x="24" y="54" width="8" height="26" rx="2" fill="#795548" />
            {/* Thick Philosophy Tome in hand */}
            <rect x="18" y="70" width="10" height="18" rx="1" fill="#1b2430" />
            <rect x="20" y="72" width="6" height="14" fill="#c0392b" />
            <rect x="22" y="76" width="3" height="3" fill="#f1c40f" />

            {/* Right Arm holding briefcase */}
            <rect x="68" y="54" width="8" height="24" rx="2" fill="#795548" />
            <rect x="74" y="76" width="14" height="18" rx="2" fill="#4e342e" />
            <rect x="78" y="74" width="6" height="4" fill="#d4af37" />

            {/* Head / Face */}
            <rect x="38" y="24" width="24" height="26" rx="4" fill="#ffdbac" />
            {/* Hair: Combed neat brown hair */}
            <rect x="36" y="16" width="28" height="12" rx="4" fill="#3e2723" />
            <rect x="35" y="20" width="6" height="12" fill="#3e2723" />

            {/* Glasses / Anteojos redondos de carey */}
            <circle cx="44" cy="34" r="5" stroke="#3e2723" strokeWidth="1.5" fill={isBurnedOut ? '#ff7675' : '#ffffff'} opacity="0.9" />
            <circle cx="56" cy="34" r="5" stroke="#3e2723" strokeWidth="1.5" fill={isBurnedOut ? '#ff7675' : '#ffffff'} opacity="0.9" />
            <line x1="49" y1="34" x2="51" y2="34" stroke="#3e2723" strokeWidth="1.5" />

            {/* Eyes behind glasses */}
            {isBurnedOut ? (
              <>
                <line x1="42" y1="32" x2="46" y2="36" stroke="#c0392b" strokeWidth="1.5" />
                <line x1="46" y1="32" x2="42" y2="36" stroke="#c0392b" strokeWidth="1.5" />
                <line x1="54" y1="32" x2="58" y2="36" stroke="#c0392b" strokeWidth="1.5" />
                <line x1="58" y1="32" x2="54" y2="36" stroke="#c0392b" strokeWidth="1.5" />
              </>
            ) : (
              <>
                <circle cx="44" cy="34" r="2" fill="#2c3e50" />
                <circle cx="56" cy="34" r="2" fill="#2c3e50" />
              </>
            )}

            {/* Mouth */}
            <line x1="47" y1="44" x2="53" y2="44" stroke="#c0392b" strokeWidth="1.5" />
          </g>
        )}

        {/* 2. LA CUADRO MILITANTE */}
        {archetypeId === 'militante' && (
          <g id="militante-sprite">
            {/* Combat boots / Borcegos negros */}
            <rect x="35" y="110" width="13" height="10" rx="2" fill="#1b1d28" />
            <rect x="52" y="110" width="13" height="10" rx="2" fill="#1b1d28" />
            <line x1="36" y1="112" x2="46" y2="112" stroke="#e74c3c" strokeWidth="1" />

            {/* Dark Jeans */}
            <rect x="37" y="84" width="11" height="28" fill="#2c3e50" />
            <rect x="52" y="84" width="11" height="28" fill="#2c3e50" />
            <rect x="42" y="80" width="16" height="8" fill="#1a252f" />

            {/* Green / Red Militant Pañuelo / Scarf */}
            <polygon points="40,50 60,50 50,64" fill="#27ae60" />
            <circle cx="50" cy="52" r="3" fill="#e74c3c" />

            {/* Denim / Canvas Jacket with Pins */}
            <rect x="28" y="52" width="44" height="32" rx="3" fill="#2980b9" />
            <rect x="28" y="52" width="44" height="4" fill="#3498db" />
            {/* Campaign badges / pins on jacket */}
            <circle cx="35" cy="60" r="2.5" fill="#e74c3c" />
            <circle cx="39" cy="65" r="2" fill="#f1c40f" />
            <circle cx="34" cy="68" r="2" fill="#9b59b6" />

            {/* Left Arm raised holding Megaphone */}
            <rect x="20" y="48" width="8" height="26" rx="2" fill="#2980b9" />
            {/* Megaphone in Hand */}
            <polygon points="12,42 22,38 22,48" fill="#ecf0f1" />
            <rect x="22" y="36" width="4" height="14" fill="#e74c3c" />
            <rect x="10" y="39" width="3" height="8" fill="#e74c3c" />

            {/* Right Arm */}
            <rect x="70" y="54" width="8" height="24" rx="2" fill="#2980b9" />
            {/* Flyers in right hand */}
            <rect x="76" y="74" width="12" height="14" fill="#ffffff" />
            <rect x="78" y="76" width="8" height="2" fill="#e74c3c" />

            {/* Head / Face */}
            <rect x="38" y="24" width="24" height="24" rx="4" fill="#f3c299" />
            {/* Dark Hair with messy bun or rebel cut */}
            <rect x="34" y="16" width="32" height="14" rx="4" fill="#1a1c23" />
            <rect x="34" y="22" width="6" height="14" fill="#1a1c23" />
            <circle cx="50" cy="12" r="7" fill="#1a1c23" />

            {/* Eyes */}
            {isBurnedOut ? (
              <>
                <line x1="42" y1="32" x2="46" y2="36" stroke="#c0392b" strokeWidth="1.5" />
                <line x1="46" y1="32" x2="42" y2="36" stroke="#c0392b" strokeWidth="1.5" />
                <line x1="54" y1="32" x2="58" y2="36" stroke="#c0392b" strokeWidth="1.5" />
                <line x1="58" y1="32" x2="54" y2="36" stroke="#c0392b" strokeWidth="1.5" />
              </>
            ) : (
              <>
                <circle cx="44" cy="33" r="2" fill="#1a1c23" />
                <circle cx="56" cy="33" r="2" fill="#1a1c23" />
                {/* Determined eyebrows */}
                <line x1="41" y1="29" x2="47" y2="30" stroke="#1a1c23" strokeWidth="1.5" />
                <line x1="59" y1="29" x2="53" y2="30" stroke="#1a1c23" strokeWidth="1.5" />
              </>
            )}

            {/* Mouth */}
            <line x1="46" y1="42" x2="54" y2="42" stroke="#c0392b" strokeWidth="2" />
          </g>
        )}

        {/* 3. EL ESTUDIANTE LABURANTE */}
        {archetypeId === 'laburante' && (
          <g id="laburante-sprite">
            {/* Practical sneakers / Zapatillas */}
            <rect x="35" y="112" width="13" height="8" rx="2" fill="#7f8c8d" />
            <rect x="52" y="112" width="13" height="8" rx="2" fill="#7f8c8d" />
            <rect x="35" y="118" width="13" height="2" fill="#ffffff" />
            <rect x="52" y="118" width="13" height="2" fill="#ffffff" />

            {/* Work Chinos / Pantalón de gabardina */}
            <rect x="37" y="86" width="11" height="28" fill="#34495e" />
            <rect x="52" y="86" width="11" height="28" fill="#34495e" />
            <rect x="42" y="82" width="16" height="8" fill="#2c3e50" />

            {/* Commuter Jacket / Buzo de trabajo */}
            <rect x="28" y="52" width="44" height="34" rx="3" fill="#4a6572" />
            <rect x="28" y="52" width="44" height="4" fill="#34495e" />

            {/* Backpack strap across chest */}
            <line x1="33" y1="52" x2="67" y2="84" stroke="#1e272e" strokeWidth="4" />

            {/* Left Arm holding Travel Thermal Mug */}
            <rect x="22" y="54" width="8" height="26" rx="2" fill="#4a6572" />
            <rect x="18" y="74" width="8" height="14" rx="1" fill="#bdc3c7" />
            <rect x="19" y="72" width="6" height="3" fill="#2c3e50" />

            {/* Right Arm holding SUBE card / Apunte doblado */}
            <rect x="70" y="54" width="8" height="24" rx="2" fill="#4a6572" />
            <rect x="76" y="74" width="10" height="7" rx="1" fill="#0984e3" />

            {/* Head / Face */}
            <rect x="38" y="24" width="24" height="26" rx="4" fill="#e0ac69" />
            {/* Hair: Short practical cut */}
            <rect x="36" y="18" width="28" height="12" rx="3" fill="#2d3436" />
            <rect x="35" y="22" width="5" height="8" fill="#2d3436" />

            {/* Tired eye circles (Ojeras del laburante) */}
            <ellipse cx="44" cy="37" rx="4" ry="2" fill="#b2bec3" opacity="0.6" />
            <ellipse cx="56" cy="37" rx="4" ry="2" fill="#b2bec3" opacity="0.6" />

            {/* Eyes */}
            {isBurnedOut ? (
              <>
                <line x1="42" y1="32" x2="46" y2="36" stroke="#c0392b" strokeWidth="1.5" />
                <line x1="46" y1="32" x2="42" y2="36" stroke="#c0392b" strokeWidth="1.5" />
                <line x1="54" y1="32" x2="58" y2="36" stroke="#c0392b" strokeWidth="1.5" />
                <line x1="58" y1="32" x2="54" y2="36" stroke="#c0392b" strokeWidth="1.5" />
              </>
            ) : (
              <>
                <circle cx="44" cy="33" r="2" fill="#2d3436" />
                <circle cx="56" cy="33" r="2" fill="#2d3436" />
              </>
            )}

            {/* Mouth: Resilient straight line */}
            <line x1="46" y1="44" x2="54" y2="44" stroke="#2d3436" strokeWidth="1.5" />
          </g>
        )}

        {/* 4. EL POETA DE PASILLO */}
        {archetypeId === 'poeta' && (
          <g id="poeta-sprite">
            {/* Worn boots or sandals */}
            <rect x="35" y="112" width="13" height="8" rx="2" fill="#5d4037" />
            <rect x="52" y="112" width="13" height="8" rx="2" fill="#5d4037" />

            {/* Loose Baggy Pants (Pantalón de corderoy ancho) */}
            <rect x="35" y="84" width="13" height="30" fill="#6d4c41" />
            <rect x="52" y="84" width="13" height="30" fill="#6d4c41" />

            {/* Chunky Wool Knitted Cardigan / Poncho Bohemio */}
            <rect x="26" y="52" width="48" height="36" rx="4" fill="#a0522d" />
            <rect x="32" y="54" width="36" height="32" fill="#cd853f" />
            {/* Pattern / Stripes */}
            <line x1="28" y1="64" x2="72" y2="64" stroke="#8b4513" strokeWidth="2" />
            <line x1="28" y1="74" x2="72" y2="74" stroke="#8b4513" strokeWidth="2" />

            {/* Left Arm holding Calabaza Mate with Bombilla */}
            <rect x="20" y="56" width="8" height="24" rx="2" fill="#a0522d" />
            {/* Mate & Bombilla */}
            <circle cx="20" cy="78" r="5" fill="#3e2723" />
            <line x1="21" y1="76" x2="25" y2="68" stroke="#bdc3c7" strokeWidth="1.5" />

            {/* Right Arm holding Rivadavia Notebook & Pen */}
            <rect x="72" y="56" width="8" height="24" rx="2" fill="#a0522d" />
            <rect x="76" y="72" width="12" height="16" rx="1" fill="#e74c3c" />
            <rect x="78" y="74" width="8" height="12" fill="#ffffff" />
            <line x1="88" y1="72" x2="90" y2="68" stroke="#f1c40f" strokeWidth="1.5" />

            {/* Head / Face */}
            <rect x="38" y="24" width="24" height="26" rx="4" fill="#f8c291" />
            {/* Wild Bohemian Curly Hair / Melena bohemia */}
            <circle cx="36" cy="20" r="8" fill="#4a3728" />
            <circle cx="50" cy="16" r="9" fill="#4a3728" />
            <circle cx="64" cy="20" r="8" fill="#4a3728" />
            <circle cx="32" cy="28" r="7" fill="#4a3728" />
            <circle cx="68" cy="28" r="7" fill="#4a3728" />

            {/* Beard stubble */}
            <rect x="42" y="44" width="16" height="5" fill="#4a3728" opacity="0.3" rx="2" />

            {/* Eyes: Dreamy or Burned out */}
            {isBurnedOut ? (
              <>
                <line x1="42" y1="32" x2="46" y2="36" stroke="#c0392b" strokeWidth="1.5" />
                <line x1="46" y1="32" x2="42" y2="36" stroke="#c0392b" strokeWidth="1.5" />
                <line x1="54" y1="32" x2="58" y2="36" stroke="#c0392b" strokeWidth="1.5" />
                <line x1="58" y1="32" x2="54" y2="36" stroke="#c0392b" strokeWidth="1.5" />
              </>
            ) : (
              <>
                <circle cx="44" cy="33" r="2" fill="#2d3436" />
                <circle cx="56" cy="33" r="2" fill="#2d3436" />
              </>
            )}

            {/* Mouth: Gentle smile */}
            <path d="M 46 43 Q 50 46 54 43" stroke="#2d3436" strokeWidth="1.5" fill="none" />
          </g>
        )}

        {/* Sweat drop animation if burned out */}
        {isBurnedOut && (
          <path
            d="M 68 20 C 68 18 72 15 72 15 C 72 15 76 18 76 20 C 76 22 72 24 68 20 Z"
            fill="#3498db"
          />
        )}
      </svg>
    </div>
  );
};
