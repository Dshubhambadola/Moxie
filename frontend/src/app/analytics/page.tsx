'use client';

import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, TrendingDown, Clock, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Oct 01', clarity: 65, confidence: 40, delivery: 20 },
    { name: 'Oct 05', clarity: 68, confidence: 45, delivery: 25 },
    { name: 'Oct 08', clarity: 75, confidence: 55, delivery: 30 },
    { name: 'Oct 12', clarity: 80, confidence: 50, delivery: 35 },
    { name: 'Oct 15', clarity: 85, confidence: 45, delivery: 40 },
    { name: 'Oct 19', clarity: 70, confidence: 60, delivery: 42 },
    { name: 'Oct 22', clarity: 65, confidence: 75, delivery: 45 },
    { name: 'Oct 26', clarity: 90, confidence: 65, delivery: 48 },
    { name: 'Oct 30', clarity: 82, confidence: 80, delivery: 50 },
];

export default function AnalyticsPage() {
    return (
        <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
            <AppSidebar />
            <div className="flex-1 flex flex-col min-w-0 bg-zinc-950/50">
                <AppHeader breadCrumb="Performance Analytics" />

                <main className="flex-1 p-6 overflow-auto">
                    <div className="max-w-6xl mx-auto space-y-6">

                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-white">Performance Analytics</h1>
                            <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white h-7">30 Days</Button>
                                <Button variant="secondary" size="sm" className="bg-zinc-800 text-white shadow-none h-7">90 Days</Button>
                                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white h-7">All Time</Button>
                            </div>
                        </div>

                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="bg-white border-0 shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-zinc-500">Avg. Clarity Score</CardTitle>
                                    <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-green-100 text-green-700">+4.2%</span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-zinc-900">82.4%</div>
                                    <p className="text-xs text-zinc-400 mt-1">Target: 85%</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white border-0 shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-zinc-500">Avg. Confidence</CardTitle>
                                    <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-green-100 text-green-700">+1.8%</span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-zinc-900">78.1%</div>
                                    <p className="text-xs text-zinc-400 mt-1">Target: 75%</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white border-0 shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-zinc-500">Avg. Delivery</CardTitle>
                                    <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-700">-0.4%</span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-zinc-900">71.2%</div>
                                    <p className="text-xs text-zinc-400 mt-1">Target: 80%</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Chart */}
                        <Card className="bg-white border-0 shadow-sm">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg font-bold text-zinc-900">Performance Trends</CardTitle>
                                        <p className="text-sm text-zinc-500">Correlation of key metrics over the last 30 days</p>
                                    </div>
                                    <div className="flex gap-4 text-xs font-medium">
                                        <div className="flex items-center gap-2 text-zinc-600"><span className="w-2 h-2 rounded-full bg-teal-700"></span> Clarity</div>
                                        <div className="flex items-center gap-2 text-zinc-600"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Confidence</div>
                                        <div className="flex items-center gap-2 text-zinc-600"><span className="w-2 h-2 rounded-full bg-orange-400"></span> Delivery</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={data}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#A1A1AA', fontSize: 10 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A1A1AA', fontSize: 10 }} />
                                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                            <Line type="monotone" dataKey="clarity" stroke="#0f766e" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                                            <Line type="monotone" dataKey="confidence" stroke="#a855f7" strokeWidth={2} dot={false} />
                                            <Line type="monotone" dataKey="delivery" stroke="#fbbf24" strokeWidth={2} dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Practice Consistency */}
                            <Card className="bg-white border-0 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-zinc-900">Practice Consistency</CardTitle>
                                    <p className="text-sm text-zinc-500">Usage by day and time</p>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-64 flex items-center justify-center text-zinc-400 text-sm bg-zinc-50 rounded-lg border border-dashed border-zinc-200">
                                        Heatmap Placeholder (Recharts Scatter)
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Top Improvement Areas */}
                            <Card className="bg-white border-0 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-zinc-900">Top Improvement Areas</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">

                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                                            <TrendingDown className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-bold text-zinc-900 text-sm">Filler Word Usage</h4>
                                                <span className="text-xs font-bold text-green-600">-24% Improvement</span>
                                            </div>
                                            <p className="text-xs text-zinc-500 mb-2">Significant reduction in "uh", "um" and "like" across all sessions.</p>
                                            <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-green-500 w-[76%]"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                            <Activity className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-bold text-zinc-900 text-sm">Pacing Stability</h4>
                                                <span className="text-xs font-bold text-green-600">+12% Improvement</span>
                                            </div>
                                            <p className="text-xs text-zinc-500 mb-2">You're maintaining a steadier 140 WPM during high-stakes segments.</p>
                                            <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-500 w-[45%]"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                                            <Clock className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-bold text-zinc-900 text-sm">Vocal Variety</h4>
                                                <span className="text-xs font-bold text-yellow-600">+2% Slow Progress</span>
                                            </div>
                                            <p className="text-xs text-zinc-500 mb-2">Still occasional monotone patterns during data-heavy sections.</p>
                                            <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-purple-500 w-[12%]"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <Button variant="ghost" className="w-full text-teal-700 hover:text-teal-800 hover:bg-teal-50">
                                        View Detailed Breakdown
                                    </Button>

                                </CardContent>
                            </Card>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
