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

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface Session {
    id: string;
    created_at: string;
    transcript: string;
    feedback_text: string;
    scores: any;
}

export default function DashboardPage() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const fetchSessions = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }

            const { data, error } = await supabase
                .from('sessions')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) console.error("Error fetching sessions:", error);
            else setSessions(data || []);

            setLoading(false);
        };
        fetchSessions();
    }, []);

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
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-zinc-500">Loading history...</TableCell>
                                        </TableRow>
                                    ) : sessions.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-zinc-500">No sessions found. Start practicing!</TableCell>
                                        </TableRow>
                                    ) : (
                                        sessions.map((session) => (
                                            <TableRow key={session.id} className="border-zinc-800 hover:bg-zinc-900/80 transition-colors group">
                                                <TableCell className="pl-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-10 w-10 rounded-full bg-teal-900/50 text-teal-500 flex items-center justify-center shrink-0">
                                                            <Mic className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-zinc-200">Practice Session</div>
                                                            <div className="text-xs text-zinc-500">
                                                                {new Date(session.created_at).toLocaleDateString()} • {new Date(session.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="border-0 font-bold bg-zinc-800 text-zinc-400">
                                                        N/A
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-zinc-500 text-sm">-</span>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-zinc-500 text-sm">-</span>
                                                </TableCell>
                                                <TableCell className="text-right pr-6">
                                                    <Link href={`/session/${session.id}`}>
                                                        <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-full">
                                                            <ArrowRight className="h-5 w-5" />
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        )))}
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
