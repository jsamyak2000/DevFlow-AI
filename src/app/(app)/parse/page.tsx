'use client';
import { useState, useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { parseAction } from './actions';
import { Bot, CheckSquare, List, Loader2 } from 'lucide-react';

type ParseState = {
  actionItems: string[];
  error?: string;
};

const initialState: ParseState = {
  actionItems: [],
};

export default function ParsePage() {
  const [state, formAction, isSubmitting] = useActionState(parseAction, initialState);
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formAction(formData);
  };
  
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Meeting Parser</h1>
        <p className="text-muted-foreground">
          Paste a meeting transcript to extract key action items and decisions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Textarea
          name="transcript"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your full meeting transcript here..."
          rows={12}
          className="bg-card"
          required
        />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className='flex items-center gap-2'>
                <Label htmlFor="outputFormat">Output Format:</Label>
                <Select name="outputFormat" defaultValue="Trello">
                    <SelectTrigger id="outputFormat" className="w-[180px] bg-card">
                    <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="Trello">Trello</SelectItem>
                    <SelectItem value="Jira">Jira</SelectItem>
                    <SelectItem value="list">Simple List</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          <Button type="submit" className="self-start" disabled={isSubmitting || !text.trim()}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Parsing...
              </>
            ) : (
              <>
                <List className="mr-2 h-4 w-4" />
                Parse Transcript
              </>
            )}
          </Button>
        </div>
      </form>

      {(isSubmitting || state.actionItems.length > 0 || state.error) && (
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 flex items-center font-headline text-xl font-semibold">
              <Bot className="mr-2 h-6 w-6 text-primary" />
              Extracted Action Items
            </h2>
            {isSubmitting ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <CheckSquare className="h-4 w-4 text-muted"/>
                    <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                </div>
                <div className="flex items-center gap-3">
                    <CheckSquare className="h-4 w-4 text-muted"/>
                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
                </div>
              </div>
            ) : state.error ? (
                <p className='text-destructive'>{state.error}</p>
            ) : (
              <ul className="space-y-2">
                {state.actionItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckSquare className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
