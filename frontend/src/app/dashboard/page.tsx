'use client';

import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Mic, ArrowRight } from "lucide-react";
import Link from 'next/link';

// Mock Data for History
const sessions = [
    {
        id: 1,
        title: "Keynote Rehearsal - Oct 24",
        date: "Oct 24, 2024",
        duration: "03:45",
        score: 88,
        pacing: "Excellent",
        clarity: "High",
        status: "Excellent"
    },
    {
        id: 2,
        title: "Pitch Deck Rev 2",
        date: "Oct 26, 2024",
        duration: "12:15",
        score: 74,
        pacing: "Good",
        clarity: "Medium",
        status: "Needs Work"
    },
    {
        id: 3,
        title: "Intro Workshop",
        date: "Oct 25, 2024",
        duration: "45:00",
        score: 92,
        pacing: "Perfect",
        clarity: "High",
        status: "Perfect"
    },
    {
        id: 4,
        title: "Internal Sync",
        date: "Oct 23, 2024",
        duration: "15:30",
        score: 58,
        pacing: "Fast",
        clarity: "Low",
        status: "Critical Issues"
    }
];

export default function DashboardPage() {
    return (
        <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
            <AppSidebar />
            <div className="flex-1 flex flex-col min-w-0 bg-zinc-950/50">
                <AppHeader breadCrumb="Practice History" />

                <main className="flex-1 p-6 overflow-auto">
                    <div className="max-w-6xl mx-auto space-y-6">

                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-white">Practice History</h1>
                                <p className="text-zinc-400">Manage and review your past speech training sessions.</p>
                            </div>
                            <Button variant="outline" className="border-zinc-700 text-zinc-300">
                                Export Data
                            </Button>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                <Input
                                    placeholder="Search sessions by name or keywords..."
                                    className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-teal-600"
                                />
                            </div>
                            <Button variant="outline" className="border-zinc-700 text-zinc-300 gap-2">
                                Last 30 Days
                            </Button>
                            <Button variant="ghost" size="icon" className="border border-zinc-700 text-zinc-300">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
                            <Table>
                                <TableHeader className="bg-zinc-900">
                                    <TableRow className="border-zinc-800 hover:bg-zinc-900">
                                        <TableHead className="text-zinc-500 font-semibold uppercase text-xs tracking-wider pl-6">Session Details</TableHead>
                                        <TableHead className="text-zinc-500 font-semibold uppercase text-xs tracking-wider">Score</TableHead>
                                        <TableHead className="text-zinc-500 font-semibold uppercase text-xs tracking-wider">Pacing</TableHead>
                                        <TableHead className="text-zinc-500 font-semibold uppercase text-xs tracking-wider">Clarity</TableHead>
                                        <TableHead className="text-right text-zinc-500 font-semibold uppercase text-xs tracking-wider pr-6">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sessions.map((session) => (
                                        <TableRow key={session.id} className="border-zinc-800 hover:bg-zinc-900/80 transition-colors group">
                                            <TableCell className="pl-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${session.status === 'Excellent' || session.status === 'Perfect' ? 'bg-teal-900/50 text-teal-500' :
                                                            session.status === 'Critical Issues' ? 'bg-red-900/50 text-red-500' :
                                                                'bg-amber-900/50 text-amber-500'
                                                        }`}>
                                                        <Mic className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-zinc-200">{session.title}</div>
                                                        <div className="text-xs text-zinc-500">{session.date} • {session.duration} duration</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={`border-0 font-bold ${session.score >= 90 ? 'bg-teal-500/20 text-teal-500' :
                                                        session.score >= 80 ? 'bg-teal-500/10 text-teal-400' :
                                                            session.score >= 70 ? 'bg-amber-500/10 text-amber-500' :
                                                                'bg-red-500/10 text-red-500'
                                                    }`}>
                                                    {session.score}%
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {/* Mock Pacing Bars */}
                                                <div className="flex items-end gap-0.5 h-6 w-16 opacity-70">
                                                    {[40, 60, 30, 80, 50, 90, 40].map((h, i) => (
                                                        <div key={i} className="flex-1 bg-teal-500 rounded-sm" style={{ height: `${h}%` }}></div>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="w-24">
                                                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden mb-1">
                                                        <div className={`h-full rounded-full ${session.clarity === 'High' ? 'w-[90%] bg-teal-500' :
                                                                session.clarity === 'Medium' ? 'w-[70%] bg-amber-500' :
                                                                    'w-[40%] bg-red-500'
                                                            }`}></div>
                                                    </div>
                                                    <div className="text-[10px] font-semibold text-zinc-500 uppercase">{session.status}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right pr-6">
                                                <Link href="/session">
                                                    <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-full">
                                                        <ArrowRight className="h-5 w-5" />
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination Mock */}
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" className="border-zinc-800 text-zinc-400" disabled>Previous</Button>
                            <Button variant="outline" className="bg-teal-900 border-teal-800 text-white">1</Button>
                            <Button variant="outline" className="border-zinc-800 text-zinc-400">2</Button>
                            <Button variant="outline" className="border-zinc-800 text-zinc-400">3</Button>
                            <Button variant="outline" className="border-zinc-800 text-zinc-400">Next</Button>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
