import { NextRequest, NextResponse } from 'next/server';
import { getTestBySlug } from '@/lib/screenings';

export async function POST(req: NextRequest) {
  try {
    const { testSlug, answers } = await req.json();

    if (!testSlug || !answers) {
      return NextResponse.json({ error: 'Missing test slug or answers' }, { status: 400 });
    }

    const testData = getTestBySlug(testSlug);
    if (!testData) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }

    // --- Scoring Logic ---
    const totalScore = Object.values(answers).reduce((sum: number, value: any) => sum + Number(value), 0);

    // --- Interpretation Logic ---
    const interpretation = testData.interpretation.find(
      (interp: any) => totalScore >= interp.score[0] && totalScore <= interp.score[1]
    );

    if (!interpretation) {
      return NextResponse.json({ error: 'Could not determine interpretation for the score.' }, { status: 500 });
    }

    return NextResponse.json({
      score: totalScore,
      interpretation: interpretation
    });
  } catch (error) {
    console.error('Screening submission error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
