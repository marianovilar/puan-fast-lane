import React from 'react';
import { useGame } from '../context/GameContext';
import { Sparkles, Zap, Heart, Clock, Award, Megaphone, Users } from 'lucide-react';

export const RandomEventModal: React.FC = () => {
  const { state, dismissRandomEvent } = useGame();
  const event = state.activeRandomEvent;

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="retro-box-gold w-full max-w-lg bg-[#181c2d] rounded-xl p-5 border-4 border-amber-400 shadow-2xl space-y-4">
        {/* Banner */}
        <div className="flex items-center gap-2.5 pb-2 border-b border-amber-500/60">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 block font-bold">
              SUCESO INESPERADO EN PUÁN (Semana {state.currentWeek})
            </span>
            <h3 className="text-lg font-bold font-mono text-white">
              {event.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm font-sans text-slate-200 leading-relaxed">
          {event.description}
        </p>

        {/* Quote */}
        <blockquote className="bg-[#121420] border-l-4 border-amber-400 p-2.5 rounded text-xs font-mono text-amber-200/90 italic">
          {event.flavorQuote}
        </blockquote>

        {/* Stat impact pills */}
        <div className="flex flex-wrap gap-2 text-xs font-mono pt-1">
          {event.energyDelta !== 0 && (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border ${
              event.energyDelta > 0 
                ? 'bg-emerald-950 text-emerald-300 border-emerald-700' 
                : 'bg-amber-950 text-amber-300 border-amber-700'
            }`}>
              <Zap className="w-3 h-3" />
              <span>{event.energyDelta > 0 ? `+${event.energyDelta}%` : `${event.energyDelta}%`} Energía</span>
            </span>
          )}

          {event.mentalHealthDelta !== 0 && (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border ${
              event.mentalHealthDelta > 0 
                ? 'bg-rose-950 text-rose-300 border-rose-700' 
                : 'bg-red-950 text-red-300 border-red-700'
            }`}>
              <Heart className="w-3 h-3" />
              <span>{event.mentalHealthDelta > 0 ? `+${event.mentalHealthDelta}%` : `${event.mentalHealthDelta}%`} Salud</span>
            </span>
          )}

          {event.hoursDelta && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border bg-cyan-950 text-cyan-300 border-cyan-700">
              <Clock className="w-3 h-3" />
              <span>{event.hoursDelta} hs esta semana</span>
            </span>
          )}

          {event.contactsDelta && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border bg-emerald-950 text-emerald-300 border-emerald-700">
              <Users className="w-3 h-3" />
              <span>+{event.contactsDelta} Contactos</span>
            </span>
          )}

          {event.politicalDelta && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-700">
              <Megaphone className="w-3 h-3" />
              <span>+{event.politicalDelta} Capital Político</span>
            </span>
          )}

          {event.prestigeDelta && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border bg-cyan-950 text-cyan-300 border-cyan-700">
              <Award className="w-3 h-3" />
              <span>+{event.prestigeDelta} Prestigio</span>
            </span>
          )}
        </div>

        {/* Button */}
        <button
          onClick={dismissRandomEvent}
          className="w-full py-2 px-4 rounded font-mono font-bold text-xs uppercase retro-btn bg-amber-600 hover:bg-amber-500 text-slate-900 border-amber-300 shadow cursor-pointer"
        >
          Entendido, continuar la semana
        </button>
      </div>
    </div>
  );
};
