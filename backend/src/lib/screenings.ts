

// lib/screenings.ts
import type {ScreeningTest } from '../lib/types';

export const tests: { [key: string]: ScreeningTest } = {
  'phq-9': {
    slug: 'phq-9',
    title: 'PHQ-9 Depression Screening',
    description: 'Over the last 2 weeks, how often have you been bothered by the following problems?',
    questions: [
        {
            id: 'q1',
            text: 'Little interest or pleasure in doing things',
            options: [
                { text: 'Not at all', value: 0 },
                { text: 'Several days', value: 1 },
                { text: 'More than half the days', value: 2 },
                { text: 'Nearly every day', value: 3 },
            ],
        },
        // ... Add all 9 questions for PHQ-9
    ],
    interpretation: [
        { score: [1, 4], severity: 'Minimal depression', recommendation: 'Monitor; may not require treatment.' },
        { score: [5, 9], severity: 'Mild depression', recommendation: 'Consider watchful waiting; follow-up.' },
        // ... other ranges
    ],
  },
  'gad-7': {
  slug: 'gad-7',
  title: 'GAD-7 Anxiety Screening',
  // ✅ ADD THESE PROPERTIES
  description: 'Over the last 2 weeks, how often have you been bothered by the following problems?',
  questions: [
    {
      id: 'gad1',
      text: 'Feeling nervous, anxious, or on edge',
      options: [
        { text: 'Not at all', value: 0 },
        { text: 'Several days', value: 1 },
        { text: 'More than half the days', value: 2 },
        { text: 'Nearly every day', value: 3 },
      ],
    },
    // ... add the other 6 questions for GAD-7
  ],
  interpretation: [
    { score: [0, 4], severity: 'Minimal anxiety', recommendation: 'No action needed.' },
    { score: [5, 9], severity: 'Mild anxiety', recommendation: 'Monitor symptoms.' },
    // ... add other interpretation ranges for GAD-7
  ],
},
};

export function getTestBySlug(slug: string): ScreeningTest | undefined {
  return tests[slug];
}