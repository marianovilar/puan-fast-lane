import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { EXAM_CARDS } from '../constants/examQuestions';
import type { ExamCardId } from '../types/game';
import { 
  Award, 
  BookOpen, 
  Sparkles, 
  AlertTriangle, 
  HelpCircle, 
  FileText,
  UserCheck
} from 'lucide-react';

export const ExamModal: React.FC = () => {
  const { state, playExamCard } = useGame();
  const { examState, player } = state;
  const [evaluating, setEvaluating] = useState(false);

  if (!examState || !player) return null;

  const { currentRound, questions, results, subjectTitle, isComplete, finalGrade, isRecuperatorio } = examState;
  const currentQuestion = questions[currentRound - 1];
  const stats = player.stats;
  const isBurnedOut = stats.mentalHealth < 30;

  const handleSelectCard = (cardId: ExamCardId) => {
    if (evaluating || isComplete) return;
    setEvaluating(true);
    setTimeout(() => {
      playExamCard(cardId);
      setEvaluating(false);
    }, 600);
  };

  const getCardIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Award': return <Award className="w-5 h-5" />;
      case 'AlertTriangle': return <AlertTriangle className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="retro-box-gold w-full max-w-3xl bg-[#141824] rounded-xl overflow-hidden flex flex-col max-h-[95vh] border-4 border-amber-500 shadow-2xl">
        {/* Header: Exam Board */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b-2 border-amber-500/80 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] sm:text-xs uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {isRecuperatorio ? 'Instancia de Recuperatorio' : `Mesa de Examen - Semana ${examState.week}`}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Ronda {currentRound} de 3
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold font-mono tracking-wide text-amber-300">
              {subjectTitle}
            </h2>
            <p className="text-xs text-slate-300 font-mono mt-0.5">
              {currentQuestion?.professor || 'Tribunal Docente de Cátedra'}
            </p>
          </div>

          <div className="w-12 h-12 rounded-lg bg-amber-950/60 border border-amber-400 flex items-center justify-center text-amber-300 shadow">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-slate-200">
          {/* Question / Prompt Box */}
          <div className="bg-[#1b2033] border-2 border-indigo-700/60 rounded-lg p-4 shadow-inner relative">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-mono font-bold uppercase mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>Consigna {currentRound} del Parcial ({currentQuestion?.subject}):</span>
            </div>
            <p className="text-sm sm:text-base font-serif text-slate-100 font-medium leading-relaxed mb-3">
              "{currentQuestion?.question}"
            </p>
            <p className="text-xs text-slate-400 font-mono italic">
              {currentQuestion?.context}
            </p>
          </div>

          {/* Cards Already Played Summary */}
          {results.length > 0 && (
            <div className="bg-[#10131d] border border-slate-800 rounded-lg p-3 space-y-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide block">
                Calificaciones de Rondas Previas:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {results.map((res, i) => (
                  <div 
                    key={i} 
                    className="bg-[#161a29] border border-slate-700 p-2 rounded text-xs font-mono flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-400">Ronda {res.round}:</span>
                      <span className={`font-bold text-sm ${res.grade >= 7 ? 'text-emerald-400' : res.grade >= 4 ? 'text-amber-300' : 'text-red-400'}`}>
                        Nota: {res.grade}
                      </span>
                    </div>
                    <span className="text-slate-300 text-[11px] truncate font-sans">
                      {res.cardName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* If Exam is in Progress: Select Card */}
          {!isComplete && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Elige tu Estrategia de Respuesta:
                </h4>
                {isBurnedOut && (
                  <span className="text-xs text-red-400 font-mono font-bold animate-pulse flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    ¡Salud &lt; 30%! Laguna Mental presente
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EXAM_CARDS.map(card => {
                  let isAvailable = true;
                  let requirementNote = '';

                  if (card.id === 'rigurosa') {
                    if (stats.readingProgress < 15) {
                      isAvailable = false;
                      requirementNote = `Requiere ≥ 15% lectura fichada (tienes ${stats.readingProgress}%)`;
                    }
                  } else if (card.id === 'cita_erudita') {
                    if (stats.academicPrestige < 40) {
                      isAvailable = false;
                      requirementNote = `Requiere ≥ 40 pts Prestigio en Instituto (tienes ${stats.academicPrestige})`;
                    }
                  } else if (card.id === 'laguna_mental') {
                    // Laguna mental is always available if burned out
                    if (!isBurnedOut) {
                      isAvailable = false;
                      requirementNote = 'Solo se activa en estado de Burnout o pánico';
                    }
                  }

                  const isRecommendedForBurnout = isBurnedOut && card.id === 'laguna_mental';

                  return (
                    <div
                      key={card.id}
                      onClick={() => isAvailable && handleSelectCard(card.id)}
                      className={`relative border-2 rounded-lg p-3.5 flex flex-col justify-between transition-all ${
                        isRecommendedForBurnout
                          ? 'border-red-500 bg-red-950/40 shadow-lg ring-2 ring-red-500/60'
                          : isAvailable
                          ? 'border-slate-700 hover:border-amber-400 bg-[#181d2e] hover:bg-[#20273d] cursor-pointer hover:shadow-md'
                          : 'border-slate-800 bg-[#12141e] opacity-45 cursor-not-allowed'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-8 h-8 rounded flex items-center justify-center text-white"
                              style={{ backgroundColor: card.color }}
                            >
                              {getCardIcon(card.icon)}
                            </div>
                            <h5 className="font-bold text-sm sm:text-base text-slate-100 font-mono">
                              {card.name}
                            </h5>
                          </div>
                          {isAvailable && (
                            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                              Disponible
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-amber-300/90 font-mono mb-2">
                          {card.tagline}
                        </p>
                        <p className="text-xs text-slate-300 font-sans leading-relaxed">
                          {card.description}
                        </p>
                      </div>

                      {/* Requirement note or action button */}
                      <div className="mt-3 pt-2 border-t border-slate-800">
                        {requirementNote ? (
                          <span className="text-[11px] text-amber-400/90 font-mono block italic">
                            ⚠️ {requirementNote}
                          </span>
                        ) : (
                          <button
                            type="button"
                            disabled={evaluating}
                            className={`w-full py-1.5 px-3 rounded text-xs font-mono font-bold retro-btn cursor-pointer ${
                              card.id === 'laguna_mental'
                                ? 'bg-red-700 text-white border-red-400'
                                : 'bg-amber-600 hover:bg-amber-500 text-slate-900 border-amber-300'
                            }`}
                          >
                            {evaluating ? 'Evaluando...' : `Jugar Carta "${card.name}"`}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Exam Completed Verdict */}
          {isComplete && finalGrade !== undefined && (
            <div className="bg-[#121522] border-2 border-amber-500/80 rounded-xl p-5 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 border-2 border-amber-400 shadow-lg mx-auto">
                {finalGrade >= 4 ? (
                  <UserCheck className="w-8 h-8 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                )}
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-1">
                  Acta de Calificación Final
                </span>
                <div className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${
                  finalGrade >= 7 ? 'text-emerald-400' : finalGrade >= 4 ? 'text-amber-300' : 'text-red-400'
                }`}>
                  {finalGrade}
                </div>
                <div className="mt-2 text-sm sm:text-base font-bold font-mono">
                  {finalGrade >= 4 ? (
                    <span className="text-emerald-300">¡PARCIAL APROBADO! Regularidad conservada.</span>
                  ) : (
                    <span className="text-red-400">DESAPROBADO. Derivado a instancia de Recuperatorio.</span>
                  )}
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-300 font-sans max-w-lg mx-auto bg-slate-900/80 p-3 rounded border border-slate-800">
                {results[results.length - 1]?.feedback}
              </div>

              <div className="pt-2 text-xs font-mono text-slate-400">
                {finalGrade >= 4 
                  ? 'Retomando el ritmo del cuatrimestre en unos segundos...' 
                  : isRecuperatorio 
                  ? 'Determinando condición final de cursada...' 
                  : 'Iniciando mesa de recuperatorio...'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
