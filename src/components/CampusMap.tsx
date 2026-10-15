import React from 'react';
import { useGame } from '../context/GameContext';
import { LOCATIONS } from '../constants/locations';
import type { LocationId } from '../types/game';
import { CentralStage } from './CentralStage';
import { PuanFacadePixel } from './pixel/PuanFacadePixel';
import { PuanPatioPixel } from './pixel/PuanPatioPixel';
import { BibliotecaPixel } from './pixel/BibliotecaPixel';
import { CefylPixel } from './pixel/CefylPixel';
import { InstitutoPixel } from './pixel/InstitutoPixel';
import { CasaPixel } from './pixel/CasaPixel';
import { BoardFooter } from './BoardFooter';
import { Footprints } from 'lucide-react';

export const CampusMap: React.FC = () => {
  const { state, travelTo } = useGame();
  const { currentLocation, player, hoursRemaining } = state;

  if (!player) return null;

  const getLocationThumbnail = (locId: LocationId) => {
    switch (locId) {
      case 'casa': return <CasaPixel className="w-full h-full object-cover" />;
      case 'aula': return <PuanFacadePixel className="w-full h-full object-cover" />;
      case 'biblioteca': return <BibliotecaPixel className="w-full h-full object-cover" />;
      case 'patio': return <PuanPatioPixel className="w-full h-full object-cover" />;
      case 'cefyl': return <CefylPixel className="w-full h-full object-cover" />;
      case 'instituto': return <InstitutoPixel className="w-full h-full object-cover" />;
      default: return <PuanFacadePixel className="w-full h-full object-cover" />;
    }
  };

  const leftLocations: LocationId[] = ['casa', 'aula', 'biblioteca'];
  const rightLocations: LocationId[] = ['patio', 'cefyl', 'instituto'];

  const renderLocationCard = (locKey: LocationId) => {
    const loc = LOCATIONS[locKey];
    const isCurrent = currentLocation === locKey;
    const currentIsFaculty = LOCATIONS[currentLocation].isFaculty;
    const targetIsFaculty = loc.isFaculty;
    const isToOrFromCasa = !currentIsFaculty || !targetIsFaculty;
    const travelCost = isCurrent ? 0 : (isToOrFromCasa ? 2 : 0.5);
    const canAfford = isCurrent || hoursRemaining >= travelCost;

    return (
      <button
        key={locKey}
        type="button"
        onClick={() => travelTo(locKey)}
        disabled={!canAfford && !isCurrent}
        className={`w-full group text-left relative rounded-lg border-3 transition-all duration-100 p-2 overflow-hidden flex flex-col justify-between cursor-pointer select-none ${
          isCurrent
            ? 'border-amber-400 bg-[#252b45] shadow-lg ring-2 ring-amber-400/50 scale-[1.02]'
            : canAfford
            ? 'border-[#4a557a] hover:border-amber-400 bg-[#161a29] hover:bg-[#1f243a]'
            : 'border-slate-800 bg-[#10121c] opacity-50 cursor-not-allowed'
        }`}
      >
        {/* Pixel Art Thumbnail Box */}
        <div className="relative w-full h-18 sm:h-20 rounded border border-slate-700/80 overflow-hidden mb-2 shadow-inner bg-black">
          {getLocationThumbnail(locKey)}
          <div className="absolute inset-0 crt-scanlines opacity-30 pointer-events-none" />

          {/* Current location pawn badge */}
          {isCurrent && (
            <div className="absolute top-1 right-1 bg-amber-500 text-slate-950 font-pixel text-[8px] px-1.5 py-0.5 rounded shadow font-bold flex items-center gap-1 animate-pulse">
              <span>{player.archetype.avatar}</span>
              <span>AQUÍ</span>
            </div>
          )}

          {!isCurrent && (
            <div className={`absolute top-1 right-1 font-pixel text-[8px] px-1.5 py-0.5 rounded shadow ${
              canAfford ? 'bg-slate-900/90 text-cyan-300 border border-slate-700' : 'bg-red-950 text-red-400'
            }`}>
              -{travelCost} hs
            </div>
          )}
        </div>

        {/* Location Info */}
        <div className="w-full">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <h4 className="font-pixel text-[10px] text-amber-300 truncate">
              {loc.name}
            </h4>
          </div>
          <p className="text-[10px] text-slate-400 font-mono line-clamp-1">
            {loc.subtitle}
          </p>

          <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono border-t border-slate-800/80 pt-1">
            <span className="text-slate-500">{loc.actions.length} acciones</span>
            <span className={isCurrent ? 'text-amber-400 font-bold' : canAfford ? 'text-cyan-400' : 'text-red-400'}>
              {isCurrent ? '▶ En locación' : `Viajar (-${travelCost} hs)`}
            </span>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col justify-center py-2">
      {/* Top Travel Helper Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-2 text-slate-300 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="font-pixel text-[10px] text-amber-400 tracking-wider">
            🏛️ TABLERO PUÁN 1990
          </span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline text-slate-400 text-[11px]">
            Elige una locación para trasladar a tu personaje
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] bg-slate-900/90 border border-slate-700 px-2.5 py-1 rounded">
          <Footprints className="w-3 h-3 text-cyan-400" />
          <span>Casa ↔ Facu: <strong className="text-cyan-300">2 hs</strong></span>
          <span className="text-slate-600">|</span>
          <span>Entre aulas/patio: <strong className="text-cyan-300">0.5 hs</strong></span>
        </div>
      </div>

      {/* Jones in the Fast Lane Layout: Flanked by locations with the Central Stage in the middle! */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-start">
        {/* Left Flank: 3 Locations */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 order-2 lg:order-1">
          {leftLocations.map(renderLocationCard)}
        </div>

        {/* Center: The Iconic Central Stage (Jones in the Fast Lane Screen) */}
        <div className="lg:col-span-6 w-full order-1 lg:order-2">
          <CentralStage />
        </div>

        {/* Right Flank: 3 Locations */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 order-3 lg:order-3">
          {rightLocations.map(renderLocationCard)}
        </div>
      </div>

      {/* Retro Jones in the Fast Lane Clock and Creator Credits Footer */}
      <BoardFooter />
    </div>
  );
};
