'use client';

import { useState, useEffect } from 'react';
import { LiveKitRoom, RoomAudioRenderer, useRoomContext, useConnectionState } from '@livekit/components-react';
import { ConnectionState, RoomEvent } from 'livekit-client';
import '@livekit/components-styles';

// UI Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Mic, BarChart2, BookOpen, Layers, Bell, Share2, MoreVertical, Play, Pause, Volume2 } from 'lucide-react';

export default function SessionPage() {
    const [token, setToken] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const resp = await fetch('/api/livekit/token?room=practice-room&participant=user-1');
                const data = await resp.json();
                setToken(data.token);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    if (token === '') {
        return <div className="flex h-screen w-full items-center justify-center bg-zinc-950 text-white">Getting Token...</div>;
    }

    return (
        <LiveKitRoom
            video={false}
            audio={true}
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            data-lk-theme="default"
            style={{ height: '100vh', background: '#09090b', color: 'white' }}
        >
            <RoomAudioRenderer />
            <DashboardContent />
        </LiveKitRoom>
    );
}

function DashboardContent() {
    const room = useRoomContext();
    const connectionState = useConnectionState();
    const [isRecording, setIsRecording] = useState(false);

    // Mock Data for "Interactive Transcript"
    const transcript = [
        { text: "Good morning everyone. ", type: "normal" },
        { text: "Um", type: "filler" },
        { text: ", today I want to talk about the future of AI-assisted communication. ", type: "normal" },
        { text: "We are seeing a massive shift in how teams collaborate and share ideas across borders.", type: "monotone" },
        { text: " The goal isn't just to talk, but to be truly understood by your audience.", type: "normal" },
        { text: "When we look at the data from the last quarter, it becomes incredibly clear that clear delivery is the number one predictor of project success.", type: "fast" },
        { text: " Many leaders struggle with ", type: "normal" },
        { text: "like", type: "filler" },
        { text: " finding the right tone for their message.", type: "normal" }
    ];

    if (connectionState !== ConnectionState.Connected) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-zinc-950 text-white">
                <div className="text-xl font-bold">Connecting to Room...</div>
                <div className="text-zinc-500 text-sm">Status: {connectionState}</div>
            </div>
        )
    }

    return (
        <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
            {/* LEFT SIDEBAR */}
            <div className="w-64 border-r border-zinc-800 bg-zinc-950 p-4 flex flex-col gap-6 hidden md:flex">
                <div className="flex items-center gap-2 px-2">
                    <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <Mic className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg leading-none">Moxie Al</h2>
                        <span className="text-xs text-zinc-500">Speech Coach</span>
                    </div>
                </div>

                <nav className="flex flex-col gap-2">
                    <Button variant="ghost" className="justify-start gap-2 text-zinc-400 hover:text-white hover:bg-zinc-900">
                        <Layers className="h-4 w-4" /> Dashboard
                    </Button>
                    <Button variant="secondary" className="justify-start gap-2 bg-zinc-900 text-white">
                        <Mic className="h-4 w-4" /> Practice Sessions
                    </Button>
                    <Button variant="ghost" className="justify-start gap-2 text-zinc-400 hover:text-white hover:bg-zinc-900">
                        <BarChart2 className="h-4 w-4" /> Analytics
                    </Button>
                    <Button variant="ghost" className="justify-start gap-2 text-zinc-400 hover:text-white hover:bg-zinc-900">
                        <BookOpen className="h-4 w-4" /> Coach Library
                    </Button>
                </nav>

                <div className="mt-auto">
                    <div className="text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wider">Recent Practice</div>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between text-sm group cursor-pointer hover:bg-zinc-900 p-2 rounded-md transition">
                            <div>
                                <div className="font-medium text-zinc-300">Pitch Deck Rev 2</div>
                                <div className="text-xs text-zinc-500">Oct 26, 12:30 PM</div>
                            </div>
                            <span className="text-green-500 text-xs">↗</span>
                        </div>
                        <div className="flex items-center justify-between text-sm group cursor-pointer hover:bg-zinc-900 p-2 rounded-md transition">
                            <div>
                                <div className="font-medium text-zinc-300">Intro Workshop</div>
                                <div className="text-xs text-zinc-500">Oct 25, 09:15 AM</div>
                            </div>
                            <span className="text-zinc-500 text-xs">→</span>
                        </div>
                    </div>

                    <Button className="w-full mt-6 bg-teal-700 hover:bg-teal-600 text-white gap-2">
                        <Mic className="h-4 w-4" /> New Session
                    </Button>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col min-w-0 bg-zinc-950/50">
                {/* Header */}
                <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950">
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <span>Sessions</span>
                        <span>/</span>
                        <span className="text-white font-medium">Keynote Rehearsal - Live</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2 border-zinc-700 text-zinc-300 hover:bg-zinc-900">
                            <Share2 className="h-4 w-4" /> Share Report
                        </Button>
                        <Button variant="ghost" size="icon" className="text-zinc-400">
                            <Bell className="h-4 w-4" />
                        </Button>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </header>

                {/* Content */}
                <ScrollArea className="flex-1 p-6">
                    <div className="max-w-4xl mx-auto space-y-6">

                        {/* Transcript Card */}
                        <Card className="border-0 bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-zinc-800">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800/50">
                                <CardTitle className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Interactive Transcript</CardTitle>
                                <div className="flex gap-4 text-xs font-medium">
                                    <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-200"></span> FILLER WORDS</div>
                                    <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-200"></span> MONOTONE</div>
                                    <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-200"></span> FAST PACE</div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 font-normal">
                                    {transcript.map((chunk, i) => {
                                        let className = "";
                                        if (chunk.type === "filler") className = "bg-red-100 text-red-900 px-1 rounded mx-0.5";
                                        if (chunk.type === "monotone") className = "bg-blue-100 text-blue-900 px-1 rounded mx-0.5";
                                        if (chunk.type === "fast") className = "bg-yellow-100 text-yellow-900 px-1 rounded mx-0.5";

                                        return <span key={i} className={className}>{chunk.text}</span>
                                    })}
                                </div>
                                <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
                                    {/* Mock Audio Waveform */}
                                    <div className="flex-1 h-12 flex items-end gap-1 justify-center opacity-50">
                                        {[...Array(40)].map((_, i) => (
                                            <div key={i} className="w-1 bg-zinc-400 rounded-full animate-pulse" style={{ height: `${Math.random() * 100}%` }}></div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Button variant="ghost" size="icon" className="hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full h-12 w-12">
                                            <span className="text-xs text-zinc-500">-10s</span>
                                        </Button>
                                        <Button className="h-12 w-12 rounded-full bg-teal-700 hover:bg-teal-600 flex items-center justify-center">
                                            <Pause className="h-5 w-5 text-white" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full h-12 w-12">
                                            <span className="text-xs text-zinc-500">+10s</span>
                                        </Button>
                                    </div>
                                    <div className="w-32 flex items-center gap-2 text-zinc-400">
                                        <span className="text-xs font-mono">01:24</span>
                                        <div className="h-1 flex-1 bg-zinc-200 rounded-full overflow-hidden">
                                            <div className="h-full w-1/3 bg-teal-600"></div>
                                        </div>
                                        <span className="text-xs font-mono">03:45</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </ScrollArea>
            </div>

            {/* RIGHT SIDEBAR - METRICS */}
            <div className="w-80 border-l border-zinc-800 bg-zinc-950 p-6 flex flex-col gap-6 hidden xl:flex">
                <div>
                    <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">Communication Scores</h3>
                    <div className="space-y-4">
                        {/* Score 1 */}
                        <div className="flex items-center gap-4">
                            <div className="relative h-16 w-16 rounded-full border-4 border-teal-800 flex items-center justify-center">
                                <span className="font-bold text-xl text-white">85%</span>
                                <svg className="absolute inset-0 h-full w-full -rotate-90 stroke-teal-500" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="46" fill="transparent" strokeWidth="8" strokeDasharray="290" strokeDashoffset="70" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-bold text-white">Clarity</div>
                                <div className="text-xs text-zinc-500">Articulation & volume stability</div>
                            </div>
                        </div>
                        {/* Score 2 */}
                        <div className="flex items-center gap-4">
                            <div className="relative h-16 w-16 rounded-full border-4 border-zinc-700 flex items-center justify-center">
                                <span className="font-bold text-xl text-white">72%</span>
                                <svg className="absolute inset-0 h-full w-full -rotate-90 stroke-blue-500" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="46" fill="transparent" strokeWidth="8" strokeDasharray="290" strokeDashoffset="120" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-bold text-white">Delivery</div>
                                <div className="text-xs text-zinc-500">Intonation & pitch variance</div>
                            </div>
                        </div>
                        {/* Score 3 */}
                        <div className="flex items-center gap-4">
                            <div className="relative h-16 w-16 rounded-full border-4 border-zinc-700 flex items-center justify-center">
                                <span className="font-bold text-xl text-white">90%</span>
                                <svg className="absolute inset-0 h-full w-full -rotate-90 stroke-green-500" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="46" fill="transparent" strokeWidth="8" strokeDasharray="290" strokeDashoffset="30" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-bold text-white">Confidence</div>
                                <div className="text-xs text-zinc-500">Minimal hesitation & fillers</div>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="bg-zinc-800" />

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Pacing (WPM)</h3>
                        <span className="text-xs font-bold text-teal-500">Avg: 142</span>
                    </div>
                    {/* Mock Chart Area */}
                    <div className="h-24 w-full bg-zinc-900 rounded-lg flex items-end justify-between px-2 pb-2 overflow-hidden gap-1">
                        {[40, 60, 45, 70, 90, 85, 60, 50, 75, 80, 60, 55, 40].map((h, i) => (
                            <div key={i} className="w-full bg-teal-500/20 rounded-t-sm" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-zinc-600 mt-1">
                        <span>START</span>
                        <span>END</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-3 leading-relaxed">
                        <strong className="text-teal-500">Insight:</strong> You tend to accelerate significantly during transitions. Focus on pausing for 2 seconds after key points.
                    </p>
                </div>

                <div className="mt-auto bg-teal-900/20 border border-teal-900/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-6 w-6 rounded-full bg-teal-500 flex items-center justify-center">
                            <span className="text-black font-bold text-xs">AI</span>
                        </div>
                        <div className="font-semibold text-teal-100 text-sm">Coach Recommendation</div>
                    </div>
                    <p className="text-xs text-teal-200/80 leading-relaxed">
                        Work on your opening hook. The first 30 seconds are slightly monotone; try emphasizing the words "future" and "massive" to engage listeners early.
                    </p>
                </div>
            </div>
        </div>
    );
}
