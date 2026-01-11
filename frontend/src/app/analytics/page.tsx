'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { Loader2, TrendingUp, Mic, Calendar } from 'lucide-react';

export default function AnalyticsPage() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data: sessions, error } = await supabase
                .from('sessions')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: true }); // Ascending for time series

            if (error) {
                console.error("Error fetching analytics:", error);
            } else if (sessions) {
                // Process data for charts
                const formattedData = sessions.map(session => ({
                    date: new Date(session.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
                    clarity: session.scores?.clarity || 0,
                    pacing: session.scores?.pacing || 0,
                    confidence: session.scores?.confidence || 0,
                    energy: session.scores?.energy || 0
                }));
                setData(formattedData);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    // Calculate Averages
    const avgClarity = data.length ? Math.round(data.reduce((acc, curr) => acc + curr.clarity, 0) / data.length) : 0;
    const avgPacing = data.length ? Math.round(data.reduce((acc, curr) => acc + curr.pacing, 0) / data.length) : 0;
    const avgConfidence = data.length ? Math.round(data.reduce((acc, curr) => acc + curr.confidence, 0) / data.length) : 0;

    return (
        <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
            <AppSidebar />
            <div className="flex-1 flex flex-col min-w-0 bg-zinc-950/50">
                <AppHeader breadCrumb="Analytics" />

                <main className="flex-1 p-6 overflow-auto scrollbar-thin scrollbar-thumb-zinc-800">
                    <div className="max-w-6xl mx-auto space-y-6">

                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-white">Performance Analytics</h1>
                            <div className="text-sm text-zinc-400">Last {data.length} Sessions</div>
                        </div>

                        {/* Top Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="bg-zinc-900 border-zinc-800">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-zinc-400">Avg Clarity</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-teal-500">{avgClarity}%</div>
                                    <p className="text-xs text-zinc-500 mt-1">Based on content structure</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-zinc-900 border-zinc-800">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-zinc-400">Avg Pacing</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-blue-500">{avgPacing}%</div>
                                    <p className="text-xs text-zinc-500 mt-1">Speed and pauses</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-zinc-900 border-zinc-800">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-zinc-400">Avg Confidence</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-purple-500">{avgConfidence}%</div>
                                    <p className="text-xs text-zinc-500 mt-1">Tone and delivery</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* Line Chart */}
                            <Card className="bg-zinc-900 border-zinc-800 lg:col-span-2">
                                <CardHeader>
                                    <CardTitle>Progress Over Time</CardTitle>
                                    <CardDescription>Tracking your key metrics across recent sessions.</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[300px]">
                                    {loading ? (
                                        <div className="h-full flex items-center justify-center text-zinc-500">
                                            <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading data...
                                        </div>
                                    ) : data.length === 0 ? (
                                        <div className="h-full flex items-center justify-center text-zinc-500">
                                            No data yet. Complete a session to see analytics!
                                        </div>
                                    ) : (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={data}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                                <XAxis dataKey="date" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                                                    itemStyle={{ color: '#e4e4e7' }}
                                                />
                                                <Legend />
                                                <Line type="monotone" dataKey="clarity" stroke="#14b8a6" strokeWidth={2} dot={{ r: 4, fill: '#14b8a6' }} activeDot={{ r: 6 }} />
                                                <Line type="monotone" dataKey="pacing" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6' }} />
                                                <Line type="monotone" dataKey="confidence" stroke="#a855f7" strokeWidth={2} dot={{ r: 4, fill: '#a855f7' }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    )}
                                </CardContent>
                            </Card>

                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
