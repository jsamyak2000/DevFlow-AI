'use server';

import { generateCodeSnippet } from '@/ai/flows/generate-code-snippet';

type GenerateState = {
  code: string;
  error?: string;
};

export async function generateAction(prevState: GenerateState, formData: FormData): Promise<GenerateState> {
  const description = formData.get('description') as string;

  if (!description) {
    return { code: '', error: 'Please provide a description.' };
  }

  try {
    const result = await generateCodeSnippet({ description });
    return { code: result.code };
  } catch (error) {
    console.error('Error generating code snippet:', error);
    return { code: '', error: 'Failed to generate code. Please try again.' };
  }
}
