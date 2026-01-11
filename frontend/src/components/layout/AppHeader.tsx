'use client';

import { Bell, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AppHeaderProps {
    breadCrumb: string;
}

export function AppHeader({ breadCrumb }: AppHeaderProps) {
    return (
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
                <span>Moxie</span>
                <span>/</span>
                <span className="text-white font-medium">{breadCrumb}</span>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2 border-zinc-700 text-zinc-300 hover:bg-zinc-900">
                    <Share2 className="h-4 w-4" /> Share Report
                </Button>
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                    <Bell className="h-4 w-4" />
                </Button>
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}
