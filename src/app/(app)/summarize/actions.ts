'use server';

import { summarizeGitCommits } from '@/ai/flows/summarize-git-commits';

export async function summarizeAction(prevState: { summary: string }, formData: FormData) {
  const textToSummarize = formData.get('textToSummarize') as string;
  if (!textToSummarize) {
    return { summary: 'Please provide text to summarize.' };
  }

  // Split by new lines to simulate multiple commit messages
  const commitMessages = textToSummarize.split('\n').filter(line => line.trim() !== '');

  try {
    const result = await summarizeGitCommits({ commitMessages });
    return { summary: result.summary };
  } catch (error) {
    console.error('Error summarizing commits:', error);
    return { summary: 'Failed to generate summary. Please try again.' };
  }
}
