'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  FileText,
  ListTodo,
  Code,
  Bot,
  ScanSearch,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { href: '/dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
  { href: '/summarize', icon: <FileText />, label: 'AI Summaries' },
  { href: '/parse', icon: <ListTodo />, label: 'Meeting Parser' },
  { href: '/generate', icon: <Code />, label: 'Code Generator' },
  { href: '/review', icon: <ScanSearch />, label: 'Code Reviewer' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="DevFlow AI Logo" width={32} height={32} />
              <span className="font-headline text-xl font-bold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                DevFlow AI
              </span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} passHref>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      tooltip={{ children: item.label }}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
             <Link href="/generate" passHref>
                <SidebarMenuButton tooltip={{ children: 'Code Generator' }}>
                    <Bot />
                    <span>AI Assistant</span>
                </SidebarMenuButton>
            </Link>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col w-0">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex items-center gap-4 ml-auto">
              {/* UserNav removed */}
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
