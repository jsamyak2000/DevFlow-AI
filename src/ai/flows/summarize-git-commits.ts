'use server';

/**
 * @fileOverview Summarizes multiple Git commits into a single, coherent summary.
 *
 * - summarizeGitCommits - A function that accepts a list of Git commit messages and returns a summary.
 * - SummarizeGitCommitsInput - The input type for the summarizeGitCommits function.
 * - SummarizeGitCommitsOutput - The return type for the summarizeGitCommits function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeGitCommitsInputSchema = z.object({
  commitMessages: z
    .array(z.string())
    .describe('An array of Git commit messages to summarize.'),
});
export type SummarizeGitCommitsInput = z.infer<typeof SummarizeGitCommitsInputSchema>;

const SummarizeGitCommitsOutputSchema = z.object({
  summary: z.string().describe('A summary of the Git commit messages.'),
});
export type SummarizeGitCommitsOutput = z.infer<typeof SummarizeGitCommitsOutputSchema>;

export async function summarizeGitCommits(input: SummarizeGitCommitsInput): Promise<SummarizeGitCommitsOutput> {
  return summarizeGitCommitsFlow(input);
}

const needsSummarizationTool = ai.defineTool({
  name: 'needsSummarization',
  description: 'Determine if a piece of text is too long and needs to be summarized.',
  inputSchema: z.object({
    text: z.string().describe('The text to check.'),
  }),
  outputSchema: z.boolean().describe('True if the text needs summarization, false otherwise.'),
}, async (input) => {
  // Implement the logic to determine if the text needs summarization
  // This is a placeholder implementation.
  return input.text.length > 500; // Example: Summarize if longer than 500 characters.
});

const summarizeGitCommitsPrompt = ai.definePrompt({
  name: 'summarizeGitCommitsPrompt',
  input: {schema: SummarizeGitCommitsInputSchema},
  output: {schema: SummarizeGitCommitsOutputSchema},
  tools: [needsSummarizationTool],
  prompt: `You are a helpful assistant that summarizes Git commit messages.

  Here are the commit messages:
  {{#each commitMessages}}
  - {{{this}}}
  {{/each}}

  {% if needsSummarizationTool.needsSummarization commitMessages %}The commit messages are too long and need to be summarized.{% endif %}
  Please provide a concise summary of the changes made in these commits.
  The summary should highlight the main features, bug fixes, and other notable changes.
  `,  
});

const summarizeGitCommitsFlow = ai.defineFlow(
  {
    name: 'summarizeGitCommitsFlow',
    inputSchema: SummarizeGitCommitsInputSchema,
    outputSchema: SummarizeGitCommitsOutputSchema,
  },
  async input => {
    const {output} = await summarizeGitCommitsPrompt(input);
    return output!;
  }
);
