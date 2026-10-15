import type { ExamQuestion, ExamCard } from '../types/game';

export const EXAM_CARDS: ExamCard[] = [
  {
    id: 'rigurosa',
    name: 'Respuesta Rigurosa',
    tagline: 'Fichaje bibliográfico y estructura metódica',
    description: 'Respuesta basada en los textos leídos en la Biblioteca. Garantiza solidez conceptual (Nota base 7 a 8).',
    icon: 'BookOpen',
    color: '#3b82f6',
  },
  {
    id: 'chamuyo',
    name: 'Chamuyo de Pasillo',
    tagline: 'Retórica de asamblea y debate de patio',
    description: 'Enlaza significantes flotantes, metáforas audaces y anécdotas de patio. Escala con Contactos y Capital Político (Nota 4 a 9).',
    icon: 'Sparkles',
    color: '#f59e0b',
  },
  {
    id: 'cita_erudita',
    name: 'Cita Erudita',
    tagline: 'Nota al pie del Instituto de Investigación',
    description: 'Citas al original en alemán/francés y referencia a debates archivísticos del Instituto (Nota 9 a 10). Requiere ≥ 40 pts de Prestigio.',
    icon: 'Award',
    color: '#10b981',
  },
  {
    id: 'laguna_mental',
    name: 'Laguna Mental',
    tagline: 'Sobrecarga de estrés y pantalla en blanco',
    description: 'Tu mente se nubla por el agotamiento y el pánico. Rellenas la hoja con garabatos ilegibles (Nota 1 a 2). Activa con Salud Mental < 30%.',
    icon: 'AlertTriangle',
    color: '#ef4444',
  },
];

export const EXAM_1_QUESTIONS: ExamQuestion[] = [
  {
    id: 'e1_q1',
    subject: 'Teoría Literaria y Estética',
    professor: 'Cátedra Prof. Ludmer / Viñas',
    question: 'Explique cómo el concepto de "desfamiliarización" según Shklovski rompe con la percepción automatizada de la realidad cotidiana.',
    context: 'El ayudante de prácticos pasea entre los bancos con los brazos cruzados y una taza de café humeante.',
  },
  {
    id: 'e1_q2',
    subject: 'Filosofía Moderna',
    professor: 'Cátedra Prof. Carpio',
    question: 'Compare la noción de "sustancia" en Descartes y Spinoza a la luz del problema del dualismo mente-cuerpo.',
    context: 'En la mesa de examen reposan dos tomos desgastados de la Ética de Spinoza con anotaciones marginales.',
  },
  {
    id: 'e1_q3',
    subject: 'Historia Social General',
    professor: 'Cátedra Prof. Hobsbawm / Campagne',
    question: 'Analice la transición del feudalismo al capitalismo: debata la primacía del comercio exterior versus las contradicciones de clase internas agrarias.',
    context: 'Se escucha el eco distante de un bombo en la calle Puán. El reloj del aula marca los últimos 20 minutos.',
  },
];

export const EXAM_2_QUESTIONS: ExamQuestion[] = [
  {
    id: 'e2_q1',
    subject: 'Epistemología de las Ciencias Sociales',
    professor: 'Cátedra Prof. Klimovsky / Schuster',
    question: 'Desarrolle el debate Kuhn vs. Popper: ¿Es el cambio de paradigma un proceso de falsación racional o una conversión sociológica de la comunidad científica?',
    context: 'El profesor titular acomoda sus anteojos de carey y anota comentarios con birome roja.',
  },
  {
    id: 'e2_q2',
    subject: 'Antropología Sistemática',
    professor: 'Cátedra Prof. Lévi-Strauss / Geertz',
    question: 'Articule la noción de "descripción densa" en Clifford Geertz con el análisis estructural del mito en las sociedades complejas.',
    context: 'Por la ventana entra una brisa primaveral y el olor a pasto recién cortado del patio de Puán.',
  },
  {
    id: 'e2_q3',
    subject: 'Semiótica y Análisis del Discurso',
    professor: 'Cátedra Prof. Verón / Barthes',
    question: 'Explique las operaciones de producción de sentido y las gramáticas de reconocimiento en los discursos hegemónicos contemporáneos.',
    context: 'Última pregunta del cuatrimestre. La consagración o el recuperatorio penden de este párrafo final.',
  },
];

export const RECUPERATORIO_QUESTIONS: ExamQuestion[] = [
  {
    id: 'recup_q1',
    subject: 'Instancia de Recuperatorio Integral',
    professor: 'Tribunal Docente de Cátedra',
    question: 'Sintetice el núcleo problemático de las dos primeras unidades del programa articulando teoría y estudio de caso.',
    context: 'Mesa de recuperatorio. Ambiente tenso y hojas rayadas temblando en los pupitres.',
  },
  {
    id: 'recup_q2',
    subject: 'Instancia de Recuperatorio Integral',
    professor: 'Tribunal Docente de Cátedra',
    question: 'Responda a las objeciones metodológicas que llevaron a la reprobación del parcial regular.',
    context: 'El titular hojea tu parcial anterior con ceño fruncido mientras espera tu defensa escrita.',
  },
  {
    id: 'recup_q3',
    subject: 'Instancia de Recuperatorio Integral',
    professor: 'Tribunal Docente de Cátedra',
    question: 'Demuestre solvencia en la bibliografía obligatoria para mantener la regularidad de la materia.',
    context: 'El último aliento antes de la sentencia definitiva de la cursada.',
  },
];
