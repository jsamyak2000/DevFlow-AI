'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Clipboard } from 'lucide-react';

// A simple markdown-to-HTML converter
function markdownToHtml(markdown: string) {
    // Convert headers
    markdown = markdown.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    markdown = markdown.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    markdown = markdown.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    // Convert bold
    markdown = markdown.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    // Convert italic
    markdown = markdown.replace(/\*(.*)\*/gim, '<em>$1</em>');
    // Convert list items
    markdown = markdown.replace(/^\s*\n\* (.*)/gim, '<ul>\n<li>$1</li>');
    markdown = markdown.replace(/^\* (.*)/gim, '<li>$1</li>');
     // Convert code blocks
    markdown = markdown.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
    // Convert inline code
    markdown = markdown.replace(/`([^`]+)`/g, '<code>$1</code>');
    return markdown.trim();
}


export function CodeBlock({ code, isMarkdown }: { code: string, isMarkdown?: boolean }) {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = () => {
    // remove markdown formatting before copying
    const plainText = code.replace(/```(\w+)?\n/g, '').replace(/```\n?$/, '');
    navigator.clipboard.writeText(plainText);
    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  const languageMatch = code.match(/```(\w+)/);
  const language = languageMatch ? languageMatch[1] : 'code';
  
  const cleanCode = code.replace(/```(\w+)?\n/g, '').replace(/```\n?$/, '');

  if (isMarkdown) {
      return (
        <div className="relative rounded-lg bg-gray-800 text-white pt-14">
             <div className="absolute top-4 right-4 flex items-center gap-2">
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
            <div
              className="prose prose-sm prose-invert max-w-none p-4 font-code text-sm"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(code) }}
            />
        </div>
      )
  }

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
