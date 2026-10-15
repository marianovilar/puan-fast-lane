export type ArchetypeId = 'conicet' | 'militante' | 'laburante' | 'poeta';

export type LocationId = 'casa' | 'aula' | 'biblioteca' | 'patio' | 'cefyl' | 'instituto';

export interface Archetype {
  id: ArchetypeId;
  name: string;
  subtitle: string;
  badge: string;
  avatar: string;
  description: string;
  victoryGoal: string;
  passiveDesc: string;
  drawbackDesc: string;
  baseHours: number;
}

export interface PlayerStats {
  mentalHealth: number;       // 0 - 100%
  energy: number;             // 0 - 100%
  readingProgress: number;    // 0 - 100%
  examPrep: number;           // 0 - 100%
  comprehension: number;      // 0 - 100%
  attendanceWeeks: number[];  // Array of weeks where practical was attended
  politicalCapital: number;   // Points (for Militante goal >= 1000)
  academicPrestige: number;   // Points (for CONICET goal >= 300)
  patioContacts: number;      // Points (for Poeta goal >= 500)
  adscriptionProgress: number;// 0 - 100%
  adscriptionCompleted: boolean;
  grades: {
    exam1?: number;
    exam1Recup?: number;
    exam2?: number;
    exam2Recup?: number;
  };
  exam1Passed: boolean | null;
  exam2Passed: boolean | null;
  consecutiveZeroMentalHealth: number;
  isBurnedOut: boolean;
  isCollapsed: boolean;
}

export interface Player {
  archetype: Archetype;
  stats: PlayerStats;
}

export interface ActionBenefit {
  readingProgress?: number;
  examPrep?: number;
  attendance?: boolean;
  comprehension?: number;
  politicalCapital?: number;
  academicPrestige?: number;
  patioContacts?: number;
  adscriptionProgress?: number;
  mentalHealthDelta?: number;
  energyDelta?: number;
}

export interface GameAction {
  id: string;
  name: string;
  hoursCost: number;
  energyCost: number;       // Base energy cost (usually negative for draining)
  mentalHealthCost: number; // Base mental health change (positive or negative)
  tagline: string;
  description: string;
  flavorTexts: string[];
  benefits: ActionBenefit;
}

export interface GameLocation {
  id: LocationId;
  name: string;
  subtitle: string;
  isFaculty: boolean;
  iconName: string;
  themeColor: string;
  bgGradient: string;
  description: string;
  actions: GameAction[];
}

export type ExamCardId = 'rigurosa' | 'chamuyo' | 'cita_erudita' | 'laguna_mental';

export interface ExamCard {
  id: ExamCardId;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
}

export interface ExamQuestion {
  id: string;
  subject: string;
  professor: string;
  question: string;
  context: string;
}

export interface ExamRoundResult {
  round: number;
  question: ExamQuestion;
  cardId: ExamCardId;
  cardName: string;
  grade: number;
  feedback: string;
}

export interface ExamState {
  week: 8 | 16;
  isRecuperatorio: boolean;
  subjectTitle: string;
  currentRound: number; // 1, 2, 3
  questions: ExamQuestion[];
  results: ExamRoundResult[];
  finalGrade?: number;
  isComplete: boolean;
}

export interface LogEntry {
  id: string;
  week: number;
  type: 'action' | 'travel' | 'event' | 'warning' | 'exam' | 'system';
  message: string;
  timeString: string;
}

export interface RandomEvent {
  id: string;
  title: string;
  description: string;
  flavorQuote: string;
  energyDelta: number;
  mentalHealthDelta: number;
  hoursDelta?: number;
  contactsDelta?: number;
  politicalDelta?: number;
  prestigeDelta?: number;
}

export type GamePhase = 
  | 'SELECT_ARCHETYPE'
  | 'PLAYING'
  | 'EXAM'
  | 'RECUPERATORIO'
  | 'GAME_OVER'
  | 'VICTORY';

export interface GameState {
  phase: GamePhase;
  currentWeek: number;
  hoursRemaining: number;
  maxWeeklyHours: number;
  currentLocation: LocationId;
  player: Player | null;
  examState: ExamState | null;
  activeLocationModal: LocationId | null;
  activeRandomEvent: RandomEvent | null;
  eventLogs: LogEntry[];
  gameOverReason: string | null;
  victoryDetails: { title: string; summary: string } | null;
}
