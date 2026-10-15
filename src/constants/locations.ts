import type { GameLocation } from '../types/game';

export const LOCATIONS: Record<string, GameLocation> = {
  casa: {
    id: 'casa',
    name: 'Casa / Pensión',
    subtitle: 'El Refugio Fuera de Puán',
    isFaculty: false,
    iconName: 'Home',
    themeColor: '#4f46e5',
    bgGradient: 'from-slate-900 to-indigo-950',
    description: 'Tu monoambiente o pieza en Almagro / Caballito. Aquí puedes desconectar del murmullo de los pasillos, recuperar el cuerpo y recargar pilas con un buen descanso.',
    actions: [
      {
        id: 'siesta',
        name: 'Siesta Reparadora',
        hoursCost: 2,
        energyCost: 25, // Positive = gains energy
        mentalHealthCost: 0,
        tagline: 'Cerrar los ojos 2 horas',
        description: 'Una siesta corta con la persiana baja para recuperar fuerzas y continuar el día.',
        flavorTexts: [
          'Dormiste 2 horas con el ruido del colectivo de fondo. Te despertaste un poco desorientado pero con más pilas.',
          'Una pausa necesaria entre fotocopias y café recalentado.',
          'Pusiste la alarma y te echaste en la cama. El cuerpo agradece la tregua.'
        ],
        benefits: {
          energyDelta: 25,
        },
      },
      {
        id: 'dormir_fondo',
        name: 'Dormir a Fondo',
        hoursCost: 6,
        energyCost: 60, // +60% Energía
        mentalHealthCost: 20, // +20% Salud Mental
        tagline: 'Sueño profundo y reseteo mental',
        description: 'Apagas el teléfono, tapas las ventanas y duermes 6 horas completas. Sana el cuerpo y la mente.',
        flavorTexts: [
          'Dormiste como un lirón. Soñaste con Saussure pero te despertaste con la cabeza fresca.',
          'Ocho horas de sueño reparador (o seis muy intensas). Te sientes un ser humano otra vez.',
          'Un descanso sagrado. El estrés del cuatrimestre parece un poco más lejano.'
        ],
        benefits: {
          energyDelta: 60,
          mentalHealthDelta: 20,
        },
      },
    ],
  },
  aula: {
    id: 'aula',
    name: 'Aula de Cursada',
    subtitle: 'Prácticos y Teóricos (Piso 3)',
    isFaculty: true,
    iconName: 'GraduationCap',
    themeColor: '#2563eb',
    bgGradient: 'from-slate-900 to-blue-950',
    description: 'Bancos de madera gastados, pizarrón verde y el zumbido del ventilador. La asistencia a prácticos es obligatoria (mínimo 75%) para no quedar libre.',
    actions: [
      {
        id: 'practico',
        name: 'Asistir a Práctico',
        hoursCost: 2,
        energyCost: -10,
        mentalHealthCost: 0,
        tagline: 'Obligatorio para regularidad (75% min)',
        description: '2 horas de discusión grupal del texto de la semana. Firma la planilla de asistencia.',
        flavorTexts: [
          'El ayudante de cátedra preguntó si alguien leyó el texto. Asentiste con cara de circunstancias y firmaste.',
          'Hubo debate picante sobre la tesis del autor. Tu intervención sumó puntos con el docente.',
          'Firmaste el presente y tomaste apuntes frenéticos. Una semana más de regularidad asegurada.'
        ],
        benefits: {
          attendance: true,
          energyDelta: -10,
          comprehension: 5,
        },
      },
      {
        id: 'teorico',
        name: 'Asistir a Teórico',
        hoursCost: 4,
        energyCost: -15,
        mentalHealthCost: 0,
        tagline: 'Comprensión conceptual profunda (+Bono Examen)',
        description: 'El profesor titular despliega dos horas de digresiones eruditas y marcos teóricos que saldrán en el parcial.',
        flavorTexts: [
          'El titular citó a Hegel de memoria durante hora y media. Conectaste conceptos clave para el parcial.',
          'Excelente clase magistral. Saliste con cuatro carillas de esquemas conceptuales lúcidos.',
          'Te sentaste adelante para no perder el hilo. Tu comprensión del programa subió notablemente.'
        ],
        benefits: {
          comprehension: 15,
          examPrep: 10,
          energyDelta: -15,
        },
      },
    ],
  },
  biblioteca: {
    id: 'biblioteca',
    name: 'Biblioteca Central',
    subtitle: 'Silencio y Fichas Bibliográficas',
    isFaculty: true,
    iconName: 'BookOpen',
    themeColor: '#7c3aed',
    bgGradient: 'from-slate-900 to-purple-950',
    description: 'Lámparas verdes, olor a papel añejo y el silencio estricto de quienes se juegan el cuatrimestre entre tomos pesados.',
    actions: [
      {
        id: 'fichar',
        name: 'Fichar Bibliografía',
        hoursCost: 3,
        energyCost: -15,
        mentalHealthCost: 0,
        tagline: '+25% Avance de lectura obligatoria',
        description: 'Resumir textos, marcar citas clave y elaborar fichas de lectura fundamentales para responder en el parcial.',
        flavorTexts: [
          'Fichaste 80 páginas del práctico. Subrayador amarillo gastado, pero los conceptos quedaron grabados.',
          'Lograste aislar los tres argumentos centrales del autor. Tu carpeta de resúmenes va tomando forma.',
          'La lectura fue densa, pero desglosaste cada párrafo difícil con disciplina espartana.'
        ],
        benefits: {
          readingProgress: 25,
          energyDelta: -15,
        },
      },
      {
        id: 'estudio_intensivo',
        name: 'Estudio Intensivo',
        hoursCost: 6,
        energyCost: -30,
        mentalHealthCost: -5,
        tagline: '+50% Preparación de examen',
        description: 'Maratón de lectura y armado de cuadros sinópticos. Exige mucho foco y drena bastante energía.',
        flavorTexts: [
          'Seis horas seguidas sin soltar los apuntes. Armaste un mapa conceptual digno de un perito.',
          'Sesión demoledora de estudio. Tu nivel de preparación para el parcial dio un salto cuántico.',
          'Terminaste con dolor de cuello y los ojos secos, pero dominas la mitad del programa.'
        ],
        benefits: {
          examPrep: 50,
          energyDelta: -30,
          mentalHealthDelta: -5,
        },
      },
    ],
  },
  patio: {
    id: 'patio',
    name: 'El Patio de Puán',
    subtitle: 'Mates, Pino y Charlas',
    isFaculty: true,
    iconName: 'Coffee',
    themeColor: '#059669',
    bgGradient: 'from-slate-900 to-emerald-950',
    description: 'El corazón social de la facultad. Bancos de cemento, el buffet estudiantil, mate circulando y debates infinitos bajo el pino.',
    actions: [
      {
        id: 'cafe_buffet',
        name: 'Café en el Buffet',
        hoursCost: 1,
        energyCost: 25, // Positive: gains energy
        mentalHealthCost: 5, // +5% Mental Health
        tagline: '+25% Energía, +5% Salud',
        description: 'Shot rápido de cafeína en el buffet para seguir despierto sin volver a casa.',
        flavorTexts: [
          'Un café doble en vaso térmico con aroma a tostados del buffet. Te devolvió el alma al cuerpo para encarar la cursada.',
          'Hiciste la fila del buffet, te tomaste un cortado hirviendo y se te fue el sueño en cinco minutos.',
          'Un cafecito express en el mostrador charlando con el encargado del buffet. Energía recargada para seguir con los textos.'
        ],
        benefits: {
          energyDelta: 25,
          mentalHealthDelta: 5,
        },
      },
      {
        id: 'tomar_algo',
        name: 'Mate y Charlas',
        hoursCost: 2,
        energyCost: 0,
        mentalHealthCost: 20, // +20% Mental Health
        tagline: '+20% Salud, +15 Contactos',
        description: 'Ronda de mate amargo bajo el pino. Relax, anécdotas y dato clave de parcial.',
        flavorTexts: [
          'Te sentaste en el banco del árbol. Alguien te convidó un mate con poleo y te pasó la pregunta fija que siempre entra.',
          'Charlas amenas sobre cine y política. El aire fresco del patio te devolvió la sonrisa.',
          'Te cruzaste con amigos de la cursada anterior. El dato que te dieron te va a salvar en la consigna 2.'
        ],
        benefits: {
          mentalHealthDelta: 20,
          patioContacts: 15,
          examPrep: 5,
        },
      },
      {
        id: 'sobremesa',
        name: 'Sobremesa y Birra',
        hoursCost: 4,
        energyCost: -10,
        mentalHealthCost: 45, // +45% Mental Health
        tagline: '+45% Salud, +35 Contactos',
        description: 'Tarde distendida con amigos en el patio o la esquina. Cura cualquier estrés.',
        flavorTexts: [
          'Cuatro horas debatiendo la coyuntura política y anécdotas de cursada. Tu salud mental está por las nubes.',
          'La sobremesa se convirtió en una cumbre filosófica memorable. Ganaste amigos leales y despejaste la cabeza.',
          'Birra fresca, risas y complicidad. Puán en su máxima expresión de calidez comunitaria.'
        ],
        benefits: {
          mentalHealthDelta: 45,
          patioContacts: 35,
          energyDelta: -10,
        },
      },
    ],
  },
  cefyl: {
    id: 'cefyl',
    name: 'CEFyL (Centro de Estudiantes)',
    subtitle: 'Pasillos, Megáfono y Militancia',
    isFaculty: true,
    iconName: 'Megaphone',
    themeColor: '#dc2626',
    bgGradient: 'from-slate-900 to-rose-950',
    description: 'Paredes tapizadas de afiches, mesas de agrupaciones y debates acalorados sobre la gestión de apuntes y la lucha estudiantil.',
    actions: [
      {
        id: 'volantear',
        name: 'Volantear / Mesa de Agrupación',
        hoursCost: 3,
        energyCost: -15,
        mentalHealthCost: 0,
        tagline: '+30 Capital Político',
        description: 'Repartir volantes en la puerta, charlar con ingresantes y convocar a las actividades del centro.',
        flavorTexts: [
          'Entregaste cien volantes en la entrada de Puán 480. Varios compañeros se quedaron conversando.',
          'Guardia en la mesa de agrupación. Resolviste trámites y reclamos de compañeros que agradecieron el aguante.',
          'Buena jornada de difusión. Tu rostro es cada vez más reconocido en los pasillos de la facu.'
        ],
        benefits: {
          politicalCapital: 30,
          patioContacts: 10,
          energyDelta: -15,
        },
      },
      {
        id: 'asamblea',
        name: 'Participar de Asamblea',
        hoursCost: 5,
        energyCost: -30,
        mentalHealthCost: -10,
        tagline: '+60 Capital Político, -30% Energía, -10% Salud',
        description: 'Cinco horas de debate acalorado moción por moción en el hall central. Exhaustiva pero clave para la conducción política.',
        flavorTexts: [
          'Asamblea maratónica: 5 horas con cánticos y cruces dialécticos. Tu moción fue votada por aclamación.',
          'Defendiste la posición de la agrupación hasta la medianoche. El desgaste es real pero tu capital político se dispara.',
          'Calor, megáfono y votación a mano alzada. Consolidaste tu liderazgo en el movimiento estudiantil.'
        ],
        benefits: {
          politicalCapital: 60,
          energyDelta: -30,
          mentalHealthDelta: -10,
        },
      },
    ],
  },
  instituto: {
    id: 'instituto',
    name: 'Instituto de Investigación',
    subtitle: 'Adscripciones y Archivo Histórico',
    isFaculty: true,
    iconName: 'Building2',
    themeColor: '#0891b2',
    bgGradient: 'from-slate-900 to-cyan-950',
    description: 'Piso 5 y anexos. Investigadores del CONICET, ficheros especializados, documentos inéditos y el sueño de la carrera académica.',
    actions: [
      {
        id: 'fichar_fuentes',
        name: 'Fichar Fuentes / Archivo',
        hoursCost: 4,
        energyCost: -20,
        mentalHealthCost: 0,
        tagline: '+25 Prestigio Académico',
        description: 'Analizar microfilms, cartas históricas y primeras ediciones bajo la supervisión de tu director de investigación.',
        flavorTexts: [
          'Encontraste una correspondencia inédita de 1920 que refuta la bibliografía estándar. El director quedó fascinado.',
          'Cuatro horas transcribiendo fuentes primarias con guantes de látex. Puro rigor científico.',
          'Tu fichero metodológico creció con anotaciones rigurosas. Te ganas el respeto del claustro de graduados.'
        ],
        benefits: {
          academicPrestige: 25,
          adscriptionProgress: 20,
          energyDelta: -20,
        },
      },
      {
        id: 'redactar_paper',
        name: 'Redactar Ponencia / Paper',
        hoursCost: 6,
        energyCost: -35,
        mentalHealthCost: -5,
        tagline: '+50 Prestigio Académico (+Adscripción)',
        description: 'Redactar un ensayo crítico para presentar en las próximas Jornadas de Filosofía y Letras.',
        flavorTexts: [
          'Concluiste las 15 páginas de tu ponencia sobre epistemología crítica. La cátedra aprobó tu avance de adscripción.',
          'Sesión intensa de redacción académica con aparato de citas impecable. El director te felicitó formalmente.',
          'Un borrador brillante listo para enviar al comité de referato de la revista del instituto.'
        ],
        benefits: {
          academicPrestige: 50,
          adscriptionProgress: 40,
          energyDelta: -35,
          mentalHealthDelta: -5,
        },
      },
    ],
  },
};
