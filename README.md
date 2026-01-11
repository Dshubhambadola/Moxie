# Moxie

**The "Peloton for Communication"**

Moxie is an AI-driven practice platform designed to close the gap between professional knowledge and communication impact. It provides real-time, objective feedback on speech metrics (tone, pace, filler words) and behavioral nuances.

## Tech Stack (The "Polyglot" Architecture)

Designed for performance and "Solo Dev" velocity.

### Frontend
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS + Shadcn/UI
- **Language**: TypeScript

### Backend
- **Core API**: Go (Golang)
- **Role**: Orchestrator for Real-time sessions, Auth, and AI pipelines.

### Infrastructure & AI
- **Auth & DB**: Supabase (PostgreSQL)
- **Real-Time Audio**: WebSocket Streaming (Go + Native MediaRecorder)
- **Speech-to-Text**: Deepgram Nova-2 (Implemented)
- **Reasoning**: Gemini 2.0 Flash / Flash Latest (Implemented)
- **Caching**: Redis (Upstash/Local)

## Features (Implemented)
- **Live Practice Endpoint**: `/practice/live` - Real-time transcription using Deepgram.
- **Session Analysis Endpoint**: `/session` - AI feedback on speech patterns using Gemini.

## Development

This project uses a "Hybrid Monorepo" structure:
- `/frontend`: Next.js application
- `/backend`: Go API server
- `/ops`: Docker and infrastructure configuration

### Quick Start (Local)
*(Instructions coming soon)*
