'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mic, Eye, GalleryVerticalEnd } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="min-h-screen w-full flex bg-[#02050c]">

            {/* Left Side - Marketing Image - Force Flex on MD+ */}
            <div className="hidden md:flex w-1/2 bg-[#050a15] items-center justify-center p-12 relative overflow-hidden ring-1 ring-white/5">
                {/* Background Gradients */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-900/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 max-w-lg text-center">
                    {/* Image Placeholder */}
                    <div className="aspect-square relative rounded-3xl overflow-hidden mb-8 border border-white/5 shadow-2xl bg-zinc-900">
                        {/* Abstract Person Visual */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/40 to-blue-900/40 mix-blend-overlay"></div>
                        <div className="absolute inset-0 flex items-end justify-center">
                            <div className="w-full h-1/2 bg-gradient-to-t from-[#050a15] to-transparent z-10"></div>
                        </div>
                        <div className="h-full w-full bg-zinc-800 flex items-center justify-center text-zinc-600 font-mono text-xs">
                            [Stock Image: Speaker on Stage]
                        </div>

                        {/* Floating Waveform Overlay */}
                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-end gap-1 h-16 z-20">
                            {[...Array(12)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-2 rounded-full bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.5)]"
                                    style={{
                                        height: `${Math.random() * 100}%`,
                                        animation: `pulse 1.5s infinite ${i * 0.1}s`
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                        Unlock your potential with <br />
                        <span className="text-teal-400">real-time AI insights</span>
                    </h2>
                    <p className="text-zinc-400 text-lg">
                        Experience the next generation of conversational analysis with Moxie AI. Join thousands of creators and professionals.
                    </p>
                </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 lg:px-24 xl:px-32 bg-[#02050c]">
                <div className="w-full max-w-md mx-auto">
                    <div className="flex items-center gap-2 mb-12">
                        <div className="h-8 w-8 rounded-lg bg-teal-600 flex items-center justify-center">
                            <Mic className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-bold text-lg text-white">Moxie AI</span>
                    </div>

                    <div className="bg-[#050a15] border border-white/5 rounded-2xl p-1 mb-8 flex">
                        <button className="flex-1 py-2.5 text-sm font-medium text-white bg-zinc-800 rounded-xl shadow-sm border border-zinc-700">Sign In</button>
                        <button className="flex-1 py-2.5 text-sm font-medium text-zinc-500 hover:text-zinc-300">Sign Up</button>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
                        <p className="text-zinc-400">Sign in to access your analytics dashboard.</p>
                    </div>

                    <div className="space-y-4 mb-8">
                        <Button variant="outline" className="w-full h-12 bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800 hover:text-white justify-start pl-4 gap-3 relative">
                            {/* Google Icon Mock */}
                            <div className="h-5 w-5 bg-white rounded-full flex items-center justify-center shrink-0">
                                <span className="text-[10px] font-bold text-black">G</span>
                            </div>
                            <span className="w-full text-center absolute left-0">Continue with Google</span>
                        </Button>
                        <Button variant="outline" className="w-full h-12 bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800 hover:text-white justify-start pl-4 gap-3 relative">
                            {/* LinkedIn Icon Mock */}
                            <div className="h-5 w-5 bg-[#0077b5] rounded-sm flex items-center justify-center text-white text-[10px] font-bold shrink-0">in</div>
                            <span className="w-full text-center absolute left-0">Continue with LinkedIn</span>
                        </Button>
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-zinc-800"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#02050c] px-2 text-zinc-500">Or continue with email</span>
                        </div>
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Email address</label>
                            <Input
                                placeholder="name@company.com"
                                className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 h-12 focus-visible:ring-teal-500/50 [input:-webkit-autofill]:shadow-[0_0_0_100px_#18181b_inset] [input:-webkit-autofill]:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-zinc-300">Password</label>
                                <a href="#" className="text-sm font-medium text-teal-500 hover:text-teal-400">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 h-12 pr-10 focus-visible:ring-teal-500/50 [input:-webkit-autofill]:shadow-[0_0_0_100px_#18181b_inset] [input:-webkit-autofill]:text-white"
                                />
                                <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 cursor-pointer hover:text-zinc-300" />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="keep-signed-in" className="border-zinc-600 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600" />
                            <label
                                htmlFor="keep-signed-in"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-400"
                            >
                                Keep me signed in
                            </label>
                        </div>

                        <Link href="/dashboard" className="block">
                            <Button className="w-full h-12 bg-teal-400 hover:bg-teal-500 text-teal-950 font-bold text-base shadow-[0_0_20px_rgba(45,212,191,0.3)]">
                                Sign In
                            </Button>
                        </Link>
                    </form>

                    <p className="mt-8 text-center text-sm text-zinc-500">
                        Don't have an account? <a href="#" className="text-teal-500 font-bold hover:underline">Start your free trial</a>
                    </p>

                </div>
            </div>
        </div>
    );
}
