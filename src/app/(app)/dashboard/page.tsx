'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Code, FileText, ListTodo } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    href: '/summarize',
    icon: <FileText className="h-8 w-8" />,
    title: 'AI Summary Tool',
    description: 'Summarize Git commits, PRs, and notes.',
  },
  {
    href: '/parse',
    icon: <ListTodo className="h-8 w-8" />,
    title: 'Meeting Parser',
    description: 'Extract action items from transcripts.',
  },
  {
    href: '/generate',
    icon: <Code className="h-8 w-8" />,
    title: 'Code Snippet Generator',
    description: 'Generate code from natural language.',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Welcome, Developer!</h1>
        <p className="text-muted-foreground">Here are your AI-powered tools to streamline your workflow.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Link
            href={feature.href}
            key={feature.href}
            className="block"
          >
            <Card className="group flex h-full flex-col justify-between p-6 transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1">
              <div>
                <div className="mb-4 text-primary">{feature.icon}</div>
                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                <CardDescription className="mt-2">{feature.description}</CardDescription>
              </div>
              <div className="mt-4 flex items-center justify-end text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Go to tool <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
