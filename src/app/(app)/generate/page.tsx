'use client';
import { useState, useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CodeBlock } from '@/components/code-block';
import { generateAction } from './actions';
import { Bot, Loader2, Wand2 } from 'lucide-react';

type GenerateState = {
  code: string;
  error?: string;
};

const initialState: GenerateState = {
  code: '',
};

export default function GeneratePage() {
  const [state, formAction, isSubmitting] = useActionState(generateAction, initialState);
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formAction(formData);
  };
  
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Code Snippet Generator</h1>
        <p className="text-muted-foreground">
          Describe the code you need in plain English, and let AI build it for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., 'a python script to resize all jpg images in a directory'"
          className="bg-card"
          required
        />
        <Button type="submit" className="self-start" disabled={isSubmitting || !description.trim()}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Code
            </>
          )}
        </Button>
      </form>

      {(isSubmitting || state.code || state.error) && (
          <div className='relative'>
             <div className="absolute top-4 left-6 flex items-center font-headline text-xl font-semibold z-10">
              <Bot className="mr-2 h-6 w-6 text-primary" />
              Generated Code
            </div>
            {isSubmitting ? (
                 <div className="w-full rounded-lg bg-muted p-6 pt-16">
                    <div className="space-y-2">
                        <div className="h-4 w-5/6 animate-pulse rounded bg-background/50"></div>
                        <div className="h-4 w-full animate-pulse rounded bg-background/50"></div>
                        <div className="h-4 w-3/4 animate-pulse rounded bg-background/50"></div>
                        <div className="h-4 w-full animate-pulse rounded bg-background/50"></div>
                    </div>
                </div>
            ) : state.error ? (
                <div className="w-full rounded-lg border border-destructive bg-card p-6 pt-16">
                    <p className='text-destructive'>{state.error}</p>
                </div>
            ) : (
                <CodeBlock code={state.code} />
            )}
        </div>
      )}
    </div>
  );
}
