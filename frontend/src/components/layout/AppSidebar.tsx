'use client';

import { Mic, BarChart2, BookOpen, Layers } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";

export function AppSidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

    return (
        <div className="w-64 border-r border-zinc-800 bg-zinc-950 p-4 flex flex-col gap-6 hidden md:flex">
            <div className="flex items-center gap-2 px-2">
                <div className="h-8 w-8 rounded-lg bg-teal-600 flex items-center justify-center">
                    <Mic className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h2 className="font-bold text-lg leading-none text-white">Moxie Al</h2>
                    <span className="text-xs text-zinc-500">Speech Coach</span>
                </div>
            </div>

            <nav className="flex flex-col gap-2">
                <Link href="/dashboard">
                    <Button variant={isActive('/dashboard') ? "secondary" : "ghost"} className={`w-full justify-start gap-2 ${isActive('/dashboard') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}>
                        <Layers className="h-4 w-4" /> Dashboard
                    </Button>
                </Link>
                <Link href="/practice/live">
                    <Button variant={isActive('/practice') ? "secondary" : "ghost"} className={`w-full justify-start gap-2 ${isActive('/practice') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}>
                        <Mic className="h-4 w-4" /> Practice Sessions
                    </Button>
                </Link>
                <Link href="/analytics">
                    <Button variant={isActive('/analytics') ? "secondary" : "ghost"} className={`w-full justify-start gap-2 ${isActive('/analytics') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}>
                        <BarChart2 className="h-4 w-4" /> Analytics
                    </Button>
                </Link>
                <Link href="/library">
                    <Button variant={isActive('/library') ? "secondary" : "ghost"} className={`w-full justify-start gap-2 ${isActive('/library') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}>
                        <BookOpen className="h-4 w-4" /> Coach Library
                    </Button>
                </Link>
            </nav>

            <div className="mt-auto">
                <div className="text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wider">Recent Practice</div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-sm group cursor-pointer hover:bg-zinc-900 p-2 rounded-md transition text-zinc-300">
                        <div>
                            <div className="font-medium">Pitch Deck Rev 2</div>
                            <div className="text-xs text-zinc-500">Oct 26, 12:30 PM</div>
                        </div>
                        <span className="text-teal-500 text-xs text-zinc-500">↗</span>
                    </div>
                </div>

                <Link href="/practice/live">
                    <Button className="w-full mt-6 bg-teal-700 hover:bg-teal-600 text-white gap-2">
                        <Mic className="h-4 w-4" /> New Session
                    </Button>
                </Link>
            </div>
        </div>
    );
}
