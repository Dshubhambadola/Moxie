'use client';

import { useState, useEffect } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, StopCircle, Menu, AlertTriangle, Gauge, Volume2 } from "lucide-react";
import Link from 'next/link';
import { useAudioRecorder } from "@/hooks/useAudioRecorder";

export default function LivePracticePage() {
    // New Audio Recorder Hook
    const { isRecording, transcript, startRecording, stopRecording, error } = useAudioRecorder();
    const [duration, setDuration] = useState(0);

    // Auto-start recording on mount
    useEffect(() => {
        startRecording();
        return () => {
            stopRecording();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Timer Logic
    useEffect(() => {
        if (isRecording) {
            const interval = setInterval(() => setDuration(d => d + 1), 1000);
            return () => clearInterval(interval);
        }
    }, [isRecording]);

    const formatTime = (secs: number) => {
        const mins = Math.floor(secs / 60);
        const remainingSecs = secs % 60;
        return `${mins.toString().padStart(2, '0')} : ${remainingSecs.toString().padStart(2, '0')}`;
    }

    // if (!isRecording && duration === 0) {
    //      // Optional loading state
    //      return <div className="flex h-screen w-full items-center justify-center bg-zinc-950 text-white">Initializing Audio...</div>;
    // }

    return (
        <div className="flex h-screen w-full flex-col bg-zinc-950 text-white font-sans">
            {/* Simple Header for Focus Mode */}
            <header className="h-16 px-8 flex items-center justify-between border-b border-zinc-800 bg-zinc-950 fixed top-0 w-full z-10">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-teal-600 flex items-center justify-center">
                        <Mic className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-white">Moxie</span>
                </div>
                <nav className="flex items-center gap-8 text-sm font-medium text-zinc-500">
                    <span className="text-white">Live Practice</span>
                    <Link href="/dashboard" className="hover:text-zinc-300 transition">Dashboard</Link>
                    <Link href="/library" className="hover:text-zinc-300 transition">Library</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white"><Menu className="h-5 w-5" /></Button>
                    <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700"></div>
                </div>
            </header>

            <main className="flex-1 flex pt-16">

                {/* Main Stage */}
                <div className="flex-1 flex flex-col items-center justify-center relative p-8">

                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-bold text-white mb-2 font-serif">Live Recording Session</h1>
                        <p className="text-zinc-400">Recording and analyzing your pitch in real-time...</p>
                        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
                    </div>

                    {/* Timer */}
                    <div className="flex items-baseline gap-2 mb-16">
                        <div className="bg-zinc-900/50 rounded-2xl px-6 py-3 border border-zinc-800">
                            <span className="text-4xl font-bold text-white font-mono tracking-widest">{formatTime(duration).split(':')[0]}</span>
                            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block text-center mt-1">MINUTES</span>
                        </div>
                        <span className="text-4xl font-bold text-teal-600">:</span>
                        <div className="bg-zinc-900/50 rounded-2xl px-6 py-3 border border-zinc-800">
                            <span className="text-4xl font-bold text-white font-mono tracking-widest">{formatTime(duration).split(':')[1]}</span>
                            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block text-center mt-1">SECONDS</span>
                        </div>
                    </div>

                    {/* Visualizer Mock (only animated when recording) */}
                    <div className="h-64 flex items-center gap-1.5 mb-16">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-3 rounded-full transition-all duration-300 ${i === 9 || i === 10 ? 'bg-teal-500 h-32' : 'bg-teal-900/40 h-16'}`}
                                style={{
                                    height: isRecording ? `${40 + Math.random() * 100}px` : '40px',
                                    animation: isRecording ? `pulse 1s infinite ${i * 0.1}s` : 'none'
                                }}
                            ></div>
                        ))}
                        <div className={`absolute bg-zinc-900 px-4 py-2 rounded-full shadow-lg border border-zinc-800 flex items-center gap-2 text-xs font-bold tracking-widest text-white uppercase ${isRecording ? 'opacity-100' : 'opacity-50'}`}>
                            <Mic className={`h-3 w-3 text-red-500 ${isRecording ? 'animate-pulse' : ''}`} /> {isRecording ? 'Listening' : 'Paused'}
                        </div>
                    </div>

                    {/* Transcript Preview */}
                    <div className="max-w-2xl text-center w-full relative group">
                        <div className="max-h-[200px] overflow-y-auto p-4 rounded-xl transition-colors hover:bg-white/5 no-scrollbar mask-gradient-b">
                            <p className="text-lg text-zinc-400 font-serif italic leading-relaxed">
                                {transcript ? (
                                    <>"{transcript}"</>
                                ) : (
                                    <span className="text-zinc-600">Start speaking to see your transcript...</span>
                                )}
                            </p>
                        </div>
                    </div>


                    {/* Floating Controls */}
                    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-zinc-900 p-2 rounded-full shadow-2xl border border-zinc-800 pl-6">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400"
                            onClick={() => isRecording ? stopRecording() : startRecording()}
                        >
                            <Mic className={`h-5 w-5 ${!isRecording ? 'text-red-500' : ''}`} />
                        </Button>
                        <Link href="/session" onClick={() => {
                            stopRecording();
                            if (typeof window !== 'undefined') {
                                sessionStorage.setItem('lastSessionTranscript', transcript);
                            }
                        }}>
                            <Button className="h-12 px-8 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-base shadow-lg shadow-teal-900/20">
                                <StopCircle className="h-5 w-5 mr-2" /> Stop & Analyze Session
                            </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>

                </div>

                {/* Right Feedback Panel */}
                <div className="w-80 bg-black/20 border-l border-zinc-800 p-6 hidden xl:flex flex-col gap-6 backdrop-blur-sm z-10">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-zinc-300">Live Feedback</span>
                        <Badge variant="secondary" className="bg-teal-900/30 text-teal-400 border-0 text-[10px]">ACTIVE</Badge>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex gap-3">
                            <div className="h-10 w-10 rounded-full bg-orange-900/20 flex items-center justify-center shrink-0">
                                <AlertTriangle className="h-5 w-5 text-orange-500" />
                            </div>
                            <div>
                                <h4 className="font-bold text-zinc-200 text-sm">Filler Word</h4>
                                <p className="text-xs text-zinc-500">Avoid using "so" frequently.</p>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex gap-3">
                            <div className="h-10 w-10 rounded-full bg-teal-900/20 flex items-center justify-center shrink-0">
                                <Gauge className="h-5 w-5 text-teal-500" />
                            </div>
                            <div>
                                <h4 className="font-bold text-zinc-200 text-sm">Great Pace</h4>
                                <p className="text-xs text-zinc-500">Current speed: 140 wpm</p>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex gap-3 opacity-50">
                            <div className="h-10 w-10 rounded-full bg-yellow-900/20 flex items-center justify-center shrink-0">
                                <Volume2 className="h-5 w-5 text-yellow-500" />
                            </div>
                            <div>
                                <h4 className="font-bold text-zinc-200 text-sm">Volume Low</h4>
                                <p className="text-xs text-zinc-500">Try speaking a bit louder.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto bg-teal-900/10 rounded-2xl p-6 border border-teal-900/30">
                        <span className="text-[10px] font-bold text-teal-500 uppercase tracking-wider mb-2 block">Quick Tip</span>
                        <p className="text-sm text-zinc-400 italic font-serif leading-relaxed">
                            "Maintain eye contact with the camera to build trust during remote pitches."
                        </p>
                    </div>
                </div>

            </main>
        </div>
    );
}
