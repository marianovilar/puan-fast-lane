import React from 'react';
import { useGame } from '../context/GameContext';
import { ARCHETYPES } from '../constants/archetypes';
import { PixelCharacter } from './pixel/PixelCharacter';
import { 
  GraduationCap, 
  Sparkles, 
  Clock, 
  Heart, 
  Target, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';

export const CharacterSelect: React.FC = () => {
  const { selectArchetype } = useGame();
  const archetypesList = Object.values(ARCHETYPES);

  return (
    <div className="min-h-screen w-full bg-[#080a12] text-slate-100 flex flex-col justify-between p-3 sm:p-6 select-none relative">
      {/* Retro CRT scanlines overlay */}
      <div className="absolute inset-0 crt-scanlines opacity-25 pointer-events-none" />

      {/* Top Banner / Retro Title */}
      <div className="max-w-5xl mx-auto text-center mb-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/20 border-2 border-amber-500/50 text-amber-300 font-pixel text-[9px] uppercase mb-3 tracking-widest shadow">
          <GraduationCap className="w-4 h-4" />
          <span>SIERRA ON-LINE (1990) PRESENTA • PUÁN 480</span>
        </div>

        <h1 className="font-pixel text-2xl sm:text-4xl lg:text-5xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 drop-shadow-lg mb-3">
          THE PUÁN LANE
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 font-mono max-w-2xl mx-auto leading-relaxed">
          Simulador de gestión y supervivencia académica en Filosofía y Letras (UBA).
          Inspirado en el clásico <em>Jones in the Fast Lane</em>.
        </p>

        {/* Economy brief box */}
        <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-4 bg-[#121524] border-2 border-[#414d72] px-4 py-1.5 rounded text-xs font-mono text-slate-300 shadow">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span><strong>Economía:</strong> 16 Semanas (40 o 20 hs/sem)</span>
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>Salud Mental &amp; Energía (Burnout &lt; 30%)</span>
          </span>
        </div>
      </div>

      {/* Archetypes Grid with Pixel Sprites */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6 relative z-10">
        {archetypesList.map(arch => {
          return (
            <div
              key={arch.id}
              className="sierra-frame rounded-lg bg-[#181c2d] p-3.5 flex flex-col justify-between transition-all duration-150 hover:shadow-2xl hover:translate-y-[-2px] group"
            >
              <div>
                {/* Character Name & Subtitle */}
                <div className="text-center mb-2">
                  <h3 className="font-pixel text-[11px] sm:text-xs text-amber-300 mb-0.5 leading-tight">
                    {arch.name}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {arch.subtitle}
                  </span>
                </div>

                {/* Pixel Character Preview Box (Authentic Sierra Portrait) */}
                <div className="sierra-inner-frame w-full h-44 rounded overflow-hidden flex items-end justify-center mb-3 bg-[#0d101b] relative shadow-inner">
                  <div className="absolute inset-0 crt-scanlines opacity-20 pointer-events-none" />
                  <PixelCharacter
                    archetypeId={arch.id}
                    currentLocation="aula"
                    mentalHealth={80}
                    energy={80}
                    showSpeechBubble={false}
                    className="w-32 h-40"
                  />
                  <div className="absolute top-1.5 left-1.5 bg-black/75 px-1.5 py-0.5 rounded border border-indigo-700/60 font-pixel text-[7px] text-indigo-300">
                    {arch.badge}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-[11px] text-slate-300 font-sans leading-snug mb-3 italic">
                  "{arch.description}"
                </p>

                {/* Victory Condition */}
                <div className="bg-[#0f121d] border border-amber-900/60 rounded p-2 mb-2.5">
                  <div className="flex items-center gap-1 text-amber-400 font-pixel text-[8px] uppercase mb-1">
                    <Target className="w-3 h-3" />
                    <span>Objetivo de Victoria:</span>
                  </div>
                  <p className="text-[11px] text-slate-200 font-sans leading-snug">
                    {arch.victoryGoal}
                  </p>
                </div>

                {/* Passive & Drawback */}
                <div className="space-y-1.5 text-[10px] font-mono mb-3">
                  <div className="bg-emerald-950/40 border border-emerald-800/60 p-1.5 rounded text-emerald-300">
                    <span className="font-bold flex items-center gap-1 text-[8px] font-pixel text-emerald-400 mb-0.5">
                      <Sparkles className="w-2.5 h-2.5" /> Pasiva:
                    </span>
                    <span className="text-[10px] font-sans">{arch.passiveDesc}</span>
                  </div>

                  <div className="bg-rose-950/40 border border-rose-800/60 p-1.5 rounded text-rose-300">
                    <span className="font-bold flex items-center gap-1 text-[8px] font-pixel text-rose-400 mb-0.5">
                      <AlertTriangle className="w-2.5 h-2.5" /> Desventaja:
                    </span>
                    <span className="text-[10px] font-sans">{arch.drawbackDesc}</span>
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={() => selectArchetype(arch.id)}
                  className="w-full py-2 px-2 rounded font-pixel text-[9px] sierra-btn bg-amber-600 hover:bg-amber-500 text-slate-950 border-amber-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-slate-950" />
                  <span>Elegir Arquetipo</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer credits */}
      <footer className="text-center font-mono text-[10px] text-slate-500 max-w-xl mx-auto relative z-10">
        Inspirado en la vida universitaria de Filosofía y Letras (Puán 480, Caballito) y el motor clásico de Sierra On-Line (1990).
      </footer>
    </div>
  );
};
