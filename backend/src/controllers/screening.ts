import { Request, Response } from 'express';
// ✅ Correct relative path from the 'controllers' folder
import { getTestBySlug} from '../lib/screenings';

export const handleSubmitScreening = async (req: Request, res: Response) => {
  try {
    const { testSlug, answers } = req.body;

    if (!testSlug || !answers) {
      return res.status(400).json({ error: 'Missing test slug or answers' });
    }

    const testData = getTestBySlug(testSlug);
    if (!testData) {
      return res.status(404).json({ error: 'Test not found' });
    }

    // --- Scoring Logic ---
    const totalScore = Object.values(answers).reduce((sum: number, value: any) => sum + Number(value), 0);
    
    // --- Interpretation Logic ---
    const interpretation = testData.interpretation.find(interp => 
      totalScore >= interp.score[0] && totalScore <= interp.score[1]
    );

    if (!interpretation) {
      return res.status(500).json({ error: 'Could not determine interpretation for the score.' });
    }

    return res.status(200).json({ 
      score: totalScore,
      interpretation: interpretation
    });

  } catch (error) {
    console.error('Screening submission error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};