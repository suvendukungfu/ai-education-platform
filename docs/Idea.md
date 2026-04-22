# Axion Intelligence — AI-Powered Adaptive Education Platform

## Problem Statement

Traditional e-learning platforms deliver static, one-size-fits-all content. Students learn at different speeds, yet every learner gets the same video, the same quiz, and the same feedback. This leads to:

- **High dropout rates** — 85%+ in MOOCs (Harvard/MIT study, 2020).
- **Poor knowledge retention** — passive consumption without adaptive reinforcement.
- **Zero personalization** — no adjustment based on individual learning gaps or strengths.

## Proposed Solution

**Axion Intelligence** is a full-stack AI Education Platform that uses Retrieval-Augmented Generation (RAG) and adaptive assessment engines to personalize every aspect of the learning journey.

### Core Capabilities

| Feature | Description |
|---|---|
| **AI Course Forge** | Students describe a topic; the LLM generates a structured course with modules, lessons, and quizzes in real-time. |
| **Contextual Note Generation** | Given a lesson, the AI summarizes key concepts, generates flashcards, and identifies prerequisite gaps. |
| **Adaptive Quizzing** | Difficulty dynamically adjusts based on prior quiz performance using a scoring algorithm. |
| **Neural HUD Dashboard** | Real-time telemetry showing learning velocity, streak data, and skill radar charts. |
| **Real-Time Chat (WebSocket)** | Students can ask the AI contextual questions about their current lesson. |

## Technology Stack

| Layer | Technology | Justification |
|---|---|---|
| Frontend | Next.js 15, React 19, TailwindCSS | SSR/SSG for SEO, App Router for layouts |
| Backend | Node.js, Express 5, TypeScript | Type-safe API layer with OOP architecture |
| ORM | Prisma 6 | Type-safe database access with migration support |
| Database | PostgreSQL (Render) | ACID-compliant relational store for structured data |
| Cache | Redis | Session caching and rate-limiting |
| AI Engine | Python FastAPI, OpenAI GPT-4 | RAG pipeline for content generation |
| Deployment | Vercel (Frontend) + Render (Backend) | Edge-optimized SSR + managed infrastructure |

## Architecture Overview

The system follows a **Clean Architecture** pattern with strict separation of concerns:

```
┌─────────────────────────────────────────────────┐
│                   Frontend (Next.js)             │
│   Pages → Components → Hooks → API Client       │
└──────────────────┬──────────────────────────────┘
                   │ REST + WebSocket
┌──────────────────▼──────────────────────────────┐
│              Backend (Express + TypeScript)       │
│   Controllers → Services → Repositories → DB     │
│                                                   │
│   OOP Patterns:                                   │
│   • Abstract BaseRepository (Template Method)     │
│   • Interface Segregation (ICourseRepository)     │
│   • Dependency Injection (Service ← Repository)   │
│   • Strategy Pattern (AI Service Implementations) │
└──────────────────┬──────────────────────────────┘
                   │ HTTP
┌──────────────────▼──────────────────────────────┐
│           AI Engine (FastAPI + Python)            │
│   RAG Pipeline → LLM Inference → JSON Response   │
└─────────────────────────────────────────────────┘
```

## Target Users

1. **Students** — Self-paced learners who want AI-curated, adaptive courses.
2. **Faculty / Instructors** — Educators who want to auto-generate assessments.
3. **Administrators** — Platform managers monitoring usage analytics and content quality.

## Unique Selling Points

- **Not a chatbot wrapper** — Axion generates *structured curricula*, not just chat responses.
- **OOP-first backend** — Abstract classes, interfaces, dependency injection, and the Repository pattern used throughout.
- **Production-grade** — CI/CD pipeline, Prisma migrations, JWT auth with refresh tokens, WebSocket real-time layer.

## References

1. MIT OpenCourseWare — "Dropout Rates in Online Learning" (2020)
2. Bloom, B.S. — "The 2 Sigma Problem: The Search for Methods as Effective as One-to-One Tutoring" (1984)
3. OpenAI API Documentation — https://platform.openai.com/docs
4. Prisma ORM Documentation — https://www.prisma.io/docs
