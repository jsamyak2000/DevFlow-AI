import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, FileText, ListTodo, BotMessageSquare, Rocket } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: 'AI Summaries',
    description: 'Effortlessly summarize Git commits, PRs, and daily stand-up notes to stay updated with minimal reading.',
  },
  {
    icon: <ListTodo className="h-8 w-8 text-primary" />,
    title: 'Meeting Parser',
    description: 'Automatically parse meeting transcripts from Google Meet or Slack to extract action items and create tasks in Trello or Jira.',
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: 'Code Snippet Generator',
    description: 'Generate useful code snippets and small automations from natural language requests, speeding up your development.',
  },
  {
    icon: <BotMessageSquare className="h-8 w-8 text-primary" />,
    title: 'Smart Integrations',
    description: 'Connect with your favorite tools like Google Calendar, Jira, and Trello to build powerful, automated workflows.',
  },
];

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="DevFlow AI Logo" width={32} height={32} />
          <span className="font-headline text-xl font-bold">DevFlow AI</span>
        </Link>
        <Button asChild>
          <Link href="/dashboard">
            <Rocket className="mr-2 h-4 w-4" /> Go to Dashboard
          </Link>
        </Button>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 text-center md:px-6 md:py-32">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Focus on Code, Not Chores.
            </h1>
            <p className="mx-auto mt-6 max-w-[700px] text-lg text-muted-foreground md:text-xl">
              DevFlow AI is a smart assistant that automates your repetitive developer tasks, so you can get back to what matters most: building great software.
            </p>
            <div className="mt-8">
              <Button asChild>
                <Link href="/dashboard">
                  <Rocket className="mr-2 h-4 w-4" /> Get Started
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {heroImage && (
          <section className="container mx-auto -mt-16 px-4 md:px-6">
            <div className="relative overflow-hidden rounded-2xl border shadow-2xl shadow-primary/10">
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={1200}
                height={600}
                className="w-full"
                data-ai-hint={heroImage.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </section>
        )}

        <section id="features" className="container mx-auto px-4 py-24 md:px-6 lg:py-32">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Your Workflow, Supercharged
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Integrate, automate, and innovate with our suite of AI-powered tools.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-sm gap-8 sm:max-w-4xl sm:grid-cols-2 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="transform-gpu transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <CardHeader className="items-center pb-4">
                  <div className="mb-4 rounded-full bg-primary/10 p-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="DevFlow AI Logo" width={24} height={24} />
            <span className="text-sm text-muted-foreground">© 2024 DevFlow AI. All rights reserved.</span>
          </div>
          <div className="flex gap-4 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
