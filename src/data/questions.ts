import type { Question } from '../domain/types';

export const questions: Question[] = [
  // ─── J vs P: Judicious (structured) vs Playful (spontaneous) ───
  {
    id: 1,
    text: 'When planning a vacation, you prefer to…',
    dimension: 'JP',
    optionA: 'Have a detailed itinerary prepared in advance',
    optionB: 'Decide things as you go and embrace surprises',
  },
  {
    id: 2,
    text: 'Your personal space is typically…',
    dimension: 'JP',
    optionA: 'Organised, tidy, and everything in its place',
    optionB: 'Lived-in, with a creative kind of "organised chaos"',
  },
  {
    id: 3,
    text: 'You feel most at ease when…',
    dimension: 'JP',
    optionA: 'A decision is made and things are settled',
    optionB: 'Your options are still open and flexible',
  },
  {
    id: 4,
    text: 'Given a project deadline, you tend to…',
    dimension: 'JP',
    optionA: 'Finish well ahead of time to reduce stress',
    optionB: 'Work best with a little pressure near the deadline',
  },
  {
    id: 5,
    text: 'How do you typically approach your day?',
    dimension: 'JP',
    optionA: 'With a clear schedule or to-do list',
    optionB: 'Going with the flow and adapting as needed',
  },

  // ─── B vs S: Bold (outgoing) vs Sensitive (reserved) ───
  {
    id: 6,
    text: 'At a social gathering you tend to…',
    dimension: 'BS',
    optionA: 'Mingle widely and meet lots of new people',
    optionB: 'Spend quality time with a small group of close friends',
  },
  {
    id: 7,
    text: 'You feel most energised after…',
    dimension: 'BS',
    optionA: 'A fun, lively time with other people',
    optionB: 'Some peaceful time alone to recharge',
  },
  {
    id: 8,
    text: 'After a long, demanding week you would rather…',
    dimension: 'BS',
    optionA: 'Celebrate with friends or go out',
    optionB: 'Relax quietly at home with a book or film',
  },
  {
    id: 9,
    text: 'In a group discussion you usually…',
    dimension: 'BS',
    optionA: 'Speak up readily and think out loud',
    optionB: 'Think carefully before contributing',
  },
  {
    id: 10,
    text: 'When facing a challenge, your first instinct is to…',
    dimension: 'BS',
    optionA: 'Talk it through with others for perspective',
    optionB: 'Reflect on it privately before involving anyone',
  },

  // ─── T vs F: Thinking (logic) vs Feeling (values) ───
  {
    id: 11,
    text: 'When making a tough decision, you rely mostly on…',
    dimension: 'TF',
    optionA: 'Logical analysis and objective data',
    optionB: 'Personal values and what feels right',
  },
  {
    id: 12,
    text: 'When a friend comes to you with a problem, you…',
    dimension: 'TF',
    optionA: 'Focus on offering practical, actionable advice',
    optionB: 'Listen and provide emotional support first',
  },
  {
    id: 13,
    text: 'You believe the best outcomes come from…',
    dimension: 'TF',
    optionA: 'Objective reasoning and impartial analysis',
    optionB: 'Empathy, intuition, and human connection',
  },
  {
    id: 14,
    text: 'In a disagreement, your priority is to…',
    dimension: 'TF',
    optionA: 'Find the most rational and fair solution',
    optionB: 'Preserve the relationship and everyone\'s feelings',
  },
  {
    id: 15,
    text: 'When evaluating a situation, you focus more on…',
    dimension: 'TF',
    optionA: 'What makes logical sense and is consistent',
    optionB: 'How it affects the people involved',
  },

  // ─── I vs R: Idealist (abstract) vs Realist (concrete) ───
  {
    id: 16,
    text: 'You are more naturally drawn to…',
    dimension: 'IR',
    optionA: 'Possibilities, patterns, and future potential',
    optionB: 'Current facts, hands-on details, and what works now',
  },
  {
    id: 17,
    text: 'When reading for pleasure, you prefer…',
    dimension: 'IR',
    optionA: 'Imaginative fiction or abstract, conceptual ideas',
    optionB: 'Practical guides or detailed factual accounts',
  },
  {
    id: 18,
    text: 'Your conversations tend to involve…',
    dimension: 'IR',
    optionA: 'Theories, big ideas, and "what if" scenarios',
    optionB: 'Specific experiences, practical tips, and real events',
  },
  {
    id: 19,
    text: 'When approaching a new project, you prefer to…',
    dimension: 'IR',
    optionA: 'Explore innovative, untested approaches',
    optionB: 'Apply reliable, proven methods',
  },
  {
    id: 20,
    text: 'When solving a difficult problem, you lean toward…',
    dimension: 'IR',
    optionA: 'Thinking outside the box with creative leaps',
    optionB: 'Working through it step-by-step with established logic',
  },
];
