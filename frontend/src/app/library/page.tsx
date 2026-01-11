'use client';

import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Play, BookOpen, ArrowRight, Activity } from "lucide-react";

export default function LibraryPage() {
    return (
        <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
            <AppSidebar />
            <div className="flex-1 flex flex-col min-w-0 bg-zinc-950/50">
                <AppHeader breadCrumb="Coach Library Hub" />

                <main className="flex-1 p-6 overflow-auto">
                    <div className="max-w-6xl mx-auto space-y-8">

                        <div className="flex flex-col gap-6">
                            <div>
                                <h1 className="text-2xl font-bold text-white mb-2">Improve Your Speaking Skills</h1>
                                <div className="flex gap-4">
                                    <div className="relative w-full max-w-md">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                        <Input
                                            placeholder="Search lessons..."
                                            className="pl-10 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Tabs defaultValue="all" className="w-full">
                                <TabsList className="bg-transparent p-0 gap-2 h-auto flex-wrap justify-start">
                                    <TabsTrigger value="all" className="rounded-full border border-zinc-700 data-[state=active]:bg-teal-700 data-[state=active]:text-white data-[state=active]:border-teal-700 text-zinc-400 bg-zinc-900/50">All Topics</TabsTrigger>
                                    <TabsTrigger value="public" className="rounded-full border border-zinc-700 data-[state=active]:bg-teal-700 text-zinc-400 bg-zinc-900/50">Public Speaking</TabsTrigger>
                                    <TabsTrigger value="vocal" className="rounded-full border border-zinc-700 data-[state=active]:bg-teal-700 text-zinc-400 bg-zinc-900/50">Vocal Variety</TabsTrigger>
                                    <TabsTrigger value="filler" className="rounded-full border border-zinc-700 data-[state=active]:bg-teal-700 text-zinc-400 bg-zinc-900/50">Filler Words</TabsTrigger>
                                    <TabsTrigger value="confidence" className="rounded-full border border-zinc-700 data-[state=active]:bg-teal-700 text-zinc-400 bg-zinc-900/50">Confidence</TabsTrigger>
                                    <TabsTrigger value="body" className="rounded-full border border-zinc-700 data-[state=active]:bg-teal-700 text-zinc-400 bg-zinc-900/50">Body Language</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>

                        {/* Grid of Lessons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Card 1 */}
                            <Card className="bg-white border-0 overflow-hidden flex flex-col group cursor-pointer hover:shadow-lg transition-all duration-300">
                                <div className="h-48 bg-zinc-900 relative flex items-center justify-center p-6 text-center">
                                    <div className="absolute top-4 left-4 z-10">
                                        <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border-0 text-[10px] tracking-wider font-bold">INTERMEDIATE</Badge>
                                    </div>
                                    <h3 className="text-2xl font-serif text-amber-500/90 leading-tight">MASTERING<br />PUBLIC<br />SPEAKING</h3>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                        <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                                            <Play className="h-5 w-5 text-black fill-current ml-1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 text-xs font-bold text-teal-700 mb-2 uppercase tracking-wider">
                                        <Play className="h-3 w-3" /> Video Lesson
                                    </div>
                                    <h3 className="font-bold text-zinc-900 text-lg mb-2 leading-tight">Mastering Public Speaking: The 3-Step Foundation</h3>
                                    <p className="text-sm text-zinc-500 line-clamp-2 mb-4">Learn the structural secrets of world-class speakers to captivate any audience.</p>

                                    <div className="mt-auto">
                                        <div className="flex justify-between text-xs text-zinc-400 mb-1.5 font-medium">
                                            <span>Progress: 65%</span>
                                            <span>12:45 left</span>
                                        </div>
                                        <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-teal-600 w-[65%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Card 2 */}
                            <Card className="bg-white border-0 overflow-hidden flex flex-col group cursor-pointer hover:shadow-lg transition-all duration-300">
                                <div className="h-48 bg-zinc-200 relative flex items-center justify-center overflow-hidden">
                                    <div className="absolute top-4 left-4 z-10">
                                        <Badge variant="secondary" className="bg-white text-zinc-900 shadow-sm border-0 text-[10px] tracking-wider font-bold">BEGINNER</Badge>
                                    </div>
                                    <div className="text-center font-mono text-zinc-400 transform -rotate-12">
                                        REDUCE<br />FILLER<br />WORDS
                                    </div>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                        <div className="h-12 w-12 rounded-full bg-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-lg flex items-center justify-center">
                                            <Play className="h-5 w-5 text-black fill-current ml-1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 text-xs font-bold text-teal-700 mb-2 uppercase tracking-wider">
                                        <Play className="h-3 w-3" /> Video Lesson
                                    </div>
                                    <h3 className="font-bold text-zinc-900 text-lg mb-2 leading-tight">Eliminating 'Um' and 'Uh' Naturally</h3>
                                    <p className="text-sm text-zinc-500 line-clamp-2 mb-4">Practical exercises to replace filler words with powerful pauses.</p>

                                    <div className="mt-auto">
                                        <div className="flex justify-between text-xs text-zinc-400 mb-1.5 font-medium">
                                            <span>Progress: 10%</span>
                                            <span>18:10 left</span>
                                        </div>
                                        <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-teal-600 w-[10%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Card 3 */}
                            <Card className="bg-white border-0 overflow-hidden flex flex-col group cursor-pointer hover:shadow-lg transition-all duration-300">
                                <div className="h-48 bg-zinc-900 relative flex items-center justify-center">
                                    <div className="absolute top-4 left-4 z-10">
                                        <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border-0 text-[10px] tracking-wider font-bold">ADVANCED</Badge>
                                    </div>
                                    {/* Mock Illustration */}
                                    <div className="h-24 w-24 border-2 border-blue-400 rounded-full flex items-center justify-center">
                                        <div className="h-16 w-8 bg-blue-400/20 rounded-t-full"></div>
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-2 uppercase tracking-wider">
                                        <BookOpen className="h-3 w-3" /> Reading Material
                                    </div>
                                    <h3 className="font-bold text-zinc-900 text-lg mb-2 leading-tight">Vocal Variety: Using Pitch as a Tool</h3>
                                    <p className="text-sm text-zinc-500 line-clamp-2 mb-4">How to use inflection to highlight key points and keep audience engagement.</p>

                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-100">
                                        <span className="text-xs text-zinc-400 font-medium">8 min read</span>
                                        <div className="flex items-center gap-1 text-xs font-bold text-teal-700 group-hover:gap-2 transition-all">
                                            Read now <ArrowRight className="h-3 w-3" />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* AI Recommendation Banner */}
                        <div className="bg-[#0f5156] rounded-2xl p-8 relative overflow-hidden flex items-center justify-between">
                            <div className="relative z-10 max-w-xl">
                                <Badge className="bg-white/10 text-teal-100 hover:bg-white/20 border-0 mb-4 px-3 py-1">AI RECOMMENDATION</Badge>
                                <h2 className="text-2xl font-bold text-white mb-2">Ready to level up your delivery?</h2>
                                <p className="text-teal-100/80 mb-6 leading-relaxed">
                                    Based on your last session, we recommend focusing on <strong className="text-white">Vocal Variety</strong>.
                                    You tend to be more monotone during data-heavy slides.
                                </p>
                                <Button className="bg-white text-teal-900 hover:bg-zinc-100 font-semibold h-11 px-6">
                                    Jump to Lesson
                                </Button>
                            </div>

                            {/* Right Side Card Mock */}
                            <div className="hidden lg:block bg-teal-800/50 backdrop-blur-md rounded-xl p-6 w-80 border border-teal-500/20">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-10 w-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                                        <Activity className="h-5 w-5 text-teal-300" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-teal-300 uppercase tracking-wider font-bold">Next Milestone</div>
                                        <div className="text-white font-bold text-lg">Confidence Boost</div>
                                    </div>
                                </div>
                                <div className="h-2 bg-black/20 rounded-full overflow-hidden mb-2">
                                    <div className="h-full bg-teal-400 w-[85%]"></div>
                                </div>
                                <p className="text-[10px] text-teal-200">You're 1 lesson away from earning your 'Eloquent Speaker' badge!</p>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
