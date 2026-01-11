'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, Layers, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AppSidebar } from '@/components/layout/AppSidebar';

export default function SessionDetailPage() {
    const [transcript, setTranscript] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams();
    const supabase = createClient();

    useEffect(() => {
        if (!id) return;

        const fetchSession = async () => {
            const { data, error } = await supabase
                .from('sessions')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error("Error fetching session:", error);
                setError("Session not found or access denied.");
            } else {
                setTranscript(data.transcript);
                setFeedback(data.feedback_text);
            }

            setLoading(false);
        };
        fetchSession();
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-zinc-950 text-white">
                <div className="text-xl font-bold animate-pulse">Loading Session...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-zinc-950 text-white">
                <div className="text-xl font-bold text-red-500">{error}</div>
                <Link href="/dashboard">
                    <Button variant="outline">Back to Dashboard</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
            {/* LEFT SIDEBAR */}
            <AppSidebar />

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col min-w-0 bg-zinc-950/50">

                {/* Header */}
                <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950">
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Link href="/dashboard" className="hover:text-white">Sessions</Link>
                        <span>/</span>
                        <span className="text-white font-medium">Session Detail</span>
                    </div>
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </header>

                {/* Content */}
                <ScrollArea className="flex-1 p-6">
                    <div className="max-w-4xl mx-auto space-y-6">

                        <div className="flex items-center gap-4 mb-6">
                            <Link href="/dashboard">
                                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </Link>
                            <h1 className="text-2xl font-bold text-white">Session Review</h1>
                        </div>

                        {/* Transcript Card */}
                        <Card className="border-0 bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-zinc-800">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800/50">
                                <CardTitle className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Transcript</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 font-normal">
                                    {transcript}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Analysis Card */}
                        <Card className="border-0 bg-teal-900/10 shadow-sm ring-1 ring-teal-900/30">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-teal-900/30">
                                <CardTitle className="text-lg font-semibold text-teal-100">Gemini Feedback</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="text-md leading-relaxed text-teal-200/90 whitespace-pre-wrap">
                                    {feedback}
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
