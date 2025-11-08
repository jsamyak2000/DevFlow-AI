'use server';

/**
 * @fileOverview A code review generation flow.
 *
 * - reviewCodeDiff - A function that generates a code review from a diff.
 * - ReviewCodeDiffInput - The input type for the reviewCodeDiff function.
 * - ReviewCodeDiffOutput - The return type for the reviewCodeDiff function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReviewCodeDiffInputSchema = z.object({
  diff: z
    .string()
    .describe(
      'A code diff to be reviewed. Should be in a standard diff format.'
    ),
});
export type ReviewCodeDiffInput = z.infer<typeof ReviewCodeDiffInputSchema>;

const ReviewCodeDiffOutputSchema = z.object({
  review: z.string().describe('A detailed code review of the provided diff, formatted as markdown.'),
});
export type ReviewCodeDiffOutput = z.infer<typeof ReviewCodeDiffOutputSchema>;

export async function reviewCodeDiff(input: ReviewCodeDiffInput): Promise<ReviewCodeDiffOutput> {
  return reviewCodeDiffFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reviewCodeDiffPrompt',
  input: {schema: ReviewCodeDiffInputSchema},
  output: {schema: ReviewCodeDiffOutputSchema},
  prompt: `You are an expert software engineer acting as a code reviewer. Your task is to provide a detailed, constructive, and friendly review of the following code diff.

Focus on:
- Spotting potential bugs or edge cases.
- Suggesting improvements for performance, readability, and maintainability.
- Checking for adherence to best practices.
- Ensuring the code is well-structured.

Format your review in Markdown. Use headings, bullet points, and code blocks for clarity.

Code Diff:
\`\`\`diff
{{{diff}}}
\`\`\`
`,
});

const reviewCodeDiffFlow = ai.defineFlow(
  {
    name: 'reviewCodeDiffFlow',
    inputSchema: ReviewCodeDiffInputSchema,
    outputSchema: ReviewCodeDiffOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
