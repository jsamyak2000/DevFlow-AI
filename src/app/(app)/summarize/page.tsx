'use client';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { summarizeAction } from './actions';
import { Bot, Loader2, Sparkles } from 'lucide-react';

const initialState = {
  summary: '',
};

export default function SummarizePage() {
  const [state, formAction] = useFormState(summarizeAction, initialState);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    await formAction(formData);
    setIsSubmitting(false);
  };
  
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">AI Summaries</h1>
        <p className="text-muted-foreground">
          Paste your Git commits, pull request descriptions, or stand-up notes to get a concise summary.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Textarea
          name="textToSummarize"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g., feat(api): implement user authentication endpoint chore: update dependencies"
          rows={10}
          className="bg-card"
          required
        />
        <Button type="submit" className="self-start" disabled={isSubmitting || !text.trim()}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Summarizing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Summary
            </>
          )}
        </Button>
      </form>

      {(isSubmitting || state.summary) && (
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 flex items-center font-headline text-xl font-semibold">
              <Bot className="mr-2 h-6 w-6 text-primary" />
              Generated Summary
            </h2>
            {isSubmitting ? (
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
                <div className="h-4 w-5/6 animate-pulse rounded bg-muted"></div>
              </div>
            ) : (
              <p className="whitespace-pre-wrap text-foreground/90">{state.summary}</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
