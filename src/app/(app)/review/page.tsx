'use client';
import { useState, useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { reviewAction } from './actions';
import { Bot, Loader2, ScanSearch } from 'lucide-react';
import { CodeBlock } from '@/components/code-block';

type ReviewState = {
  review: string;
  error?: string;
};

const initialState: ReviewState = {
  review: '',
};

export default function ReviewPage() {
  const [state, formAction, isSubmitting] = useActionState(reviewAction, initialState);
  const [text, setText] = useState('');

  return (
    <div className="flex h-full flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">AI Code Reviewer</h1>
        <p className="text-muted-foreground">
          Paste a code diff to get an instant, AI-powered review.
        </p>
      </div>

      <form action={formAction} className="flex flex-col gap-4">
        <Textarea
          name="diff"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your code diff here, e.g., from 'git diff'"
          rows={15}
          className="bg-card font-code text-sm"
          required
        />
        <Button type="submit" className="self-start" disabled={isSubmitting || !text.trim()}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Reviewing...
            </>
          ) : (
            <>
              <ScanSearch className="mr-2 h-4 w-4" />
              Review Code
            </>
          )}
        </Button>
      </form>

      {(isSubmitting || state.review || state.error) && (
        <div className="relative">
          <div className="absolute top-4 left-6 z-10 flex items-center font-headline text-xl font-semibold">
            <Bot className="mr-2 h-6 w-6 text-primary" />
            AI Code Review
          </div>
          {isSubmitting ? (
            <div className="mt-2 w-full rounded-lg bg-muted p-6 pt-16">
              <div className="space-y-2">
                <div className="h-4 w-5/6 animate-pulse rounded bg-background/50"></div>
                <div className="h-4 w-full animate-pulse rounded bg-background/50"></div>
                <div className="h-4 w-3/4 animate-pulse rounded bg-background/50"></div>
                <div className="h-4 w-full animate-pulse rounded bg-background/50"></div>
              </div>
            </div>
          ) : state.error ? (
            <div className="mt-2 w-full rounded-lg border border-destructive bg-card p-6 pt-16">
              <p className="text-destructive">{state.error}</p>
            </div>
          ) : (
            <CodeBlock code={state.review} isMarkdown={true} />
          )}
        </div>
      )}
    </div>
  );
}
