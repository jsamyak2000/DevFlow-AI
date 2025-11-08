'use server';

/**
 * @fileOverview This file defines a Genkit flow for parsing meeting transcripts and extracting action items.
 *
 * It includes:
 * - `parseMeetingTranscript`: The main function to trigger the flow.
 * - `ParseMeetingTranscriptInput`: The input type for the function, defining the transcript and desired output format.
 * - `ParseMeetingTranscriptOutput`: The output type for the function, detailing the extracted action items.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParseMeetingTranscriptInputSchema = z.object({
  transcript: z
    .string()
    .describe('The full text of the meeting transcript.'),
  outputFormat: z
    .string()
    .optional()
    .describe('The desired output format for action items (e.g., Trello, Jira).'),
});
export type ParseMeetingTranscriptInput = z.infer<typeof ParseMeetingTranscriptInputSchema>;

const ParseMeetingTranscriptOutputSchema = z.object({
  actionItems: z
    .array(z.string())
    .describe('A list of action items extracted from the meeting transcript.'),
});
export type ParseMeetingTranscriptOutput = z.infer<typeof ParseMeetingTranscriptOutputSchema>;

export async function parseMeetingTranscript(input: ParseMeetingTranscriptInput): Promise<ParseMeetingTranscriptOutput> {
  return parseMeetingTranscriptFlow(input);
}

const parseMeetingTranscriptPrompt = ai.definePrompt({
  name: 'parseMeetingTranscriptPrompt',
  input: {schema: ParseMeetingTranscriptInputSchema},
  output: {schema: ParseMeetingTranscriptOutputSchema},
  prompt: `You are an AI assistant tasked with extracting action items from meeting transcripts.

  Analyze the following transcript and identify specific, actionable tasks assigned to individuals or teams.

  Transcript: {{{transcript}}}

  Present the action items as a list of concise statements.

  Desired Output Format (if specified): {{{outputFormat}}}
  `,
});

const parseMeetingTranscriptFlow = ai.defineFlow(
  {
    name: 'parseMeetingTranscriptFlow',
    inputSchema: ParseMeetingTranscriptInputSchema,
    outputSchema: ParseMeetingTranscriptOutputSchema,
  },
  async input => {
    const {output} = await parseMeetingTranscriptPrompt(input);
    return output!;
  }
);
