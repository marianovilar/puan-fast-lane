import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import confetti from 'canvas-confetti';
import { 
  Award, 
  RotateCcw, 
  AlertOctagon, 
  FileCheck 
} from 'lucide-react';

export const GameOverModal: React.FC = () => {
  const { state, restartGame } = useGame();
  const { phase, gameOverReason, victoryDetails, player } = state;

  const isVictory = phase === 'VICTORY';
  const isGameOver = phase === 'GAME_OVER';

  useEffect(() => {
    if (isVictory) {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#ffffff'],
        });
      } catch {
        // Confetti fallback
      }
    }
  }, [isVictory]);

  if (!isVictory && !isGameOver) return null;
  if (!player) return null;

  const { stats, archetype } = player;
  const attendancePercent = Math.round((stats.attendanceWeeks.length / 16) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in zoom-in-95 duration-200">
      <div className={`retro-box-gold w-full max-w-2xl bg-[#141825] rounded-xl overflow-hidden flex flex-col border-4 shadow-2xl ${
        isVictory ? 'border-amber-400' : 'border-red-600'
      }`}>
        {/* Header */}
        <div className={`p-5 text-center text-white border-b-2 ${
          isVictory 
            ? 'bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 border-amber-300' 
            : 'bg-gradient-to-r from-red-900 via-rose-950 to-red-900 border-red-500'
        }`}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/40 border-2 border-white/40 mb-2 shadow">
            {isVictory ? (
              <Award className="w-8 h-8 text-amber-300" />
            ) : (
              <AlertOctagon className="w-8 h-8 text-red-400" />
            )}
          </div>

          <span className="text-xs uppercase font-mono tracking-widest text-slate-200 block mb-1">
            {isVictory ? 'UNIVERSIDAD DE BUENOS AIRES • FACULTAD DE FILOSOFÍA Y LETRAS' : 'RESOLUCIÓN ACADÉMICA • RÉGIMEN DE CURSADA'}
          </span>

          <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-wide drop-shadow">
            {isVictory ? victoryDetails?.title : 'FIN DE LA CURSADA (GAME OVER)'}
          </h2>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-5 text-slate-200 overflow-y-auto max-h-[70vh]">
          {/* Main Resolution / Description */}
          <div className={`p-4 rounded-lg border font-mono text-xs sm:text-sm leading-relaxed ${
            isVictory 
              ? 'bg-amber-950/40 border-amber-500/60 text-amber-200' 
              : 'bg-red-950/40 border-red-500/60 text-red-200'
          }`}>
            {isVictory ? victoryDetails?.summary : gameOverReason}
          </div>

          {/* Academic Semester Transcript / Final Report */}
          <div className="bg-[#10131e] border border-slate-800 rounded-lg p-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <FileCheck className="w-4 h-4 text-cyan-400" />
              <span>Boletín de Desempeño del Cuatrimestre:</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="bg-[#181c2c] p-2 rounded border border-slate-700/80">
                <span className="text-slate-400 block text-[10px]">Arquetipo:</span>
                <span className="font-bold text-amber-300">{archetype.name}</span>
              </div>

              <div className="bg-[#181c2c] p-2 rounded border border-slate-700/80">
                <span className="text-slate-400 block text-[10px]">Asistencia:</span>
                <span className={`font-bold ${attendancePercent >= 75 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stats.attendanceWeeks.length}/16 ({attendancePercent}%)
                </span>
              </div>

              <div className="bg-[#181c2c] p-2 rounded border border-slate-700/80">
                <span className="text-slate-400 block text-[10px]">Salud Mental Final:</span>
                <span className={`font-bold ${stats.mentalHealth >= 50 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stats.mentalHealth}%
                </span>
              </div>

              <div className="bg-[#181c2c] p-2 rounded border border-slate-700/80">
                <span className="text-slate-400 block text-[10px]">Primer Parcial:</span>
                <span className="font-bold text-cyan-300">
                  {stats.grades.exam1Recup ?? stats.grades.exam1 ?? 'N/A'}
                  {stats.grades.exam1Recup && ' (Recup)'}
                </span>
              </div>

              <div className="bg-[#181c2c] p-2 rounded border border-slate-700/80">
                <span className="text-slate-400 block text-[10px]">Segundo Parcial:</span>
                <span className="font-bold text-cyan-300">
                  {stats.grades.exam2Recup ?? stats.grades.exam2 ?? 'N/A'}
                  {stats.grades.exam2Recup && ' (Recup)'}
                </span>
              </div>

              <div className="bg-[#181c2c] p-2 rounded border border-slate-700/80">
                <span className="text-slate-400 block text-[10px]">Métrica Clave:</span>
                <span className="font-bold text-slate-100">
                  {archetype.id === 'conicet' ? `${stats.academicPrestige} Prestigio` :
                   archetype.id === 'militante' ? `${stats.politicalCapital} Cap. Político` :
                   archetype.id === 'poeta' ? `${stats.patioContacts} Contactos` :
                   `${stats.mentalHealth}% Salud`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0e111a] border-t border-slate-800 flex justify-center">
          <button
            onClick={restartGame}
            className="retro-btn py-2.5 px-6 rounded text-xs sm:text-sm font-mono font-bold bg-amber-600 hover:bg-amber-500 text-slate-900 border-amber-300 flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <RotateCcw className="w-4 h-4 text-slate-900" />
            <span>{isVictory ? 'Iniciar Nueva Partida con Otro Personaje' : 'Volver a Intentar el Semestre'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
