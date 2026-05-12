// --- TYPES FOR USER SESSIONS & CHAT ---

/** Defines the structure for a single therapy session. */
export interface Session {
  id: string;
  type: 'text' | 'voice';
  status: 'in_progress' | 'completed' | 'scheduled';
  scheduledTime: Date;
  summary: string;
  title: string;
  isActive?: boolean; // Optional property, denoted by the '?'
}

/** Defines the structure for the user object. */
export interface User {
  id: string;
  name: string;
  email: string;
  walletId: string;
  walletAddress: string;
  preferences: {
    notifications: boolean;
    aiInterventions: boolean;
  };
}

/** Defines the structure for a single chat message. */
export interface ChatMessage {
  id: string;
  userId: string;
  message: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  sentiment: 'concerned' | 'empathetic' | 'neutral' | 'positive' | string; // Allows for other sentiments
}

// --- TYPES FOR MENTAL HEALTH SCREENING TESTS ---

/** Defines the structure for a single answer option in a question. */
export interface QuestionOption {
  text: string;
  value: number; // The score value for selecting this option
}

/** Defines the structure for a single screening question. */
export interface ScreeningQuestion {
  id: string; // A unique ID for this question (e.g., 'q1', 'q2')
  text: string;
  options: QuestionOption[];
}

/** Defines the structure for one level of score interpretation. */
export interface Interpretation {
  score: [number, number]; // The score range, e.g., [5, 9]
  severity: string;
  recommendation: string;
}

/**
 * Defines the entire structure for a complete screening test like PHQ-9 or GAD-7.
 * This is the main data structure you will use to define each test.
 */
export interface ScreeningTest {
  slug: 'phq-9' | 'gad-7' | 'ghq-12'; // Unique ID for routing and data fetching
  title: string;
  description: string;
  questions: ScreeningQuestion[];
  interpretation: Interpretation[];
}

/**
 * A type alias for the object that will store the user's answers in the component's state.
 * The key is the question ID and the value is the selected score. Example: { q1: 2, q2: 1 }
 */
export type Answers = Record<string, number>;

/**
 * Defines the structure of the JSON data your API will send back to the frontend
 * after calculating the score.
 */
export interface ResultData {
  score: number;
  interpretation: Interpretation;
}