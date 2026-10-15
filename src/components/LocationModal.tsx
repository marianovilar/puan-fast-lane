import React from 'react';
import { useGame } from '../context/GameContext';
import { LOCATIONS } from '../constants/locations';
import type { GameAction, LocationId } from '../types/game';
import { PuanFacadePixel } from './pixel/PuanFacadePixel';
import { PuanPatioPixel } from './pixel/PuanPatioPixel';
import { BibliotecaPixel } from './pixel/BibliotecaPixel';
import { CefylPixel } from './pixel/CefylPixel';
import { InstitutoPixel } from './pixel/InstitutoPixel';
import { CasaPixel } from './pixel/CasaPixel';
import { 
  X, 
  Clock, 
  Zap, 
  Heart, 
  BookOpen, 
  Award, 
  Megaphone, 
  Users, 
  CheckCircle2, 
  Sparkles,
  AlertTriangle
} from 'lucide-react';

export const LocationModal: React.FC = () => {
  const { state, closeLocationModal, executeAction } = useGame();
  const { activeLocationModal, hoursRemaining, player } = state;

  if (!activeLocationModal || !player) return null;

  const loc = LOCATIONS[activeLocationModal];
  const archetypeId = player.archetype.id;
  const isBurnedOut = player.stats.mentalHealth < 30;

  const renderLocationGraphic = (locId: LocationId) => {
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

  return (
    <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150">
      <div className="sierra-frame w-full max-w-2xl bg-[#161a29] rounded-lg overflow-hidden flex flex-col max-h-[90vh] shadow-2xl border-4">
        {/* Modal Header */}
        <div 
          className="p-3 sm:p-4 flex items-center justify-between text-white border-b-2 border-slate-700/80 relative"
          style={{ 
            background: `linear-gradient(to right, ${loc.themeColor}cc, #161a29)` 
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[9px] uppercase font-pixel bg-black/50 px-2 py-0.5 rounded border border-white/20">
                {loc.isFaculty ? 'PUÁN 480 • UBA' : 'FUERA DE FACULTAD'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-pixel tracking-wide text-white drop-shadow">
              {loc.name}
            </h2>
            <p className="text-xs text-slate-200 font-mono">
              {loc.subtitle}
            </p>
          </div>

          <button
            onClick={closeLocationModal}
            className="p-1.5 rounded-md bg-black/40 hover:bg-black/70 text-slate-300 hover:text-white border border-white/20 transition cursor-pointer"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Scrollable */}
        <div className="p-3 sm:p-5 overflow-y-auto space-y-3.5 text-slate-200">
          {/* Location Pixel Art Banner */}
          <div className="sierra-inner-frame w-full h-32 sm:h-40 rounded overflow-hidden relative shadow-inner">
            {renderLocationGraphic(loc.id)}
            <div className="absolute inset-0 crt-scanlines opacity-25 pointer-events-none" />
          </div>

          {/* Location Lore Description */}
          <div className="bg-[#10131e] border border-slate-800 p-2.5 rounded font-mono text-xs text-slate-300 leading-relaxed italic">
            "{loc.description}"
          </div>

          {/* Archetype warning notes inside this location */}
          {archetypeId === 'militante' && loc.id === 'biblioteca' && (
            <div className="bg-rose-950/70 border border-rose-800 p-2 rounded text-xs text-rose-300 font-mono flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                <strong>Desventaja de Cuadro Militante:</strong> Estudiar en la Biblioteca te aburre soberanamente y drena el doble de Salud Mental (-15%).
              </span>
            </div>
          )}

          {archetypeId === 'poeta' && (loc.id === 'aula' || loc.id === 'biblioteca') && (
            <div className="bg-amber-950/70 border border-amber-800 p-2 rounded text-xs text-amber-300 font-mono flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Desventaja Bohemio (Procrastinación):</strong> Iniciar acciones aquí te cuesta un +50% más de energía física inicial.
              </span>
            </div>
          )}

          {archetypeId === 'poeta' && loc.id === 'patio' && (
            <div className="bg-emerald-950/70 border border-emerald-800 p-2 rounded text-xs text-emerald-300 font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Pasiva Poeta de Pasillo:</strong> ¡Recuperas el doble (x2) de Salud Mental en el Patio!
              </span>
            </div>
          )}

          {archetypeId === 'conicet' && (loc.id === 'biblioteca' || loc.id === 'instituto') && (
            <div className="bg-cyan-950/70 border border-cyan-800 p-2 rounded text-xs text-cyan-300 font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                <strong>Pasiva CONICET:</strong> +30% de eficiencia en fichaje, avance de lectura y prestigio de investigación.
              </span>
            </div>
          )}

          {isBurnedOut && loc.id === 'biblioteca' && (
            <div className="bg-red-950/80 border border-red-800 p-2 rounded text-xs text-red-300 font-mono flex items-center gap-2 animate-pulse">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>
                <strong>¡Penalización por Burnout!:</strong> Tu Salud Mental es menor a 30%. La velocidad de lectura se reduce al 50%.
              </span>
            </div>
          )}

          {/* Actions List */}
          <div className="space-y-2.5">
            <h4 className="font-pixel text-[9px] uppercase tracking-wider text-amber-400 font-bold">
              ACCIONES DISPONIBLES:
            </h4>

            {loc.actions.map((act: GameAction) => {
              const canAffordHours = hoursRemaining >= act.hoursCost;

              return (
                <div
                  key={act.id}
                  className={`border rounded-lg p-3 transition-all ${
                    canAffordHours
                      ? 'bg-[#181d2f] border-slate-700 hover:border-slate-500'
                      : 'bg-[#121420] border-slate-800/80 opacity-60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
                    <div>
                      <h5 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                        <span>{act.name}</span>
                        <span className="text-[10px] font-mono font-normal text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/60">
                          {act.tagline}
                        </span>
                      </h5>
                    </div>

                    {/* Cost in Hours */}
                    <div className="flex items-center gap-1 font-mono text-xs bg-slate-900 px-2 py-0.5 rounded border border-slate-700 shrink-0">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span className={canAffordHours ? 'text-cyan-300 font-bold' : 'text-red-400 font-bold'}>
                        {act.hoursCost} hs
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-sans mb-2">
                    {act.description}
                  </p>

                  {/* Impact preview pill list */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-2.5 text-[11px] font-mono">
                    {act.benefits.energyDelta !== undefined && (
                      <span className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded border ${
                        act.benefits.energyDelta > 0 
                          ? 'bg-emerald-950/70 text-emerald-300 border-emerald-800' 
                          : 'bg-amber-950/70 text-amber-300 border-amber-800'
                      }`}>
                        <Zap className="w-3 h-3" />
                        <span>{act.benefits.energyDelta > 0 ? `+${act.benefits.energyDelta}%` : `${act.benefits.energyDelta}%`} Energía</span>
                      </span>
                    )}

                    {act.benefits.mentalHealthDelta !== undefined && (
                      <span className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded border ${
                        act.benefits.mentalHealthDelta > 0 
                          ? 'bg-rose-950/70 text-rose-300 border-rose-800' 
                          : 'bg-red-950/70 text-red-300 border-red-800'
                      }`}>
                        <Heart className="w-3 h-3" />
                        <span>{act.benefits.mentalHealthDelta > 0 ? `+${act.benefits.mentalHealthDelta}%` : `${act.benefits.mentalHealthDelta}%`} Salud</span>
                      </span>
                    )}

                    {act.benefits.attendance && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded border bg-blue-950/70 text-blue-300 border-blue-800">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>+Asistencia Práctico</span>
                      </span>
                    )}

                    {act.benefits.readingProgress !== undefined && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded border bg-indigo-950/70 text-indigo-300 border-indigo-800">
                        <BookOpen className="w-3 h-3" />
                        <span>+{act.benefits.readingProgress}% Lectura</span>
                      </span>
                    )}

                    {act.benefits.politicalCapital !== undefined && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded border bg-red-950/70 text-red-300 border-red-800">
                        <Megaphone className="w-3 h-3" />
                        <span>+{act.benefits.politicalCapital} Capital Pol.</span>
                      </span>
                    )}

                    {act.benefits.academicPrestige !== undefined && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded border bg-cyan-950/70 text-cyan-300 border-cyan-800">
                        <Award className="w-3 h-3" />
                        <span>+{act.benefits.academicPrestige} Prestigio</span>
                      </span>
                    )}

                    {act.benefits.patioContacts !== undefined && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded border bg-emerald-950/70 text-emerald-300 border-emerald-800">
                        <Users className="w-3 h-3" />
                        <span>+{act.benefits.patioContacts} Contactos</span>
                      </span>
                    )}
                  </div>

                  {/* Execution Button */}
                  <button
                    onClick={() => executeAction(act)}
                    disabled={!canAffordHours}
                    className={`w-full py-1.5 px-3 rounded font-pixel text-[9px] sierra-btn flex items-center justify-center gap-2 cursor-pointer ${
                      canAffordHours
                        ? 'bg-amber-600 hover:bg-amber-500 text-slate-950 border-amber-300'
                        : 'bg-slate-800 text-slate-600 border-slate-700 cursor-not-allowed'
                    }`}
                  >
                    <span>
                      {canAffordHours ? `▶ Realizar Acción (-${act.hoursCost} hs)` : 'Horas insuficientes'}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#0d101a] border-t border-slate-800 flex items-center justify-between font-mono text-xs">
          <span className="text-slate-400">
            Reloj Semanal: <strong className="text-cyan-300 font-bold">{hoursRemaining} hs</strong>
          </span>
          <button
            onClick={closeLocationModal}
            className="sierra-btn px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600 cursor-pointer"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};
