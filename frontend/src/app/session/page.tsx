'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Mic, BarChart2, BookOpen, Layers, Bell, Share2, Pause } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { AppSidebar } from '@/components/layout/AppSidebar';

export default function SessionPage() {
    const [transcript, setTranscript] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('');
    const [scores, setScores] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();

    useEffect(() => {
        const storedTranscript = sessionStorage.getItem('lastSessionTranscript');
        if (storedTranscript) {
            setTranscript(storedTranscript);

            const analyzeAndSave = async () => {
                try {
                    // Get token for auth
                    const { data: { session } } = await supabase.auth.getSession();
                    const token = session?.access_token;

                    // 1. Analyze
                    const res = await fetch('/api/analyze', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ transcript: storedTranscript })
                    });

                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error || 'Analysis request failed');

                    setFeedback(data.feedback);
                    setScores(data.scores);

                    // 2. Save to Supabase (if logged in)
                    const { data: { user } } = await supabase.auth.getUser();
                    if (user) {
                        const { error: saveError } = await supabase.from('sessions').insert({
                            user_id: user.id,
                            transcript: storedTranscript,
                            feedback_text: data.feedback,
                            scores: data.scores // Save entire scores object
                        });
                        if (saveError) console.error("Failed to save session:", saveError);
                    } else {
                        console.log("User not logged in, session not saved.");
                    }

                } catch (err: any) {
                    console.error("Analysis failed", err);
                    setFeedback("Failed to analyze session: " + (err.message || "Unknown error"));
                } finally {
                    setLoading(false);
                }
            };
            analyzeAndSave();

        } else {
            setLoading(false);
            setTranscript("No transcript found. Please start a new session.");
        }
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-zinc-950 text-white">
                <div className="text-xl font-bold animate-pulse">Analyzing Session with Gemini...</div>
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
                        <span>Sessions</span>
                        <span>/</span>
                        <span className="text-white font-medium">Session Analysis</span>
                    </div>
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </header>

                {/* Content */}
                <ScrollArea className="flex-1 p-6">
                    <div className="max-w-4xl mx-auto space-y-6">

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
                            <CardContent className="pt-6 space-y-6">
                                {/* Scores Grid */}
                                {scores && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {Object.entries(scores).map(([key, value]: [string, any]) => (
                                            <div key={key} className="bg-zinc-900/50 p-4 rounded-lg border border-teal-500/10 text-center">
                                                <div className="text-xs uppercase tracking-wider text-teal-500/70 mb-1">{key}</div>
                                                <div className="text-2xl font-bold text-white">{value}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}

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
