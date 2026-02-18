# AI Education Platform UML Architecture

## Use Case Diagram

This diagram outlines the core interactions for the AI Education Platform stakeholders.

**Actors:**

- **Student**: Primary user engaging with content and AI.
- **Admin**: Platform manager for courses and users.
- **AI Engine**: System actor performing intelligent tasks.

### Diagram

```mermaid
usecaseDiagram
    actor Student
    actor Admin
    actor AI_Engine as "AI Engine"

    package "AI Education Platform" {
        usecase "Register/Login" as UC_Auth
        usecase "Select Course/Topic" as UC_Browse
        usecase "Generate AI Notes" as UC_Notes
        usecase "Create Quiz" as UC_Quiz
        usecase "Attempt Exam" as UC_Exam
        usecase "Chat with AI Tutor" as UC_Chat
        usecase "View Analytics" as UC_Analytics

        usecase "Manage Courses" as UC_ManageCourses
        usecase "Manage Lessons" as UC_ManageLessons
        usecase "Monitor Users" as UC_Monitor

        usecase "Generate Content" as UC_GenContent
        usecase "Answer Queries" as UC_Answer
    }

    %% Student Relationships
    Student --> UC_Auth
    Student --> UC_Browse
    Student --> UC_Notes
    Student --> UC_Quiz
    Student --> UC_Exam
    Student --> UC_Chat
    Student --> UC_Analytics

    %% Admin Relationships
    Admin --> UC_Auth
    Admin --> UC_ManageCourses
    Admin --> UC_ManageLessons
    Admin --> UC_Monitor

    %% AI Engine Relationships
    AI_Engine --> UC_GenContent
    AI_Engine --> UC_Answer

    %% Dependencies (Includes)
    UC_Notes ..> UC_GenContent : <<include>>
    UC_Quiz ..> UC_GenContent : <<include>>
    UC_Exam ..> UC_GenContent : <<include>>
    UC_Chat ..> UC_Answer : <<include>>
```

---

## Component Diagram

**Modules:**

- Auth Service
- Course Service
- AI Notes Generator
- Quiz Engine
- Exam Engine
- Chat Assistant
- Analytics

### Diagram

```mermaid
componentDiagram
    package "Core Services" {
        component "Auth Service" as AuthService
        component "Course Service" as CourseService
        component "Analytics Service" as AnalyticsService
    }

    package "AI Services" {
        component "AI Notes Generator" as AINotes
        component "Chat Assistant" as ChatBot
    }

    package "Assessment Services" {
        component "Quiz Engine" as QuizEngine
        component "Exam Engine" as ExamEngine
    }

    database "PostgreSQL" as DB
    database "Vector DB" as VectorDB

    AuthService --> DB : Read/Write User Data
    CourseService --> DB : Read/Write Course Data
    AnalyticsService --> DB : Log/Read Progress

    AINotes --> VectorDB : Store Embeddings
    ChatBot --> VectorDB : Retrieve Context

    QuizEngine --> CourseService : Fetch Content
    ExamEngine --> CourseService : Fetch Content

    AINotes ..> CourseService : Process Content
    ChatBot ..> CourseService : Query Content
```

---

## High-Level System Architecture

### Diagram

```mermaid
graph TD
    User[User (Student/Admin)] -->|HTTPS| CDN[CDN]
    User -->|HTTPS| Frontend[Frontend (React/Next.js)]

    subgraph "Application Layer"
        Frontend -->|API Requests| Gateway[API Gateway]
        Gateway --> Auth[Auth Service]
        Gateway --> Course[Course Service]
        Gateway --> Assess[Assessment Service]
        Gateway --> Analytics[Analytics Service]
    end

    subgraph "AI Integration Layer"
        Course -->|Trigger| AI_Orch[AI Orchestrator]
        Assess -->|Request| AI_Orch
        AI_Orch -->|Prompt| LLM[LLM Service (OpenAI/Gemini)]
        AI_Orch -->|Embed| Vector[Vector DB]
    end

    subgraph "Data Layer"
        Auth --> SQL[(PostgreSQL)]
        Course --> SQL
        Assess --> SQL
        Analytics --> SQL
        Course --> Storage[Object Storage (S3)]
    end
```
