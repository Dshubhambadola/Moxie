'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Mic, BarChart2, Zap, ArrowRight, CheckCircle2, PlayCircle, Globe, Layout, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030711] text-white font-sans selection:bg-teal-500/30">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#030711]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-teal-600 flex items-center justify-center">
              <Mic className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">Moxie AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#analytics" className="hover:text-white transition-colors">Analytics</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-white/5">
                Log In
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 opacity-50"></div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-300 text-xs font-bold mb-8 uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Now Powered by GPT-4o
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Master Your Voice <br />
            <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">with Moxie AI</span>
          </h1>

          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The world's first cinematic AI communication coach. Perfect your pitch, eliminate filler words, and speak with unwavering confidence in real-time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <Button className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-500 text-white rounded-lg w-full sm:w-auto">
                Start Coaching for Free
              </Button>
            </Link>
            <Button variant="outline" className="h-12 px-8 text-base border-zinc-700 hover:bg-zinc-800 text-zinc-300 rounded-lg bg-zinc-900/50 w-full sm:w-auto">
              <PlayCircle className="mr-2 h-5 w-5" /> View Demo
            </Button>
          </div>

          {/* Hero Visual Mockup */}
          <div className="mt-20 relative mx-auto max-w-5xl">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030711] z-10 h-full w-full pointer-events-none"></div>
            {/* Abstract Waveform Visual */}
            <div className="flex items-center justify-center gap-1 h-32 opacity-80">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 rounded-full bg-gradient-to-t from-teal-500 to-blue-500"
                  style={{
                    height: `${Math.max(20, Math.sin(i * 0.5) * 100 + Math.random() * 50)}px`,
                    opacity: Math.max(0.3, Math.sin(i * 0.2)),
                    animation: `pulse 2s infinite ${i * 0.1}s`
                  }}
                ></div>
              ))}
            </div>
            <p className="text-center text-xs text-zinc-600 mt-8 tracking-[0.2em] font-bold uppercase">Trusted by communicators at</p>
            <div className="flex justify-center gap-8 mt-4 opacity-30 grayscale mix-blend-screen">
              {/* Logo Placeholders */}
              <div className="h-8 w-24 bg-zinc-700/50 rounded"></div>
              <div className="h-8 w-24 bg-zinc-700/50 rounded"></div>
              <div className="h-8 w-24 bg-zinc-700/50 rounded"></div>
              <div className="h-8 w-24 bg-zinc-700/50 rounded"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 1 */}
      <section className="py-24 bg-[#050a15]" id="features">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="h-10 w-10 bg-teal-900/30 rounded-lg flex items-center justify-center mb-6">
              <Zap className="h-6 w-6 text-teal-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Real-time Feedback, <br />
              <span className="text-teal-500">Zero Latency.</span>
            </h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              Moxie analyzes your speech patterns as you talk. Get subtle visual cues when you're speaking too fast, using "umm" too often, or losing emotional resonance.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-zinc-300">
                <CheckCircle2 className="h-5 w-5 text-teal-500" />
                Pace monitoring & cadence correction
              </li>
              <li className="flex items-center gap-3 text-zinc-300">
                <CheckCircle2 className="h-5 w-5 text-teal-500" />
                Filler word detection and elimination
              </li>
              <li className="flex items-center gap-3 text-zinc-300">
                <CheckCircle2 className="h-5 w-5 text-teal-500" />
                Live sentiment and tone analysis
              </li>
            </ul>
          </div>

          {/* Mockup UI */}
          <div className="relative rounded-2xl border border-zinc-800 bg-[#0b101b] p-6 shadow-2xl">
            <div className="absolute -top-4 -right-4 bg-zinc-700 text-xs px-2 py-1 rounded text-white font-mono opacity-50">LIVE SESSION: 002</div>
            <div className="flex gap-2 mb-4">
              <span className="h-3 w-3 rounded-full bg-red-500"></span>
              <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
              <span className="h-3 w-3 rounded-full bg-green-500"></span>
            </div>
            <div className="space-y-4 font-mono text-sm">
              <div className="bg-zinc-900/50 p-4 rounded-lg border-l-2 border-red-500 text-zinc-400">
                "Actually, I think that... <span className="text-red-400 underline decoration-red-900 decoration-wavy">umm</span>, the project is going well."
                <div className="mt-2 text-[10px] text-red-500 font-bold uppercase flex items-center gap-1"><Shield className="h-3 w-3" /> Filler Word Detected</div>
              </div>
              <div className="bg-zinc-900/50 p-4 rounded-lg border-l-2 border-teal-500 text-zinc-300">
                "We are excited to present our roadmap for the next quarter."
                <div className="mt-2 text-[10px] text-teal-500 font-bold uppercase flex items-center gap-1"><Zap className="h-3 w-3" /> Perfect Cadence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2 */}
      <section className="py-24 bg-[#030711]" id="analytics">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Mockup Chart */}
          <div className="relative rounded-2xl border border-zinc-800 bg-[#0b101b] p-8 shadow-2xl order-2 md:order-1">
            <div className="h-10 w-10 bg-pink-500/10 rounded-lg flex items-center justify-center mb-6">
              <BarChart2 className="h-6 w-6 text-pink-500" />
            </div>
            <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-6">Performance Trend</h3>
            <div className="flex items-end gap-3 h-48">
              <div className="w-1/6 bg-blue-900/30 rounded-t h-[40%]"></div>
              <div className="w-1/6 bg-blue-800/40 rounded-t h-[55%]"></div>
              <div className="w-1/6 bg-blue-700/60 rounded-t h-[45%]"></div>
              <div className="w-1/6 bg-blue-600 rounded-t h-[70%]"></div>
              <div className="w-1/6 bg-blue-500 rounded-t h-[85%]"></div>
              <div className="w-1/6 bg-teal-400 rounded-t h-[95%]"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-zinc-900 p-4 rounded-lg">
                <div className="text-zinc-500 text-xs mb-1">Confidence Score</div>
                <div className="text-teal-400 text-2xl font-bold">92%</div>
              </div>
              <div className="bg-zinc-900 p-4 rounded-lg">
                <div className="text-zinc-500 text-xs mb-1">Clarity Rating</div>
                <div className="text-pink-400 text-2xl font-bold">8.4</div>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="h-10 w-10 bg-pink-900/30 rounded-lg flex items-center justify-center mb-6">
              <BarChart2 className="h-6 w-6 text-pink-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Data-Driven <br />
              <span className="text-pink-500">Growth Analytics.</span>
            </h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              Track your evolution as a speaker over weeks and months. Our analytics engine breaks down your vocabulary diversity, confidence markers, and audience engagement scores.
            </p>
            <div className="flex gap-12">
              <div>
                <div className="text-3xl font-bold text-white mb-1">2.4k</div>
                <div className="text-sm text-zinc-500">Minutes Coached</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">15+</div>
                <div className="text-sm text-zinc-500">Key Metrics</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-32 bg-blue-600 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to transform your <br /> communication?
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Join 50,000+ professionals using Moxie AI to lead better meetings, close more deals, and speak with authority.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <Button className="h-14 px-8 text-lg bg-white text-blue-900 hover:bg-zinc-100 font-bold rounded-lg w-full sm:w-auto">
                Get Started Now
              </Button>
            </Link>
            <Button variant="outline" className="h-14 px-8 text-lg bg-blue-700/50 border-blue-400 text-white hover:bg-blue-700 font-bold rounded-lg w-full sm:w-auto">
              Schedule a Demo
            </Button>
          </div>
          <p className="mt-6 text-sm text-blue-200/60">No credit card required. Free 14-day trial.</p>
        </div>
      </section>

      {/* Footer Links */}
      <footer className="py-12 bg-[#02050c] border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6 rounded bg-teal-600 flex items-center justify-center">
                <Mic className="h-3 w-3 text-white" />
              </div>
              <span className="font-bold text-white">Moxie AI</span>
            </div>
            <p className="text-zinc-500 text-sm">
              The AI-powered communication coach built for the future of professional interactions.
            </p>
            <div className="flex gap-4 mt-6">
              <Globe className="h-5 w-5 text-zinc-600 hover:text-white cursor-pointer" />
              <Layout className="h-5 w-5 text-zinc-600 hover:text-white cursor-pointer" />
              <Shield className="h-5 w-5 text-zinc-600 hover:text-white cursor-pointer" />
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li className="hover:text-white cursor-pointer">Features</li>
              <li className="hover:text-white cursor-pointer">Analytics</li>
              <li className="hover:text-white cursor-pointer">Enterprise</li>
              <li className="hover:text-white cursor-pointer">Changelog</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Press Kit</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li className="hover:text-white cursor-pointer">Privacy</li>
              <li className="hover:text-white cursor-pointer">Terms</li>
              <li className="hover:text-white cursor-pointer">Cookie Policy</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between pt-8 border-t border-zinc-900">
          <p className="text-zinc-600 text-xs">© 2026 Moxie AI Inc. All rights reserved.</p>
          <div className="flex items-center gap-2 text-zinc-600 text-xs">
            <div className="h-2 w-2 rounded-full bg-green-500"></div> System Status: Operational
          </div>
        </div>
      </footer>
    </div>
  );
}
