# AI Education Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-success.svg)]()

**A scalable, microservices-based Learning Management System illustrating the integration of Large Language Models (LLMs) into educational workflows.**

## Overview

The AI Education Platform is designed to demonstrate a modern approach to EdTech, moving beyond static content delivery to dynamic, AI-assistive learning. It addresses the challenge of personalized education at scale by leveraging Retrieval-Augmented Generation (RAG) to provide context-aware tutoring and assessment generation.

This repository contains the complete source code for the platform, including the React frontend, Node.js backend services, Python AI orchestrators, and infrastructure configuration.

[Architecture](#architecture) • [System Design](#system-design) • [AI Pipeline](#ai-pipeline) • [local Development](#local-development)

---

## Key Technical Features

- **Retrieval-Augmented Generation (RAG)**: Implements a vector-search pipeline using Qdrant/Pinecone to ground LLM responses in verifiable course content, minimizing hallucination.
- **Microservices Architecture**: Decoupled services for Authentication, Content Management, and AI Orchestration, allowing for independent scaling and deployment.
- **Event-Driven Processing**: Utilizes message queues (Kafka/RabbitMQ) for handling high-latency AI tasks (e.g., PDF ingestion, embedding generation) asynchronously.
- **Adaptive Assessment Engine**: Dynamically generates quizzes and exams based on student performance data and content coverage gaps.
- **Role-Based Access Control (RBAC)**: Secure, granular permission systems implemented at the API Gateway and Service levels.

---

## Technology Stack

The stack was selected to optimize for type safety, concurrency, and AI ecosystem integration.

| Layer                | Technology                  | Rationale                                                       |
| :------------------- | :-------------------------- | :-------------------------------------------------------------- |
| **Frontend**         | React, TypeScript, Tailwind | Component modularity and compile-time type safety.              |
| **API Gateway**      | Kong / NGINX                | Centralized authentication, rate limiting, and request routing. |
| **Backend Services** | Node.js (Express/NestJS)    | High-throughput I/O handling for RESTful APIs.                  |
| **AI Orchestration** | Python (FastAPI, LangChain) | Native support for PyTorch/TensorFlow and LLM drivers.          |
| **Data Persistence** | PostgreSQL                  | ACID compliance for transactional user and course data.         |
| **Caching & State**  | Redis                       | Ephemeral storage for session management and API caching.       |
| **Vector Search**    | Qdrant / Pinecone           | High-dimensional vector storage for semantic retrieval.         |
| **Infrastructure**   | Docker, Kubernetes          | Containerization for consistent deployment environments.        |

---

## Architecture

The system follows a standard evolved microservices pattern.

### High-Level Data Flow

Requests are funneled through an API Gateway which handles SSL termination and AuthN/AuthZ. Validated requests are proxied to the appropriate domain service. AI-intensive operations are offloaded asynchronously.

> **Technical Detail**: See [docs/05_System_Design.md](docs/05_System_Design.md) for a deep dive into the scalability strategies, including load balancing and database sharding considerations.

```mermaid
graph TD
    User -->|HTTPS| LB[Load Balancer]
    LB --> Gateway[API Gateway]

    subgraph "Service Mesh"
        Gateway --> Auth[Auth Service]
        Gateway --> Content[Course Service]
        Gateway --> Analytics[Analytics Service]
    end

    subgraph "AI Infrastructure"
        Content -->|Async Event| AI_Queue[Message Queue]
        AI_Queue --> AI_Worker[AI Orchestrator]
        AI_Worker --> VectorDB[(Vector DB)]
        AI_Worker --> LLM[LLM Provider]
    end

    Auth --> DB[(Primary DB)]
    Content --> DB
```

### AI Pipeline (RAG)

The core value proposition lies in the AI pipeline. We utilize a two-stage process: Ingestion (document parsing, chunking, embedding) and Retrieval (semantic search, context injection, generation).

> **Implementation**: Refer to [docs/06_AI_Workflow.md](docs/06_AI_Workflow.md) for the sequence diagrams and prompt engineering strategies.

---

## Project Structure

The current working application lives under `project/`. The top-level `frontend/`, `backend/`, and `ai-engine/` folders are not used by the launcher.

```bash
ai-education-platform/
├── package.json                    # Root helper scripts
├── start-platform.sh               # Main local startup entrypoint
├── project/
│   ├── frontend/                   # Actual Next.js app
│   │   ├── package.json
│   │   ├── .env
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   └── ai-engine/                  # Actual FastAPI app
│       ├── main.py
│       ├── requirements.txt
│       └── venv/
├── frontend/                       # Legacy copy, not used by startup
├── backend/                        # Legacy copy, not used by startup
└── docs/
```

---

## Local Development

### Prerequisites

- Node.js 20+
- Python 3.10+
- `lsof` and `curl` available in your shell

### Quick Start

Run everything from the repository root:

```bash
cd /Users/suvendusahoo/e
bash ./start-platform.sh
```

What the startup script does:

1. Uses `project/frontend` as the frontend root
2. Uses `project/ai-engine` as the backend root
3. Creates the Python virtual environment if missing
4. Installs Python dependencies from `project/ai-engine/requirements.txt`
5. Runs `prisma generate` and `prisma db push` in `project/frontend`
6. Picks free ports automatically if the defaults are already occupied
7. Prints the final frontend and backend URLs after both services are reachable

### Manual Commands

If you want to run pieces manually, use these exact directories:

```bash
# Frontend
cd /Users/suvendusahoo/e/project/frontend
npm install
npm run prisma:generate
npm run prisma:dbpush
npm run dev -- --hostname 127.0.0.1 --port 3000

# AI engine
cd /Users/suvendusahoo/e/project/ai-engine
python3 -m venv venv
./venv/bin/pip install -r requirements.txt
./venv/bin/python -m uvicorn main:app --host 127.0.0.1 --port 8000
```

### Prisma

Prisma is configured in the actual frontend app:

- Schema: `project/frontend/prisma/schema.prisma`
- Database: `/Users/suvendusahoo/e/project/frontend/dev.db`

Useful commands:

```bash
cd /Users/suvendusahoo/e/project/frontend
npm run prisma:validate
npm run prisma:generate
npm run prisma:dbpush
```

---

## Contribution Guidelines

We enforce strict code quality standards. Please ensure:

- All code is covered by unit tests (Jest for JS, PyTest for Python).
- Pre-commit hooks (Husky) pass for linting and formatting.
- Commits follow the purely Semantic Commit Messages convention.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow.

---

**Maintainer Note**: This project is under active development. Breaking changes to the API contract effectively bump the major version.
