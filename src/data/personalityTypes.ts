import type { PersonalityCode, PersonalityType } from '../domain/types';

const types: Record<PersonalityCode, PersonalityType> = {
  JBTI: {
    code: 'JBTI',
    name: 'The Visionary Commander',
    emoji: '🦅',
    tagline: 'Strategic, decisive, and relentlessly forward-thinking.',
    description:
      'You combine bold leadership with an imaginative mind, always steering toward ambitious long-term goals. You thrive in structured environments where your clear vision can inspire others. Decisive and confident, you set high standards and expect the same from those around you.',
    strengths: ['Natural leadership', 'Strategic thinking', 'High standards', 'Decisive under pressure'],
    challenges: ['Can seem overly blunt', 'May struggle to delegate', 'Risk of burnout from perfectionism'],
    compatibleWith: ['JBFI', 'JSTI', 'PBTI'],
  },
  JBTR: {
    code: 'JBTR',
    name: 'The Pragmatic Leader',
    emoji: '🏗️',
    tagline: 'Bold, structured, and grounded in what truly works.',
    description:
      'You are a no-nonsense leader who believes in tangible results. You combine social confidence with a sharp analytical mind and an eye for practical solutions. Your plans are built to last, not just to impress.',
    strengths: ['Execution-focused', 'Reliable', 'Clear communicator', 'Data-driven'],
    challenges: ['May overlook creative alternatives', 'Can be impatient with theory', 'Resistant to change'],
    compatibleWith: ['JSTR', 'PBTR', 'JBTI'],
  },
  JBFI: {
    code: 'JBFI',
    name: 'The Charismatic Advocate',
    emoji: '🌟',
    tagline: 'Warm, inspiring, and powered by a bold vision for a better world.',
    description:
      'You lead with your heart and your voice. Passionate and expressive, you rally others around shared values and possibilities. Your structured approach ensures your idealism translates into real change.',
    strengths: ['Charismatic', 'Empathetic leader', 'Visionary', 'Highly persuasive'],
    challenges: ['May take criticism personally', 'Can over-commit', 'Difficulty with purely logical conflicts'],
    compatibleWith: ['JBTI', 'PBFI', 'JSFI'],
  },
  JBFR: {
    code: 'JBFR',
    name: 'The Devoted Guardian',
    emoji: '🛡️',
    tagline: 'Dependable, caring, and dedicated to protecting those you love.',
    description:
      'You combine warmth and reliability in equal measure. People know they can count on you. You prefer concrete plans and steady routines that keep your community safe and cared for.',
    strengths: ['Loyal', 'Responsible', 'Nurturing', 'Excellent organiser'],
    challenges: ['Can resist change', 'May suppress own needs', 'Difficulty saying no'],
    compatibleWith: ['JSFI', 'JBFI', 'JSFR'],
  },
  JSTI: {
    code: 'JSTI',
    name: 'The Analytical Strategist',
    emoji: '🧠',
    tagline: 'Methodical, precise, and always ten steps ahead.',
    description:
      'You are the architect of complex solutions. Combining introversion with big-picture thinking, you prefer to analyse deeply before acting. Your structured mindset and love of patterns give you an edge in solving the hardest problems.',
    strengths: ['Deep analytical ability', 'Long-range planning', 'Self-disciplined', 'Innovative thinker'],
    challenges: ['Can seem aloof', 'Over-analyzes before deciding', 'Difficulty with small talk'],
    compatibleWith: ['JBTI', 'PSTI', 'JSTR'],
  },
  JSTR: {
    code: 'JSTR',
    name: 'The Dependable Realist',
    emoji: '⚙️',
    tagline: 'Reliable, thorough, and fiercely committed to quality.',
    description:
      'You are the backbone of every team. Methodical and detail-oriented, you take pride in doing things right the first time. Your quiet confidence and structured work ethic earn the lasting trust of everyone around you.',
    strengths: ['Meticulous', 'Highly dependable', 'Consistent', 'Strong work ethic'],
    challenges: ['Resistant to improvisation', 'May avoid risk', 'Can miss the big picture'],
    compatibleWith: ['JBTR', 'JSTI', 'JSFR'],
  },
  JSFI: {
    code: 'JSFI',
    name: 'The Thoughtful Supporter',
    emoji: '🌿',
    tagline: 'Quietly powerful, deeply empathetic, and full of creative insight.',
    description:
      'You see beauty in everyday things and care deeply for the people around you. Reflective and imaginative, you express yourself through actions more than words. You are the quiet force that keeps teams harmonious and inspired.',
    strengths: ['Deep empathy', 'Creative vision', 'Gentle leadership', 'Loyal friend'],
    challenges: ['Avoids confrontation', 'Overly self-critical', 'Difficulty asserting needs'],
    compatibleWith: ['JBFI', 'JBFR', 'PSFI'],
  },
  JSFR: {
    code: 'JSFR',
    name: 'The Loyal Caretaker',
    emoji: '🏡',
    tagline: 'Warm, grounded, and the heart of every community.',
    description:
      'You are the glue that holds groups together. Practical and caring, you quietly make sure everyone has what they need. Your reliability and warmth create safe, trusting environments wherever you go.',
    strengths: ['Deeply caring', 'Organised helper', 'Patient', 'Community-focused'],
    challenges: ['Neglects own needs', 'Struggles with criticism', 'Dislikes conflict'],
    compatibleWith: ['JBFR', 'JSFI', 'PSFR'],
  },
  PBTI: {
    code: 'PBTI',
    name: 'The Creative Inventor',
    emoji: '⚡',
    tagline: 'Energetic, ingenious, and perpetually reinventing the future.',
    description:
      'You are a natural disruptor, combining outgoing energy with a restless imagination. You love brainstorming with others, exploring uncharted territory, and turning wild ideas into reality—your way.',
    strengths: ['Creative powerhouse', 'Enthusiastic', 'Adaptable', 'Excellent brainstormer'],
    challenges: ['Can lose focus', 'Struggles with routine', 'May overlook follow-through'],
    compatibleWith: ['JBTI', 'PBFI', 'PSTI'],
  },
  PBTR: {
    code: 'PBTR',
    name: 'The Resourceful Entrepreneur',
    emoji: '🚀',
    tagline: 'Confident, action-oriented, and always ready to seize an opportunity.',
    description:
      'You thrive in the real world, turning observations into opportunities. Bold and practical, you love the thrill of building something from scratch and aren\'t afraid to take calculated risks.',
    strengths: ['Entrepreneurial spirit', 'Quick thinker', 'Persuasive', 'Hands-on problem solver'],
    challenges: ['Can be impulsive', 'Dislikes abstract theory', 'May disregard others\' feelings'],
    compatibleWith: ['JBTR', 'PSTR', 'PBTI'],
  },
  PBFI: {
    code: 'PBFI',
    name: 'The Inspiring Campaigner',
    emoji: '🎆',
    tagline: 'Boundlessly enthusiastic, deeply human, and full of infectious optimism.',
    description:
      'You see the potential in every person and every idea. Your openness and warmth draw people to you effortlessly. You champion causes, celebrate individuality, and spark joy wherever you go.',
    strengths: ['Infectious optimism', 'Emotionally intelligent', 'Highly imaginative', 'Connects deeply with others'],
    challenges: ['Easily distracted', 'Overthinks conflict', 'Struggles with routine tasks'],
    compatibleWith: ['JBFI', 'PBTI', 'PSFI'],
  },
  PBFR: {
    code: 'PBFR',
    name: 'The Nurturing Mediator',
    emoji: '🌈',
    tagline: 'Fun-loving, compassionate, and always ready to lend a hand.',
    description:
      'You have a rare ability to make everyone feel welcome. Spontaneous and empathetic, you keep the energy light while genuinely caring for the people around you.',
    strengths: ['Inclusive', 'Spontaneous fun', 'Emotionally supportive', 'Generous'],
    challenges: ['Avoids serious planning', 'People-pleaser tendencies', 'Difficulty with criticism'],
    compatibleWith: ['JBFR', 'PBFI', 'PSFR'],
  },
  PSTI: {
    code: 'PSTI',
    name: 'The Logical Explorer',
    emoji: '🔭',
    tagline: 'Curious, independent, and driven by the purest love of understanding.',
    description:
      'You are the quintessential free-thinker. Insatiably curious and analytically gifted, you explore ideas across every domain. You prefer depth over breadth and question everything.',
    strengths: ['Exceptional analytical mind', 'Independent thinker', 'Versatile', 'Original ideas'],
    challenges: ['Can be indecisive', 'Struggles with social norms', 'Risk of being all ideas, no action'],
    compatibleWith: ['JSTI', 'PBTI', 'PSTR'],
  },
  PSTR: {
    code: 'PSTR',
    name: 'The Virtuoso Craftsman',
    emoji: '🛠️',
    tagline: 'Observant, hands-on, and endlessly skilful.',
    description:
      'You learn by doing. Keenly observant and technically gifted, you master whatever skill captures your interest, solving problems with elegant, practical solutions that others simply don\'t see.',
    strengths: ['Highly skilled', 'Calm under pressure', 'Problem-solver', 'Independent'],
    challenges: ['Avoids long-term planning', 'Difficulty expressing feelings', 'Risk-taking impulses'],
    compatibleWith: ['PBTR', 'PSTI', 'JSTR'],
  },
  PSFI: {
    code: 'PSFI',
    name: 'The Spontaneous Performer',
    emoji: '🎨',
    tagline: 'Artistic, free-spirited, and wonderfully in the moment.',
    description:
      'You live and breathe authentic self-expression. Deeply sensitive to beauty and emotion, you experience the world vividly and share that experience through creativity, empathy, and spontaneous action.',
    strengths: ['Highly creative', 'Emotionally in tune', 'Authentic', 'Adventurous'],
    challenges: ['Avoids conflict', 'Difficulty with long-term planning', 'Sensitive to criticism'],
    compatibleWith: ['JSFI', 'PBFI', 'PSFR'],
  },
  PSFR: {
    code: 'PSFR',
    name: 'The Gentle Adventurer',
    emoji: '🌊',
    tagline: 'Easygoing, kind-hearted, and up for almost anything.',
    description:
      'You go through life with openness and warmth. Practical and present, you enjoy simple pleasures, genuine connections, and the freedom to explore at your own pace. People are drawn to your easy, accepting nature.',
    strengths: ['Adaptable', 'Warm-hearted', 'Grounded', 'Observant of others\' needs'],
    challenges: ['Avoids planning ahead', 'Conflict-averse', 'Can be too laid-back'],
    compatibleWith: ['PBFR', 'JSFR', 'PSFI'],
  },
};

export function getPersonalityType(code: PersonalityCode): PersonalityType {
  return types[code];
}

export function getAllTypes(): PersonalityType[] {
  return Object.values(types);
}
