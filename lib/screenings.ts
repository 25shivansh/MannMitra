

// lib/screenings.ts
import type {ScreeningTest } from '@/types';

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
        {
            id: 'q2',
            text: 'Feeling down ,depressed, or hopeless',
            options: [
                { text: 'Not at all', value: 0 },
                { text: 'Several days', value: 1 },
                { text: 'More than half the days', value: 2 },
                { text: 'Nearly every day', value: 3 },
            ],
        },
        {
            id: 'q3',
            text: 'Trouble falling or staying asleep, or sleeping too much',
            options: [
                { text: 'Not at all', value: 0 },
                { text: 'Several days', value: 1 },
                { text: 'More than half the days', value: 2 },
                { text: 'Nearly every day', value: 3 },
            ],
        },
        {
            id: 'q4',
            text: 'Feeling tired or having little energy ',
            options: [
                { text: 'Not at all', value: 0 },
                { text: 'Several days', value: 1 },
                { text: 'More than half the days', value: 2 },
                { text: 'Nearly every day', value: 3 },
            ],
        },
        {
            id: 'q5',
            text: 'Poor appetite or overeating',
            options: [
                { text: 'Not at all', value: 0 },
                { text: 'Several days', value: 1 },
                { text: 'More than half the days', value: 2 },
                { text: 'Nearly every day', value: 3 },
            ],
        },
        {
            id: 'q6',
            text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down ',
            options: [
                { text: 'Not at all', value: 0 },
                { text: 'Several days', value: 1 },
                { text: 'More than half the days', value: 2 },
                { text: 'Nearly every day', value: 3 },
            ],
        },
        {
            id: 'q7',
            text: 'Trouble concentrating on things, such as reading the newspaper or watching television ',
            options: [
                { text: 'Not at all', value: 0 },
                { text: 'Several days', value: 1 },
                { text: 'More than half the days', value: 2 },
                { text: 'Nearly every day', value: 3 },
            ],
        },
        {
            id: 'q8',
            text: 'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual ',
            options: [
                { text: 'Not at all', value: 0 },
                { text: 'Several days', value: 1 },
                { text: 'More than half the days', value: 2 },
                { text: 'Nearly every day', value: 3 },
            ],
        },
        {
            id: 'q9',
            text: 'Thoughts that you would be better off dead or of hurting yourself in some way',
            options: [
                { text: 'Not at all', value: 0 },
                { text: 'Several days', value: 1 },
                { text: 'More than half the days', value: 2 },
                { text: 'Nearly every day', value: 3 },
            ],
        },
        
    ],
    interpretation: [
    { score: [0, 4], severity: 'Minimal depression', recommendation: 'Monitor; may not require treatment.' },
    { score: [5, 9], severity: 'Mild depression', recommendation: 'Consider watchful waiting; follow-up.' },
    { score: [10, 14], severity: 'Moderate depression', recommendation: 'Consider counseling or follow-up.' },
    { score: [15, 19], severity: 'Moderately severe depression', recommendation: 'Active treatment with medication, therapy, or both.' },
    { score: [20, 27], severity: 'Severe depression', recommendation: 'Immediate initiation of therapy and/or medication.' }
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
    {
      id: 'gad2',
      text: 'Not being able to stop or control worrying ',
      options: [
        { text: 'Not at all', value: 0 },
        { text: 'Several days', value: 1 },
        { text: 'More than half the days', value: 2 },
        { text: 'Nearly every day', value: 3 },
      ],
    },
    {
      id: 'gad3',
      text: 'Worrying too much about different things ',
      options: [
        { text: 'Not at all', value: 0 },
        { text: 'Several days', value: 1 },
        { text: 'More than half the days', value: 2 },
        { text: 'Nearly every day', value: 3 },
      ],
    },
    {
      id: 'gad4',
      text: 'Trouble relaxing ',
      options: [
        { text: 'Not at all', value: 0 },
        { text: 'Several days', value: 1 },
        { text: 'More than half the days', value: 2 },
        { text: 'Nearly every day', value: 3 },
      ],
    },
    {
      id: 'gad5',
      text: 'Being so restless that it is hard to sit still',
      options: [
        { text: 'Not at all', value: 0 },
        { text: 'Several days', value: 1 },
        { text: 'More than half the days', value: 2 },
        { text: 'Nearly every day', value: 3 },
      ],
    },
    {
      id: 'gad6',
      text: 'Becoming easily annoyed or irritable',
      options: [
        { text: 'Not at all', value: 0 },
        { text: 'Several days', value: 1 },
        { text: 'More than half the days', value: 2 },
        { text: 'Nearly every day', value: 3 },
      ],
    },
    {
      id: 'gad7',
      text: ' Feeling afraid, as if something awful might happen ',
      options: [
        { text: 'Not at all', value: 0 },
        { text: 'Several days', value: 1 },
        { text: 'More than half the days', value: 2 },
        { text: 'Nearly every day', value: 3 },
      ],
    },
  ],
  interpretation: [
    { score: [0, 4], severity: 'Minimal anxiety', recommendation: 'No action needed.' },
    { score: [5, 9], severity: 'Mild anxiety', recommendation: 'Monitor symptoms.' },
    { score: [10, 14], severity: 'Moderate anxiety', recommendation: 'Consider counseling or follow-up.' },
    { score: [15, 21], severity: 'Severe anxiety', recommendation: 'Active treatment with medication, therapy, or both.' }
  ],
},
    'ghq-12': {
    slug: 'ghq-12', 
    title: 'GHQ-12 General Health Questionnaire',
    description: 'Over the last few weeks, how often have you experienced the following?',
    questions: [
        {
            id: 'q1',
            text: 'Have you been able to concentrate on whatever you are doing',
            options: [
                { text: 'Better than usual', value: 0 },
                { text: 'Same as usual', value: 1 },
                { text: 'Less than usual', value: 2 },
                { text: 'Much less than usual', value: 3 },
            ]
        },
        {
            id: 'q2',
            text: 'Have you recently lost much sleep over worry?',
            options: [
                { text: ' Not at all ', value: 0 },
                { text: 'No more than usual ', value: 1 },
                { text: 'Rather more than usual ', value: 2 },
                { text: 'Much more than usual', value: 3 },
            ]
        },
        {
            id: 'q3',
            text: 'Have you recently felt that you were playing a useful part in things?',
            options: [
                { text: 'More so than usual', value: 0 },
                { text: 'Same as usual', value: 1 },
                { text: 'Less than usual', value: 2 },
                { text: 'Much less than usual', value: 3 },
            ]
        },
        {
            id: 'q4',
            text: 'Have you recently felt capable of making decisions about things? ',
            options: [
                { text: 'More so than usual', value: 0 },
                { text: 'Same as usual', value: 1 },
                { text: 'Less than usual', value: 2 },
                { text: 'Much less than usual', value: 3 },
            ]
        },
        {
            id: 'q5',
            text: 'Have you recently felt constantly under strain? ',
            options: [
                { text: 'Not at all ', value: 0 },
                { text: 'No more than usual ', value: 1 },
                { text: 'Rather more than usual', value: 2 },
                { text: 'Much more than usual ', value: 3 },
            ]
        },
        {
            id: 'q6',
            text: "Have you recently felt you couldn't overcome your difficulties?" ,
            options: [
                { text: 'Not at all ', value: 0 },
                { text: 'No more than usual ', value: 1 },
                { text: ' Rather more than usual', value: 2 },
                { text: 'Much more than usual ', value: 3 },
            ]
        },
        {
            id: 'q7',
            text: 'Have you recently been feeling reasonably happy, all things considered? ',
            options: [
                { text: 'Better than usual', value: 0 },
                { text: 'Same as usual', value: 1 },
                { text: 'Less than usual', value: 2 },
                { text: 'Much less than usual', value: 3 },
            ]
        },
        {
            id: 'q8',
            text: ' Have you recently been able to enjoy your normal day-to-day activities?',
            options: [
                { text: 'More so than usual ', value: 0 },
                { text: 'Same as usual', value: 1 },
                { text: 'Less than usual', value: 2 },
                { text: 'Much less than usual', value: 3 },
            ]
        },
        {
            id: 'q9',
            text: ' Have you recently been able to face up to problems? ',
            options: [
                { text: 'More so than usual ', value: 0 },
                { text: 'Same as usual', value: 1 },
                { text: 'Less than usual', value: 2 },
                { text: 'Much less than usual', value: 3 },
            ]
        },
        {
            id: 'q10',
            text: 'Have you recently been feeling unhappy or depressed?',
            options: [
                { text: 'Not at all', value: 0 },
                { text: 'No more than usual', value: 1 },
                { text: 'Rather more than usual', value: 2 },
                { text: 'Much more than usual', value: 3 },
            ]
        },
        {
            id: 'q11',
            text: 'Have you recently been losing confidence in yourself?',
            options: [
                { text: 'Not at all', value: 0 },
                { text: 'No more than usual', value: 1 },
                { text: 'Rather more than usual', value: 2 },
                { text: 'Much more than usual', value: 3 },
            ]
        },
        {
            id: 'q12',
            text: 'Have you recently been thinking of yourself as a worthless person?',
            options: [
                { text: 'Not at all', value: 0 },
                { text: 'No more than usual', value: 1 },
                { text: 'Rather more than usual', value: 2 },
                { text: 'Much more than usual', value: 3 },
            ]
        }
    ]
    ,
    interpretation: [
        { score: [0, 12], severity: 'Low distress', recommendation: 'No significant psychological distress detected.' },
        { score: [13, 19], severity: 'Moderate distress', recommendation: 'Monitor and consider further assessment.' },
        { score: [20, 36], severity: 'High distress', recommendation: 'Seek professional help for psychological support.' }
    ]
    }
};

export function getTestBySlug(slug: string): ScreeningTest | undefined {
    // Support aliases: remove hyphens and compare, allow partial match for GHQ
    const normalizedSlug = slug.replace(/-/g, '').toLowerCase();
    for (const key of Object.keys(tests)) {
        const normalizedKey = key.replace(/-/g, '').toLowerCase();
        if (
            normalizedKey === normalizedSlug ||
            (normalizedSlug === 'ghq' && normalizedKey.startsWith('ghq'))
        ) {
            return tests[key];
        }
    }
    return undefined;
}