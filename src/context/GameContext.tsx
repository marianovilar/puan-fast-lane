import React, { createContext, useContext, useState } from 'react';
import type { 
  GameState, 
  Player, 
  Archetype, 
  LocationId, 
  GameAction, 
  ExamState, 
  ExamCardId, 
  LogEntry, 
  RandomEvent,
  ExamRoundResult
} from '../types/game';
import { ARCHETYPES } from '../constants/archetypes';
import { LOCATIONS } from '../constants/locations';
import { 
  EXAM_1_QUESTIONS, 
  EXAM_2_QUESTIONS, 
  RECUPERATORIO_QUESTIONS 
} from '../constants/examQuestions';
import { RANDOM_EVENTS } from '../constants/randomEvents';
import { sound } from '../audio/soundEffects';

interface GameContextType {
  state: GameState;
  selectArchetype: (archetypeId: string) => void;
  travelTo: (locationId: LocationId) => void;
  executeAction: (action: GameAction) => void;
  openLocationModal: (locationId: LocationId) => void;
  closeLocationModal: () => void;
  dismissRandomEvent: () => void;
  playExamCard: (cardId: ExamCardId) => void;
  advanceWeekManual: () => void;
  restartGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>({
    phase: 'SELECT_ARCHETYPE',
    currentWeek: 1,
    hoursRemaining: 40,
    maxWeeklyHours: 40,
    currentLocation: 'casa',
    player: null,
    examState: null,
    activeLocationModal: null,
    activeRandomEvent: null,
    eventLogs: [],
    gameOverReason: null,
    victoryDetails: null,
  });

  const addLog = (message: string, type: LogEntry['type'] = 'action') => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      week: state.currentWeek,
      type,
      message,
      timeString: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
    setState(prev => ({
      ...prev,
      eventLogs: [newLog, ...prev.eventLogs.slice(0, 49)],
    }));
  };

  // Start game with selected archetype
  const selectArchetype = (archetypeId: string) => {
    const archetype: Archetype | undefined = ARCHETYPES[archetypeId];
    if (!archetype) return;

    sound.playClick();
    const initialPlayer: Player = {
      archetype,
      stats: {
        mentalHealth: 80,
        energy: 80,
        readingProgress: 0,
        examPrep: 0,
        comprehension: 0,
        attendanceWeeks: [],
        politicalCapital: 0,
        academicPrestige: 0,
        patioContacts: 0,
        adscriptionProgress: 0,
        adscriptionCompleted: false,
        grades: {},
        exam1Passed: null,
        exam2Passed: null,
        consecutiveZeroMentalHealth: 0,
        isBurnedOut: false,
        isCollapsed: false,
      },
    };

    setState({
      phase: 'PLAYING',
      currentWeek: 1,
      hoursRemaining: archetype.baseHours,
      maxWeeklyHours: archetype.baseHours,
      currentLocation: 'casa',
      player: initialPlayer,
      examState: null,
      activeLocationModal: null,
      activeRandomEvent: null,
      eventLogs: [
        {
          id: 'init-1',
          week: 1,
          type: 'system',
          message: `Has comenzado el semestre en Puán como "${archetype.name}" (${archetype.subtitle}).`,
          timeString: '08:00:00',
        },
        {
          id: 'init-2',
          week: 1,
          type: 'system',
          message: `Objetivo de Victoria: ${archetype.victoryGoal}`,
          timeString: '08:00:01',
        },
      ],
      gameOverReason: null,
      victoryDetails: null,
    });
  };

  // Travel calculation
  const travelTo = (targetLocationId: LocationId) => {
    if (!state.player) return;
    if (state.currentLocation === targetLocationId) {
      return;
    }

    const currentLoc = LOCATIONS[state.currentLocation];
    const targetLoc = LOCATIONS[targetLocationId];

    // Travel hours cost:
    // Moving Casa <-> Faculty: 2 hours
    // Moving between faculty locations: 0.5 hours
    const isToOrFromCasa = !currentLoc.isFaculty || !targetLoc.isFaculty;
    const travelCost = isToOrFromCasa ? 2 : 0.5;

    if (state.hoursRemaining < travelCost) {
      sound.playWarning();
      addLog(`No tienes tiempo suficiente (${travelCost} hs) para trasladarte a ${targetLoc.name} esta semana.`, 'warning');
      return;
    }

    sound.playTravel();
    const remainingHours = state.hoursRemaining - travelCost;

    addLog(
      isToOrFromCasa 
        ? `Viajaste entre Casa y la Facultad de Filosofía y Letras (-${travelCost} hs de viaje).` 
        : `Caminaste por los pasillos hacia ${targetLoc.name} (-${travelCost} hs).`,
      'travel'
    );

    setState(prev => ({
      ...prev,
      currentLocation: targetLocationId,
      hoursRemaining: remainingHours,
      activeLocationModal: null,
    }));

    if (remainingHours <= 0) {
      handleAdvanceWeek(true);
    }
  };

  // Open modal / travel directly
  const openLocationModal = (locationId: LocationId) => {
    sound.playClick();
    if (state.currentLocation !== locationId) {
      travelTo(locationId);
    }
  };

  const closeLocationModal = () => {
    sound.playClick();
    setState(prev => ({ ...prev, activeLocationModal: null }));
  };

  const dismissRandomEvent = () => {
    sound.playClick();
    setState(prev => ({ ...prev, activeRandomEvent: null }));
  };

  // Execute an action in the current location
  const executeAction = (action: GameAction) => {
    if (!state.player) return;

    if (state.hoursRemaining < action.hoursCost) {
      sound.playWarning();
      addLog(`No dispones de ${action.hoursCost} hs para realizar "${action.name}". Te quedan ${state.hoursRemaining} hs.`, 'warning');
      return;
    }

    const archetypeId = state.player.archetype.id;
    let energyDelta = action.benefits.energyDelta ?? 0;
    let mentalDelta = action.benefits.mentalHealthDelta ?? 0;
    let readingGain = action.benefits.readingProgress ?? 0;
    let examPrepGain = action.benefits.examPrep ?? 0;
    let prestigeGain = action.benefits.academicPrestige ?? 0;
    let politicalGain = action.benefits.politicalCapital ?? 0;
    let contactsGain = action.benefits.patioContacts ?? 0;
    let comprehensionGain = action.benefits.comprehension ?? 0;
    let adscriptionGain = action.benefits.adscriptionProgress ?? 0;

    // Archetype modifiers:
    // 1. CONICET: +30% efficiency in study and research
    if (archetypeId === 'conicet') {
      if (readingGain > 0) readingGain = Math.round(readingGain * 1.3);
      if (examPrepGain > 0) examPrepGain = Math.round(examPrepGain * 1.3);
      if (prestigeGain > 0) prestigeGain = Math.round(prestigeGain * 1.3);
      if (adscriptionGain > 0) adscriptionGain = Math.round(adscriptionGain * 1.3);
    }

    // 2. Militante: x2 political capital & contacts in CEFyL and Patio; studying in Biblioteca costs 2x mental health
    if (archetypeId === 'militante') {
      if (politicalGain > 0) politicalGain = politicalGain * 2;
      if (contactsGain > 0) contactsGain = contactsGain * 2;
      if (state.currentLocation === 'biblioteca') {
        mentalDelta -= 15; // Double mental drain studying in library
      }
    }

    // 3. Poeta de pasillo: x2 mental health recovery in Patio; +50% energy drain starting actions in Aula or Biblioteca
    if (archetypeId === 'poeta') {
      if (state.currentLocation === 'patio' && mentalDelta > 0) {
        mentalDelta = mentalDelta * 2;
      }
      if (state.currentLocation === 'aula' || state.currentLocation === 'biblioteca') {
        if (energyDelta < 0) {
          energyDelta = Math.round(energyDelta * 1.5); // Procrastination penalty
        }
      }
    }

    // Burnout Penalty: If Mental Health < 30%, library reading speed cut by 50%
    const isBurnedOut = state.player.stats.mentalHealth < 30;
    if (isBurnedOut && readingGain > 0) {
      readingGain = Math.round(readingGain * 0.5);
      addLog('¡Penalización por Burnout activo! Tu velocidad de lectura se redujo al 50%.', 'warning');
    }

    // Calculate new stats
    const currentStats = state.player.stats;
    const newEnergy = Math.min(100, Math.max(0, currentStats.energy + energyDelta));
    const newMentalHealth = Math.min(100, Math.max(0, currentStats.mentalHealth + mentalDelta));
    const newAttendanceWeeks = action.benefits.attendance && !currentStats.attendanceWeeks.includes(state.currentWeek)
      ? [...currentStats.attendanceWeeks, state.currentWeek]
      : currentStats.attendanceWeeks;

    const newAdscriptionProgress = Math.min(100, currentStats.adscriptionProgress + adscriptionGain);
    const adscriptionCompleted = currentStats.adscriptionCompleted || newAdscriptionProgress >= 100;

    const randomFlavor = action.flavorTexts[Math.floor(Math.random() * action.flavorTexts.length)];
    sound.playAction();

    const hoursLeft = state.hoursRemaining - action.hoursCost;

    addLog(`[${action.name}] - ${randomFlavor}`, 'action');

    setState(prev => {
      if (!prev.player) return prev;
      return {
        ...prev,
        hoursRemaining: hoursLeft,
        player: {
          ...prev.player,
          stats: {
            ...prev.player.stats,
            energy: newEnergy,
            mentalHealth: newMentalHealth,
            readingProgress: Math.min(100, currentStats.readingProgress + readingGain),
            examPrep: Math.min(100, currentStats.examPrep + examPrepGain),
            comprehension: Math.min(100, currentStats.comprehension + comprehensionGain),
            politicalCapital: currentStats.politicalCapital + politicalGain,
            academicPrestige: currentStats.academicPrestige + prestigeGain,
            patioContacts: currentStats.patioContacts + contactsGain,
            adscriptionProgress: newAdscriptionProgress,
            adscriptionCompleted,
            attendanceWeeks: newAttendanceWeeks,
            isBurnedOut: newMentalHealth < 30,
          },
        },
      };
    });

    if (hoursLeft <= 0) {
      handleAdvanceWeek(true);
    }
  };

  // Week advance logic
  const handleAdvanceWeek = (auto = false) => {
    if (!state.player) return;

    sound.playWeekAdvance();
    const nextWeek = state.currentWeek + 1;
    const currentStats = state.player.stats;

    // Check burnout consecutive zero mental health
    let consecutiveZeros = currentStats.consecutiveZeroMentalHealth;
    if (currentStats.mentalHealth <= 0) {
      consecutiveZeros += 1;
    } else {
      consecutiveZeros = 0;
    }

    if (consecutiveZeros >= 2) {
      sound.playGameOver();
      setState(prev => ({
        ...prev,
        phase: 'GAME_OVER',
        gameOverReason: 'BURNOUT TOTAL: Has alcanzado el 0% de Salud Mental durante dos semanas consecutivas. Por prescripción psiquiátrica y agotamiento irreversible, has abandonado la carrera.',
      }));
      return;
    }

    // If 0% mental health or energy, collapse for next turn
    let isCollapsed = false;
    let nextHours = state.maxWeeklyHours;
    if (currentStats.mentalHealth <= 0 || currentStats.energy <= 0) {
      isCollapsed = true;
      nextHours = 0; // Bedridden whole week
      addLog('¡COLAPSO POR ESTRÉS! Pasaste la semana entera en cama sin poder levantarte ni pisar la facultad.', 'warning');
      sound.playWarning();
    }

    // Check if next week is Midterm 1 (Week 8) or Midterm 2 (Week 16)
    if (nextWeek === 8 && state.player.stats.exam1Passed === null) {
      triggerExam(8, false);
      return;
    }

    if (nextWeek === 16 && state.player.stats.exam2Passed === null) {
      triggerExam(16, false);
      return;
    }

    // Check if semester ended (completed week 16)
    if (state.currentWeek >= 16) {
      evaluateFinalSemester();
      return;
    }

    // Normal week advance
    // Maybe trigger a random Puán event
    const shouldTriggerEvent = Math.random() < 0.45;
    let chosenEvent: RandomEvent | null = null;
    if (shouldTriggerEvent && !isCollapsed) {
      chosenEvent = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
      applyRandomEvent(chosenEvent);
    }

    addLog(
      auto 
        ? `Fin de semana ${state.currentWeek}. El reloj llegó a 0 hs. Avanzando a la Semana ${nextWeek}.`
        : `Decidiste cerrar la Semana ${state.currentWeek} y comenzar la Semana ${nextWeek}.`,
      'system'
    );

    setState(prev => {
      if (!prev.player) return prev;
      return {
        ...prev,
        currentWeek: nextWeek,
        hoursRemaining: nextHours,
        activeLocationModal: null,
        activeRandomEvent: chosenEvent,
        player: {
          ...prev.player,
          stats: {
            ...prev.player.stats,
            consecutiveZeroMentalHealth: consecutiveZeros,
            isCollapsed,
            energy: isCollapsed ? 40 : Math.min(100, prev.player.stats.energy + 10),
            mentalHealth: isCollapsed ? 35 : prev.player.stats.mentalHealth,
          },
        },
      };
    });
  };

  const advanceWeekManual = () => {
    handleAdvanceWeek(false);
  };

  const applyRandomEvent = (event: RandomEvent) => {
    if (!state.player) return;
    const isLaburante = state.player.archetype.id === 'laburante';
    
    // Laburante passive: immune to negative mental health events
    const mentalDelta = (isLaburante && event.mentalHealthDelta < 0) 
      ? 0 
      : event.mentalHealthDelta;

    addLog(`[Evento Inesperado: ${event.title}] ${event.description}`, 'event');

    setState(prev => {
      if (!prev.player) return prev;
      const stats = prev.player.stats;
      return {
        ...prev,
        hoursRemaining: Math.max(0, prev.hoursRemaining + (event.hoursDelta ?? 0)),
        player: {
          ...prev.player,
          stats: {
            ...stats,
            energy: Math.min(100, Math.max(0, stats.energy + event.energyDelta)),
            mentalHealth: Math.min(100, Math.max(0, stats.mentalHealth + mentalDelta)),
            politicalCapital: stats.politicalCapital + (event.politicalDelta ?? 0),
            academicPrestige: stats.academicPrestige + (event.prestigeDelta ?? 0),
            patioContacts: stats.patioContacts + (event.contactsDelta ?? 0),
          },
        },
      };
    });
  };

  // Trigger exam minigame
  const triggerExam = (week: 8 | 16, isRecuperatorio: boolean) => {
    const questions = isRecuperatorio 
      ? RECUPERATORIO_QUESTIONS 
      : (week === 8 ? EXAM_1_QUESTIONS : EXAM_2_QUESTIONS);

    const subjectTitle = week === 8 
      ? 'Primer Parcial: Teoría y Crítica Filosófica' 
      : 'Segundo Parcial: Epistemología y Discurso';

    const exam: ExamState = {
      week,
      isRecuperatorio,
      subjectTitle: isRecuperatorio ? `Recuperatorio: ${subjectTitle}` : subjectTitle,
      currentRound: 1,
      questions,
      results: [],
      isComplete: false,
    };

    addLog(`¡Atención! Ha comenzado el ${exam.subjectTitle}. Mesa de examen abierta.`, 'exam');

    setState(prev => ({
      ...prev,
      phase: isRecuperatorio ? 'RECUPERATORIO' : 'EXAM',
      examState: exam,
      activeLocationModal: null,
    }));
  };

  // Play a card during the exam
  const playExamCard = (cardId: ExamCardId) => {
    if (!state.examState || !state.player) return;

    sound.playExamCard();
    const currentRound = state.examState.currentRound;
    const currentQuestion = state.examState.questions[currentRound - 1];
    const stats = state.player.stats;
    const archetype = state.player.archetype.id;

    let grade = 7.0;
    let feedback = '';

    switch (cardId) {
      case 'rigurosa': {
        const compBonus = (stats.comprehension / 100) * 1.5;
        grade = Number((7.0 + (Math.random() * 1.0) + compBonus).toFixed(1));
        grade = Math.min(10, Math.max(6.5, grade));
        feedback = 'Respuesta rigurosa y apegada a la bibliografía obligatoria. El docente destacó la precisión conceptual.';
        break;
      }
      case 'chamuyo': {
        // Scales with patio contacts and political capital
        const contactsBonus = Math.min(3.0, (stats.patioContacts / 500) * 2.5);
        const politicalBonus = Math.min(2.0, (stats.politicalCapital / 1000) * 1.5);
        const poetaBonus = archetype === 'poeta' ? 1.5 : 0;
        const randomRoll = (Math.random() * 3.5) + 3.0; // 3.0 to 6.5 base
        grade = Number((randomRoll + contactsBonus + politicalBonus + poetaBonus).toFixed(1));
        grade = Math.min(9.5, Math.max(3.5, grade));
        if (grade >= 7) {
          feedback = '¡Chamuyo antológico! Enlazaste metáforas del patio y dialéctica que deslumbraron al tribunal.';
        } else if (grade >= 4) {
          feedback = 'Chamuyo de supervivencia: se notó que no leíste todo, pero tu retórica alcanzó para safar.';
        } else {
          feedback = 'El docente detectó la guitarra y te frenó en seco: "Menos retórica y más lectura del texto".';
        }
        break;
      }
      case 'cita_erudita': {
        grade = Number((9.0 + (Math.random() * 1.0)).toFixed(1));
        feedback = 'Cita erudita fulminante del archivo del Instituto. El titular felicitó tu rigor de investigador.';
        break;
      }
      case 'laguna_mental': {
        grade = Number((1.0 + (Math.random() * 1.5)).toFixed(1));
        feedback = 'Laguna mental por agotamiento. La hoja quedó en blanco y sentiste un zumbido ensordecedor.';
        break;
      }
    }

    const roundResult: ExamRoundResult = {
      round: currentRound,
      question: currentQuestion,
      cardId,
      cardName: cardId === 'rigurosa' ? 'Respuesta Rigurosa'
        : cardId === 'chamuyo' ? 'Chamuyo de Pasillo'
        : cardId === 'cita_erudita' ? 'Cita Erudita'
        : 'Laguna Mental',
      grade,
      feedback,
    };

    const newResults = [...state.examState.results, roundResult];

    if (currentRound < 3) {
      setState(prev => {
        if (!prev.examState) return prev;
        return {
          ...prev,
          examState: {
            ...prev.examState,
            currentRound: currentRound + 1,
            results: newResults,
          },
        };
      });
    } else {
      // Exam complete! Calculate average
      const avg = Number((newResults.reduce((acc, r) => acc + r.grade, 0) / 3).toFixed(1));
      finishExam(avg, newResults);
    }
  };

  const finishExam = (finalGrade: number, results: ExamRoundResult[]) => {
    if (!state.examState || !state.player) return;

    const isRecup = state.examState.isRecuperatorio;
    const week = state.examState.week;
    const archetypeId = state.player.archetype.id;

    // CONICET Drawback: drains 2x mental health if grade < 8
    let mentalPenalty = 0;
    if (archetypeId === 'conicet' && finalGrade < 8) {
      mentalPenalty = 30; // 2x stress drain
      addLog('¡Estrés del Perfil CONICET! Una nota menor a 8 te costó un golpe severo a tu Salud Mental (-30%).', 'warning');
    }

    const passed = finalGrade >= 4;

    if (passed) {
      sound.playSuccess();
      addLog(`¡Examen aprobado con promedio ${finalGrade}!`, 'exam');
    } else {
      sound.playGameOver();
      addLog(`Examen desaprobado con promedio ${finalGrade}.`, 'warning');
    }

    setState(prev => {
      if (!prev.player || !prev.examState) return prev;
      const currentStats = prev.player.stats;
      const updatedGrades = { ...currentStats.grades };

      if (week === 8) {
        if (isRecup) updatedGrades.exam1Recup = finalGrade;
        else updatedGrades.exam1 = finalGrade;
      } else {
        if (isRecup) updatedGrades.exam2Recup = finalGrade;
        else updatedGrades.exam2 = finalGrade;
      }

      return {
        ...prev,
        examState: {
          ...prev.examState,
          finalGrade,
          results,
          isComplete: true,
        },
        player: {
          ...prev.player,
          stats: {
            ...currentStats,
            mentalHealth: Math.max(0, currentStats.mentalHealth - mentalPenalty),
            grades: updatedGrades,
            exam1Passed: week === 8 ? (passed ? true : (isRecup ? false : null)) : currentStats.exam1Passed,
            exam2Passed: week === 16 ? (passed ? true : (isRecup ? false : null)) : currentStats.exam2Passed,
          },
        },
      };
    });

    // Check if recuperatorio is needed or if failed completely
    if (!passed) {
      if (isRecup) {
        // Failed recuperatorio -> Game over (queda libre)
        sound.playGameOver();
        setState(prev => ({
          ...prev,
          phase: 'GAME_OVER',
          gameOverReason: `QUEDASTE LIBRE: Has reprobado la instancia de examen recuperatorio con nota ${finalGrade}. De acuerdo al régimen de cursada de la Facultad de Filosofía y Letras (UBA), pierdes la condición de alumno regular en la materia.`,
        }));
      } else {
        // Give recuperatorio option
        setTimeout(() => {
          triggerExam(week, true);
        }, 3000);
      }
    } else {
      // Resume normal play or advance to semester end
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          phase: 'PLAYING',
          examState: null,
          currentWeek: week === 8 ? 8 : 16,
          hoursRemaining: prev.maxWeeklyHours,
        }));
        if (week === 16) {
          evaluateFinalSemester();
        }
      }, 3500);
    }
  };

  // Evaluate final semester at week 16
  const evaluateFinalSemester = () => {
    if (!state.player) return;
    const stats = state.player.stats;
    const archetype = state.player.archetype;

    // 1. Attendance check: >= 75% of weeks (12 of 16)
    const attendanceCount = stats.attendanceWeeks.length;
    const attendancePercent = Math.round((attendanceCount / 16) * 100);

    if (attendancePercent < 75) {
      sound.playGameOver();
      setState(prev => ({
        ...prev,
        phase: 'GAME_OVER',
        gameOverReason: `QUEDASTE LIBRE POR INASISTENCIAS: Asististe únicamente al ${attendancePercent}% de las clases prácticas (${attendanceCount} de 16 semanas). El estatuto exige un mínimo de 75% de asistencia.`,
      }));
      return;
    }

    // 2. Exam check: both exams must be passed
    const g1 = stats.grades.exam1Recup ?? stats.grades.exam1 ?? 0;
    const g2 = stats.grades.exam2Recup ?? stats.grades.exam2 ?? 0;
    if (g1 < 4 || g2 < 4) {
      sound.playGameOver();
      setState(prev => ({
        ...prev,
        phase: 'GAME_OVER',
        gameOverReason: `DESAPROBASTE LA MATERIA: No lograste aprobar ambos exámenes parciales (Parcial 1: ${g1}, Parcial 2: ${g2}).`,
      }));
      return;
    }

    const averageGrade = Number(((g1 + g2) / 2).toFixed(2));

    // 3. Archetype specific conditions
    if (archetype.id === 'conicet') {
      const hasAvg = averageGrade >= 8.5;
      const hasPrestige = stats.academicPrestige >= 300;
      const hasAdscription = stats.adscriptionCompleted || stats.adscriptionProgress >= 100;

      if (hasAvg && hasPrestige && hasAdscription) {
        sound.playSuccess();
        setState(prev => ({
          ...prev,
          phase: 'VICTORY',
          victoryDetails: {
            title: '¡BECA DOCTORAL CONICET ADJUDICADA!',
            summary: `Has culminado el semestre con un Promedio Histórico de ${averageGrade}, ${stats.academicPrestige} pts de Prestigio Académico y tu Adscripción de Cátedra formalizada. El decanato te entregó la medalla al mérito y tu director te felicitó en el Instituto.`,
          },
        }));
      } else {
        sound.playGameOver();
        setState(prev => ({
          ...prev,
          phase: 'GAME_OVER',
          gameOverReason: `OBJETIVO NO ALCANZADO (CONICET): Tu promedio fue ${averageGrade} (requerido: ≥ 8.5), prestigio ${stats.academicPrestige} (requerido: ≥ 300) y adscripción: ${hasAdscription ? 'Completada' : 'Incompleta'}. No obtuviste el cupo de beca doctoral.`,
        }));
      }
      return;
    }

    if (archetype.id === 'militante') {
      const hasCapital = stats.politicalCapital >= 1000;
      if (hasCapital) {
        sound.playSuccess();
        setState(prev => ({
          ...prev,
          phase: 'VICTORY',
          victoryDetails: {
            title: '¡VICTORIA EN LAS ELECCIONES DEL CEFyL!',
            summary: `Cosechaste ${stats.politicalCapital} pts de Capital Político y tu lista retuvo la presidencia del Centro de Estudiantes de Filosofía y Letras por abrumadora mayoría, manteniendo la regularidad académica en todas las materias. El bombo resuena en Puán.`,
          },
        }));
      } else {
        sound.playGameOver();
        setState(prev => ({
          ...prev,
          phase: 'GAME_OVER',
          gameOverReason: `DERROTA ELECTORAL: Conseguiste ${stats.politicalCapital} pts de Capital Político (se requerían ≥ 1000 pts para ganar las elecciones). Otra agrupación se quedó con la conducción del CEFyL.`,
        }));
      }
      return;
    }

    if (archetype.id === 'laburante') {
      const hasMental = stats.mentalHealth >= 60;
      if (hasMental) {
        sound.playSuccess();
        setState(prev => ({
          ...prev,
          phase: 'VICTORY',
          victoryDetails: {
            title: '¡LA HAZAÑA DE LA MANTA CORTA!',
            summary: `Aprobaste el cuatrimestre completo trabajando 40 hs semanales en tu empleo y conservando una Salud Mental de ${stats.mentalHealth}%. Demostraste que la universidad pública también es de quienes laburan y le ponen el pecho día a día.`,
          },
        }));
      } else {
        sound.playGameOver();
        setState(prev => ({
          ...prev,
          phase: 'GAME_OVER',
          gameOverReason: `BURNOUT LABORAL: Si bien aprobaste los exámenes, tu Salud Mental final cayó al ${stats.mentalHealth}% (se requería ≥ 60%). El desgaste entre el trabajo y la facultad minó tu bienestar.`,
        }));
      }
      return;
    }

    if (archetype.id === 'poeta') {
      const hasMental = stats.mentalHealth >= 85;
      const hasContacts = stats.patioContacts >= 500;
      if (hasMental && hasContacts) {
        sound.playSuccess();
        setState(prev => ({
          ...prev,
          phase: 'VICTORY',
          victoryDetails: {
            title: '¡MITO VIVIENTE DEL PATIO DE PUÁN!',
            summary: `Lograste la hazaña bohemia: ${stats.patioContacts} contactos en tu agenda, una Salud Mental envidiable de ${stats.mentalHealth}% y el semestre aprobado a puro mate, sobremesas y chamuyo de alta gama. Escribiste un poemario que circula de mano en mano.`,
          },
        }));
      } else {
        sound.playGameOver();
        setState(prev => ({
          ...prev,
          phase: 'GAME_OVER',
          gameOverReason: `FRACASO BOHEMIO: Terminaste con Salud Mental al ${stats.mentalHealth}% (requerido: ≥ 85%) o ${stats.patioContacts} contactos (requerido: ≥ 500). El invierno en los pasillos fue más duro de lo esperado.`,
        }));
      }
      return;
    }
  };

  const restartGame = () => {
    sound.playClick();
    setState({
      phase: 'SELECT_ARCHETYPE',
      currentWeek: 1,
      hoursRemaining: 40,
      maxWeeklyHours: 40,
      currentLocation: 'casa',
      player: null,
      examState: null,
      activeLocationModal: null,
      activeRandomEvent: null,
      eventLogs: [],
      gameOverReason: null,
      victoryDetails: null,
    });
  };

  return (
    <GameContext.Provider
      value={{
        state,
        selectArchetype,
        travelTo,
        executeAction,
        openLocationModal,
        closeLocationModal,
        dismissRandomEvent,
        playExamCard,
        advanceWeekManual,
        restartGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
