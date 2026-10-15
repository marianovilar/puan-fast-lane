import React from 'react';
import { useGame } from '../context/GameContext';
import { LOCATIONS } from '../constants/locations';
import { PixelCharacter } from './pixel/PixelCharacter';
import { PuanFacadePixel } from './pixel/PuanFacadePixel';
import { PuanPatioPixel } from './pixel/PuanPatioPixel';
import { BibliotecaPixel } from './pixel/BibliotecaPixel';
import { CefylPixel } from './pixel/CefylPixel';
import { InstitutoPixel } from './pixel/InstitutoPixel';
import { CasaPixel } from './pixel/CasaPixel';
import { MapPin, Sparkles, AlertTriangle } from 'lucide-react';

export const CentralStage: React.FC = () => {
  const { state, executeAction } = useGame();
  const { currentLocation, player, hoursRemaining } = state;

  if (!player) return null;

  const loc = LOCATIONS[currentLocation];
  const { stats, archetype } = player;
  const isBurnedOut = stats.mentalHealth < 30;

  // Render the appropriate pixel art scene for the current location
  const renderLocationPixelArt = () => {
    switch (currentLocation) {
      case 'casa':
        return <CasaPixel className="w-full h-full object-cover" />;
      case 'aula':
        return <PuanFacadePixel className="w-full h-full object-cover" />;
      case 'biblioteca':
        return <BibliotecaPixel className="w-full h-full object-cover" />;
      case 'patio':
        return <PuanPatioPixel className="w-full h-full object-cover" />;
      case 'cefyl':
        return <CefylPixel className="w-full h-full object-cover" />;
      case 'instituto':
        return <InstitutoPixel className="w-full h-full object-cover" />;
      default:
        return <PuanFacadePixel className="w-full h-full object-cover" />;
    }
  };

  return (
    <div className="sierra-frame rounded-lg p-3 sm:p-4 bg-[#1b2033] flex flex-col w-full shadow-2xl relative overflow-hidden">
      {/* Sierra Gold Top Title Bar */}
      <div className="bg-[#121524] border-2 border-[#4b557d] px-3 py-1.5 rounded mb-2.5 flex flex-wrap items-center justify-between gap-2 text-slate-100">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-400" />
          <span className="font-pixel text-[11px] sm:text-xs text-amber-300 tracking-wider">
            {loc.name.toUpperCase()}
          </span>
          <span className="text-xs text-slate-400 font-mono hidden md:inline">
            • {loc.subtitle}
          </span>
        </div>

        <div className="font-pixel text-[9px] text-cyan-300 bg-black/60 px-2 py-0.5 rounded border border-cyan-800">
          RELOJ: {hoursRemaining} HS
        </div>
      </div>

      {/* Main Pixel Stage Viewport (Jones in the Fast Lane Center Window) */}
      <div className="sierra-inner-frame relative w-full h-[240px] sm:h-[300px] md:h-[340px] rounded overflow-hidden flex items-end justify-center select-none shadow-inner">
        {/* Pixel Art Location Scene */}
        <div className="absolute inset-0 z-0">
          {renderLocationPixelArt()}
        </div>

        {/* CRT Scanline Overlay Effect */}
        <div className="absolute inset-0 z-10 crt-scanlines opacity-40 pointer-events-none" />

        {/* Ambient Location Name Overlay in Pixel Font */}
        <div className="absolute top-2 left-2 z-20 bg-black/80 border border-amber-500/70 px-2.5 py-1 rounded shadow">
          <span className="font-pixel text-[9px] sm:text-[10px] text-amber-300">
            {loc.name}
          </span>
        </div>

        {/* The Animated Pixel Character Standing in the Scene! */}
        <div className="relative z-20 mb-2 sm:mb-3">
          <PixelCharacter
            archetypeId={archetype.id}
            currentLocation={currentLocation}
            mentalHealth={stats.mentalHealth}
            energy={stats.energy}
            showSpeechBubble={true}
            actionTrigger={state.eventLogs.length}
            className="w-36 h-48 sm:w-44 sm:h-56"
          />
        </div>
      </div>

      {/* Location Lore Description Box */}
      <div className="mt-2.5 bg-[#10131e] border border-slate-800 px-3 py-1.5 rounded text-[11px] font-mono text-slate-300 leading-snug italic">
        "{loc.description}"
      </div>

      {/* Archetype / Status Notice for this location */}
      {archetype.id === 'poeta' && currentLocation === 'patio' && (
        <div className="mt-2 bg-emerald-950/60 border border-emerald-700/80 px-2.5 py-1 rounded text-[10px] font-mono text-emerald-300 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span><strong>Pasiva Bohemio:</strong> ¡Recuperas el doble (x2) de Salud Mental en el Patio de Puán!</span>
        </div>
      )}

      {archetype.id === 'militante' && currentLocation === 'biblioteca' && (
        <div className="mt-2 bg-rose-950/60 border border-rose-700/80 px-2.5 py-1 rounded text-[10px] font-mono text-rose-300 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span><strong>Desventaja Militante:</strong> Estudiar en la biblioteca drena el doble de Salud Mental (-15%).</span>
        </div>
      )}

      {archetype.id === 'poeta' && (currentLocation === 'aula' || currentLocation === 'biblioteca') && (
        <div className="mt-2 bg-amber-950/60 border border-amber-700/80 px-2.5 py-1 rounded text-[10px] font-mono text-amber-300 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span><strong>Procrastinación Bohemio:</strong> Iniciar acciones aquí te cuesta +50% más de energía inicial.</span>
        </div>
      )}

      {archetype.id === 'conicet' && (currentLocation === 'biblioteca' || currentLocation === 'instituto') && (
        <div className="mt-2 bg-cyan-950/60 border border-cyan-700/80 px-2.5 py-1 rounded text-[10px] font-mono text-cyan-300 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span><strong>Pasiva CONICET:</strong> +30% de eficiencia académica al estudiar e investigar.</span>
        </div>
      )}

      {isBurnedOut && currentLocation === 'biblioteca' && (
        <div className="mt-2 bg-red-950/80 border border-red-700/80 px-2.5 py-1 rounded text-[10px] font-mono text-red-300 flex items-center gap-1.5 animate-pulse">
          <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
          <span><strong>Burnout Activo:</strong> Tu lectura se reduce al 50%. ¡Pasa por el Patio o a dormir!</span>
        </div>
      )}

      {/* Sierra Action Console (Direct interactive execution buttons) */}
      <div className="mt-2.5 bg-[#111422] border-2 border-[#384160] p-2.5 rounded">
        <div className="flex items-center justify-between mb-2">
          <span className="font-pixel text-[9px] text-amber-400 uppercase tracking-wider">
            ACCIONES EN {loc.name.toUpperCase()}:
          </span>
          <span className="font-mono text-xs text-slate-400">
            Dispones de: <strong className="text-cyan-300 font-bold">{hoursRemaining} hs</strong>
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {loc.actions.map(act => {
            const canAfford = hoursRemaining >= act.hoursCost;

            return (
              <div
                key={act.id}
                className={`p-2.5 rounded-lg border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-colors ${
                  canAfford 
                    ? 'bg-[#181d2f] border-slate-700 hover:border-amber-400' 
                    : 'bg-[#10121a] border-slate-800/80 opacity-50'
                }`}
              >
                {/* Left: Action Title, hours badge and full legible description */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-pixel text-[10px] sm:text-[11px] text-amber-300 font-bold">
                      {act.name}
                    </span>
                    <span className="font-pixel text-[8px] bg-slate-900 text-cyan-300 px-1.5 py-0.5 rounded border border-slate-700 shrink-0">
                      {act.hoursCost} hs
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-tight">
                    {act.description}
                  </p>
                </div>

                {/* Middle: Badges of benefits */}
                <div className="flex flex-wrap items-center gap-1.5 shrink-0 font-mono text-[10px]">
                  {act.benefits.energyDelta !== undefined && (
                    <span className={`px-1.5 py-0.5 rounded border ${
                      act.benefits.energyDelta > 0 
                        ? 'bg-emerald-950/70 text-emerald-300 border-emerald-800' 
                        : 'bg-amber-950/70 text-amber-300 border-amber-800'
                    }`}>
                      {act.benefits.energyDelta > 0 ? `+${act.benefits.energyDelta}%⚡` : `${act.benefits.energyDelta}%⚡`}
                    </span>
                  )}
                  {act.benefits.mentalHealthDelta !== undefined && (
                    <span className={`px-1.5 py-0.5 rounded border ${
                      act.benefits.mentalHealthDelta > 0 
                        ? 'bg-rose-950/70 text-rose-300 border-rose-800' 
                        : 'bg-red-950/70 text-red-300 border-red-800'
                    }`}>
                      {act.benefits.mentalHealthDelta > 0 ? `+${act.benefits.mentalHealthDelta}%🧠` : `${act.benefits.mentalHealthDelta}%🧠`}
                    </span>
                  )}
                  {act.benefits.attendance && (
                    <span className="bg-blue-950/70 text-blue-300 border border-blue-800 px-1.5 py-0.5 rounded">
                      +Asist.✓
                    </span>
                  )}
                  {act.benefits.readingProgress !== undefined && (
                    <span className="bg-indigo-950/70 text-indigo-300 border border-indigo-800 px-1.5 py-0.5 rounded">
                      +{act.benefits.readingProgress}% Lect.
                    </span>
                  )}
                  {act.benefits.politicalCapital !== undefined && (
                    <span className="bg-rose-950/70 text-rose-300 border border-rose-800 px-1.5 py-0.5 rounded">
                      +{act.benefits.politicalCapital} Pol.
                    </span>
                  )}
                  {act.benefits.academicPrestige !== undefined && (
                    <span className="bg-cyan-950/70 text-cyan-300 border border-cyan-800 px-1.5 py-0.5 rounded">
                      +{act.benefits.academicPrestige} Prest.
                    </span>
                  )}
                  {act.benefits.patioContacts !== undefined && (
                    <span className="bg-emerald-950/70 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded">
                      +{act.benefits.patioContacts} Cont.
                    </span>
                  )}
                </div>

                {/* Right: Sierra Button */}
                <div className="shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => executeAction(act)}
                    disabled={!canAfford}
                    className={`w-full sm:w-36 py-2 px-2.5 rounded font-pixel text-[9px] sierra-btn cursor-pointer ${
                      canAfford
                        ? 'bg-amber-600 hover:bg-amber-500 text-slate-950 border-amber-300'
                        : 'bg-slate-800 text-slate-600 border-slate-700 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? `▶ ${act.hoursCost} hs` : 'Sin Tiempo'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
