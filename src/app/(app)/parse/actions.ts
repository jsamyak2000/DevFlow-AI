'use server';

import { parseMeetingTranscript } from '@/ai/flows/parse-meeting-transcript';

type ParseState = {
  actionItems: string[];
  error?: string;
};

export async function parseAction(prevState: ParseState, formData: FormData): Promise<ParseState> {
  const transcript = formData.get('transcript') as string;
  const outputFormat = formData.get('outputFormat') as string;
  
  if (!transcript) {
    return { actionItems: [], error: 'Please provide a transcript to parse.' };
  }

  try {
    const result = await parseMeetingTranscript({ transcript, outputFormat });
    return { actionItems: result.actionItems };
  } catch (error) {
    console.error('Error parsing transcript:', error);
    return { actionItems: [], error: 'Failed to parse transcript. Please try again.' };
  }
}
