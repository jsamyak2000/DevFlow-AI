'use client';
import { useState, useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
    <div className="flex flex-col gap-8">
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
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 flex items-center font-headline text-xl font-semibold">
              <Bot className="mr-2 h-6 w-6 text-primary" />
              Code Review
            </h2>
            {isSubmitting ? (
              <div className="space-y-2">
                <div className="h-4 w-5/6 animate-pulse rounded bg-muted"></div>
                <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
                <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
              </div>
            ) : state.error ? (
                <p className='text-destructive'>{state.error}</p>
            ) : (
              <div
                className="prose prose-sm max-w-none text-foreground/90 prose-headings:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-code:before:content-[''] prose-code:after:content-[''] prose-code:rounded prose-code:bg-muted prose-code:p-1"
                dangerouslySetInnerHTML={{ __html: state.review.replace(/```(\w+)?\n/g, '<pre><code>').replace(/```\n?/g, '</code></pre>') }}
              />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
