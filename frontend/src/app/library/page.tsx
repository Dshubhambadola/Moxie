'use client';

import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from 'next/link';

export const COACH_PERSONAS = [
    {
        id: 'standard',
        name: 'The Standard Coach',
        description: 'Balanced feedback on clarity, pacing, and confidence. Good for general practice.',
        avatar: 'ST',
        color: 'bg-zinc-700'
    },
    {
        id: 'executive',
        name: 'The Executive',
        description: 'Direct, concise, and professional. Focuses heavily on eliminating filler words and getting to the point.',
        avatar: 'EX',
        color: 'bg-blue-700'
    },
    {
        id: 'encourager',
        name: 'The Encourager',
        description: 'Supportive and positive. Highlights your strengths while gently suggesting areas for improvement.',
        avatar: 'EN',
        color: 'bg-teal-600'
    },
    {
        id: 'interviewer',
        name: 'The Interviewer',
        description: 'Tough and probing. Evaluates your structure, confidence under pressure, and clarity of thought.',
        avatar: 'IN',
        color: 'bg-rose-800'
    }
];

export default function LibraryPage() {
    return (
        <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
            <AppSidebar />

            <div className="flex-1 flex flex-col min-w-0 bg-zinc-950/50">
                <AppHeader breadCrumb="Coach Library" />

                <main className="flex-1 p-6 overflow-auto">
                    <div className="max-w-6xl mx-auto space-y-8">
                        <header className="mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">Select Your Coach</h1>
                            <p className="text-zinc-400">Choose an AI persona for your next practice session. Their personality will shape your feedback.</p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {COACH_PERSONAS.map((coach) => (
                                <Card key={coach.id} className="bg-zinc-900 border-zinc-800 flex flex-col hover:border-teal-500/50 transition-colors">
                                    <CardHeader className="flex flex-col items-center gap-4 pb-2 text-center pt-8">
                                        <Avatar className={`h-20 w-20 ${coach.color} border-4 border-zinc-950 shadow-xl`}>
                                            <AvatarFallback className="text-white font-bold text-2xl">{coach.avatar}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-xl text-white mt-4">{coach.name}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1 text-center mt-2 pb-6 px-6">
                                        <CardDescription className="text-zinc-400 leading-relaxed text-sm">
                                            {coach.description}
                                        </CardDescription>
                                    </CardContent>
                                    <CardFooter className="pt-0 p-6 border-zinc-800/50">
                                        <Link href={`/practice/live?persona=${coach.id}`} className="w-full">
                                            <Button className="w-full bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-900/20">
                                                Practice with {coach.avatar}
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        {/* Info Banner */}
                        <div className="bg-[#0f5156]/50 border border-teal-900/50 rounded-2xl p-6 mt-12 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">How do Personas work?</h3>
                                <p className="text-teal-100/70 text-sm">
                                    When you select a coach, the backend AI is instructed to adopt that specific personality.
                                    An Executive will be much harsher on your pacing than an Encourager!
                                </p>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
