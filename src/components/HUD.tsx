import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { sound } from '../audio/soundEffects';
import { 
  Clock, 
  Heart, 
  Zap, 
  Calendar, 
  Volume2, 
  VolumeX, 
  AlertTriangle, 
  CheckCircle2, 
  Award, 
  Users, 
  Megaphone,
  Briefcase,
  ChevronRight,
  BookOpen
} from 'lucide-react';

export const HUD: React.FC = () => {
  const { state, advanceWeekManual } = useGame();
  const [soundEnabled, setSoundEnabled] = useState(sound.enabled);

  if (!state.player) return null;

  const { player, currentWeek, hoursRemaining, maxWeeklyHours } = state;
  const { stats, archetype } = player;

  const toggleAudio = () => {
    const newState = sound.toggle();
    setSoundEnabled(newState);
  };

  const attendanceCount = stats.attendanceWeeks.length;
  const attendancePercent = Math.round((attendanceCount / 16) * 100);
  const attendanceColor = attendancePercent >= 75 ? 'text-emerald-400' : 'text-amber-400';

  const isLowMentalHealth = stats.mentalHealth < 30;
  const isZeroMental = stats.mentalHealth <= 0;

  return (
    <header className="w-full bg-[#131726] border-b-4 border-[#414b6e] shadow-2xl px-3 py-2 sm:px-6 sm:py-2.5 text-slate-100 select-none">
      {/* Top row: Archetype info, Week, Clock, and Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Player Persona */}
        <div className="flex items-center gap-2.5">
          <div className="w-11 h-11 rounded bg-indigo-950 border-2 border-indigo-400 flex items-center justify-center text-2xl shadow-inner">
            {archetype.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[11px] sm:text-xs text-amber-300 tracking-wide">
                {archetype.name}
              </span>
              <span className="hidden sm:inline-block font-mono text-[10px] bg-indigo-950 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-700/60">
                {archetype.badge}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 italic font-mono hidden md:block">
              {archetype.subtitle}
            </p>
          </div>
        </div>

        {/* Center: Week & Time Budget Clock */}
        <div className="flex items-center gap-3 sm:gap-4 bg-[#0e111c] border-2 border-[#384160] px-3 py-1.5 rounded shadow-inner">
          {/* Week counter */}
          <div className="flex items-center gap-1.5 border-r border-slate-700 pr-3">
            <Calendar className="w-4 h-4 text-amber-400" />
            <div className="text-left font-mono">
              <span className="text-[9px] text-slate-400 block uppercase font-pixel leading-none">Semana</span>
              <span className="font-pixel text-xs sm:text-sm text-amber-400">
                {currentWeek} <span className="text-[10px] text-slate-500 font-normal">/16</span>
              </span>
            </div>
          </div>

          {/* Clock */}
          <div className="flex items-center gap-2">
            <Clock className={`w-4 h-4 ${hoursRemaining <= 5 ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`} />
            <div className="text-left font-mono">
              <span className="text-[9px] text-slate-400 block uppercase font-pixel leading-none">Presupuesto</span>
              <span className={`font-pixel text-xs sm:text-sm ${hoursRemaining <= 5 ? 'text-red-400' : 'text-cyan-300'}`}>
                {hoursRemaining} <span className="text-[10px] text-slate-400 font-normal">/ {maxWeeklyHours} hs</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Sound toggle and Next Turn Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAudio}
            title={soundEnabled ? 'Silenciar Efectos' : 'Activar Sonidos'}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 hover:text-white transition cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          <button
            onClick={advanceWeekManual}
            title="Terminar la semana anticipadamente"
            className="sierra-btn bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-3 py-1.5 text-[9px] sm:text-[10px] flex items-center gap-1.5 rounded cursor-pointer"
          >
            <span>Cerrar Semana</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Middle row: Biological and Mental Resources (Health & Energy) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-2.5 pt-2 border-t border-slate-800">
        {/* Mental Health Bar */}
        <div className="bg-[#0e111c] border border-slate-800 p-2 rounded">
          <div className="flex justify-between items-center font-mono mb-1">
            <span className="flex items-center gap-1 font-pixel text-[9px] text-rose-400">
              <Heart className={`w-3.5 h-3.5 ${isLowMentalHealth ? 'animate-bounce text-red-500' : ''}`} />
              Salud Mental
            </span>
            <span className={`font-pixel text-[10px] ${isLowMentalHealth ? 'text-red-400' : 'text-slate-300'}`}>
              {stats.mentalHealth}%
              {isLowMentalHealth && (
                <span className="ml-1.5 text-[8px] bg-red-950 text-red-300 px-1 py-0.2 rounded border border-red-800 animate-pulse font-pixel">
                  BURNOUT
                </span>
              )}
            </span>
          </div>
          <div className="w-full h-3 bg-slate-950 rounded border border-slate-800 overflow-hidden relative">
            <div
              className={`h-full transition-all duration-300 ${
                isZeroMental
                  ? 'bg-red-800'
                  : isLowMentalHealth
                  ? 'bg-gradient-to-r from-red-600 to-amber-500'
                  : 'bg-gradient-to-r from-rose-500 to-pink-500'
              }`}
              style={{ width: `${stats.mentalHealth}%` }}
            />
          </div>
        </div>

        {/* Physical Energy Bar */}
        <div className="bg-[#0e111c] border border-slate-800 p-2 rounded">
          <div className="flex justify-between items-center font-mono mb-1">
            <span className="flex items-center gap-1 font-pixel text-[9px] text-amber-400">
              <Zap className="w-3.5 h-3.5" />
              Energía Física
            </span>
            <span className="font-pixel text-[10px] text-slate-300">{stats.energy}%</span>
          </div>
          <div className="w-full h-3 bg-slate-950 rounded border border-slate-800 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-300"
              style={{ width: `${stats.energy}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom row: Archetype Objectives & Academic Progress Badges */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono bg-[#0c0e17] px-3 py-1.5 rounded border border-slate-800/80">
        {/* Attendance counter */}
        <div className="flex items-center gap-1.5" title="Mínimo 75% para no quedar libre">
          <CheckCircle2 className={`w-3.5 h-3.5 ${attendanceColor}`} />
          <span className="text-slate-400">Prácticos:</span>
          <span className={`font-bold ${attendanceColor}`}>
            {attendanceCount}/16 ({attendancePercent}%)
          </span>
          {attendancePercent < 75 && (
            <span className="text-[10px] text-amber-400/90 hidden lg:inline">
              [Min 75%]
            </span>
          )}
        </div>

        {/* Reading progress */}
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-slate-400">Lectura Fichada:</span>
          <span className="font-bold text-blue-300">{stats.readingProgress}%</span>
        </div>

        {/* Archetype specific metric */}
        {archetype.id === 'conicet' && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1" title="Meta: ≥ 300 pts">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400">Prestigio:</span>
              <span className="font-bold text-cyan-300">{stats.academicPrestige} / 300</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-slate-400">Adscripción:</span>
              <span className={stats.adscriptionCompleted ? 'text-emerald-400 font-bold' : 'text-amber-300'}>
                {stats.adscriptionCompleted ? '✓ Completa' : `${stats.adscriptionProgress}%`}
              </span>
            </div>
          </div>
        )}

        {archetype.id === 'militante' && (
          <div className="flex items-center gap-1" title="Meta: ≥ 1000 pts para ganar elecciones">
            <Megaphone className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-slate-400">Capital Político:</span>
            <span className="font-bold text-rose-300">{stats.politicalCapital} / 1000</span>
          </div>
        )}

        {archetype.id === 'laburante' && (
          <div className="flex items-center gap-1" title="Meta: Semestre aprobado con Salud Mental ≥ 60%">
            <Briefcase className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Jornada 20hs | Meta Salud:</span>
            <span className={stats.mentalHealth >= 60 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
              {stats.mentalHealth}% / ≥60%
            </span>
          </div>
        )}

        {archetype.id === 'poeta' && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1" title="Meta: ≥ 500 Contactos">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400">Contactos:</span>
              <span className="font-bold text-emerald-300">{stats.patioContacts} / 500</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-slate-400">Meta Salud:</span>
              <span className={stats.mentalHealth >= 85 ? 'text-emerald-400 font-bold' : 'text-amber-300'}>
                {stats.mentalHealth}% / ≥85%
              </span>
            </div>
          </div>
        )}

        {/* Parciales status */}
        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-slate-500">Parcial 1:</span>
          <span className={stats.grades.exam1 !== undefined ? (stats.grades.exam1 >= 4 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold') : 'text-slate-400'}>
            {stats.grades.exam1 !== undefined ? (stats.grades.exam1Recup ?? stats.grades.exam1) : 'Sem 8'}
          </span>
          <span className="text-slate-500">| Parcial 2:</span>
          <span className={stats.grades.exam2 !== undefined ? (stats.grades.exam2 >= 4 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold') : 'text-slate-400'}>
            {stats.grades.exam2 !== undefined ? (stats.grades.exam2Recup ?? stats.grades.exam2) : 'Sem 16'}
          </span>
        </div>
      </div>

      {/* Burnout warning banner if mental health < 30% */}
      {isLowMentalHealth && (
        <div className="mt-2 bg-red-950/80 border border-red-700/80 rounded px-3 py-1 flex items-center justify-between text-xs text-red-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="text-[11px] font-mono">
              <strong className="font-pixel text-[9px] text-red-300">¡BURNOUT ACTIVO!</strong> Lectura al 50%. En exámenes se fuerza <em>"Laguna Mental"</em>. ¡Pasa por Casa a dormir o por el Patio!
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
