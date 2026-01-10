# Locuta

**The "Peloton for Communication"**

Locuta is an AI-driven practice platform designed to close the gap between professional knowledge and communication impact. It provides real-time, objective feedback on speech metrics (tone, pace, filler words) and behavioral nuances.

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
- **Real-Time Audio**: LiveKit
- **Speech-to-Text**: Deepgram Nova-3
- **Reasoning**: Gemini 1.5 Pro
- **Caching**: Redis (Upstash/Local)

## Development

This project uses a "Hybrid Monorepo" structure:
- `/frontend`: Next.js application
- `/backend`: Go API server
- `/ops`: Docker and infrastructure configuration

### Quick Start (Local)
*(Instructions coming soon)*
