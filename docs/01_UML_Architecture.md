# AI Education Platform UML Architecture

## Use Case Diagram

**Actors:**

- Student
- Admin
- AI Engine

### Diagram

```mermaid
usecaseDiagram
    actor Student
    actor Admin
    actor AI_Engine as "AI Engine"

    package "AI Education Platform" {
        usecase "Register/Login" as UC1
        usecase "View Courses" as UC2
        usecase "Upload Documents" as UC3
        usecase "Request AI Notes" as UC4
        usecase "Chat with Tutor" as UC5
        usecase "Take Quiz" as UC6
        usecase "Take Exam" as UC7
        usecase "View Analytics" as UC8
        usecase "Manage Courses" as UC9
        usecase "View System Reports" as UC10
        usecase "Configure AI Settings" as UC11
        usecase "Process Documents" as UC12
        usecase "Generate Notes" as UC13
        usecase "Conduct Chat Session" as UC14
        usecase "Generate Quizzes/Exams" as UC15
    }

    Student --> UC1
    Student --> UC2
    Student --> UC3
    Student --> UC4
    Student --> UC5
    Student --> UC6
    Student --> UC7
    Student --> UC8

    Admin --> UC1
    Admin --> UC9
    Admin --> UC10
    Admin --> UC11

    AI_Engine --> UC12
    AI_Engine --> UC13
    AI_Engine --> UC14
    AI_Engine --> UC15

    UC4 ..> UC13 : <<include>>
    UC4 ..> UC12 : <<include>>
    UC5 ..> UC14 : <<include>>
    UC6 ..> UC15 : <<include>>
    UC7 ..> UC15 : <<include>>
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
