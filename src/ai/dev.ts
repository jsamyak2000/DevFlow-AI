import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-git-commits.ts';
import '@/ai/flows/parse-meeting-transcript.ts';
import '@/ai/flows/generate-code-snippet.ts';
import '@/ai/flows/review-code-diff.ts';
