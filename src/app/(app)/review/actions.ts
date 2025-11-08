'use server';

import { reviewCodeDiff } from '@/ai/flows/review-code-diff';

type ReviewState = {
  review: string;
  error?: string;
};

export async function reviewAction(prevState: ReviewState, formData: FormData): Promise<ReviewState> {
  const diff = formData.get('diff') as string;

  if (!diff) {
    return { review: '', error: 'Please provide a diff to review.' };
  }

  try {
    const result = await reviewCodeDiff({ diff });
    return { review: result.review };
  } catch (error) {
    console.error('Error reviewing code:', error);
    return { review: '', error: 'Failed to generate review. Please try again.' };
  }
}
