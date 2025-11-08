'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Clipboard } from 'lucide-react';

export function CodeBlock({ code }: { code: string }) {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  const languageMatch = code.match(/```(\w+)/);
  const language = languageMatch ? languageMatch[1] : 'code';
  const cleanCode = code.replace(/```(\w+)?\n/g, '').replace(/```\n?$/, '');

  return (
    <div className="relative rounded-lg bg-gray-800 text-white pt-14">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className="text-xs text-gray-400">{language}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:bg-gray-700 hover:text-white"
          onClick={copyToClipboard}
        >
          {hasCopied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Clipboard className="h-4 w-4" />
          )}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="font-code text-sm">{cleanCode}</code>
      </pre>
    </div>
  );
}
