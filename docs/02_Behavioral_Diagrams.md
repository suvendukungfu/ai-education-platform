# Behavioral Specifications

This document defines the runtime behavior of the system, detailing the interactions between objects and the state transitions of key entities. It serves as a guide for implementing business logic and concurrency controls.

## 1. Request Lifecycle: Content Generation

A critical flow in the system is the **Asynchronous Content Generation** pipeline. This process involves coordination between the frontend client, the API, the database, and the AI worker execution environment.

### Sequence Diagram

![Excalidraw Sequence Diagram](../docs/behavioral/sequence_diagram_excalidraw.png)

**Key Technical Considerations:**

- **Idempotency**: Requests to generate content should be idempotent to prevent duplicate processing costs.
- **Optimistic UI**: The frontend should respond immediately to the user while polling or waiting for a WebSocket event for the completion of the generation task.
- **Error Handling**: The system must gracefully handle LLM API timeouts or rate limits (HTTP 429).

```mermaid
sequenceDiagram
    autonumber
    actor Client as Client (SPA)
    participant API as API Gateway
    participant Svc as Course Service
    participant Queue as Job Queue
    participant Worker as AI Worker
    participant DB as Database

    %% Initiation
    Client->>API: POST /api/v1/lessons/{id}/summarize
    API->>Svc: Validate Request & Auth
    Svc->>DB: Check for Cached Summary

    alt Summary Exists
        DB-->>Svc: Return Cached Data
        Svc-->>Client: 200 OK (Cached)
    else Summary Missing
        Svc->>Queue: Publish Generation Job
        Svc-->>Client: 202 Accepted (Job ID)

        %% Async Processing
        Queue->>Worker: Consume Job
        activate Worker
        Worker->>DB: Fetch Lesson Content
        Worker->>Worker: Generate Summary (LLM)
        Worker->>DB: Persist Summary & Update Cache
        deactivate Worker

        %% Notification
        Worker-->>Client: WebSocket Event (Job Complete)
    end
```

---

## 2. Activity Workflow: The Study Loop

The student's study session is modeled as a cyclic process of **Consumption**, **Assessment**, and **Review**. This workflow drives the analytics engine.

### Activity Diagram

```mermaid
flowchart TD
    Start((Session Start)) --> Auth[Authenticate]
    Auth --> Dashboard[Load Dashboard]
    Dashboard --> SelectContent[Select Module]

    SelectContent --> ActionCheck{User Action}

    ActionCheck -->|Consume| Read[Read/Watch Content]
    Read --> GenerateNotes[Request AI Summary]
    GenerateNotes --> Read

    ActionCheck -->|Assess| ConfigQuiz[Configure Assessment]
    ConfigQuiz --> RequestGen[Request AI Generation]
    RequestGen --> TakeQuiz[Assessment execution]
    TakeQuiz --> Submit[Submit Answers]

    Submit -->|Async| Grade[Auto-Grading]
    Grade --> UpdateProfile[Update Knowledge Profile]
    UpdateProfile --> ShowResults[Display Analytics]

    ShowResults --> Remediation{Performance < Threshold?}
    Remediation -->|Yes| Recommend[AI Recommendations]
    Remediation -->|No| NextModule[Unlock Next Module]

    Recommend --> Read
    NextModule --> SelectContent
```

---

## 3. Entity State Management (State Machines)

To manage complex entity lifecycles, we employ explicit state machines. This is particularly crucial for the **Exam/Assessment** entity to prevent cheating and ensure data consistency.

### Exam Session State Machine

**States:**

- **Initialized**: Exam created, configuration loaded, but not started.
- **InProgress**: Timer running, interactions logged. Locked to specific client session.
- **Submitted**: User finished, awaiting grading.
- **Graded**: Scoring complete, results available.
- **Terminated**: Forcefully closed due to timeout or violation.

```mermaid
stateDiagram-v2
    [*] --> Initialized

    Initialized --> InProgress : User Starts

    state InProgress {
        [*] --> Answering
        Answering --> Saving : Auto-save
        Saving --> Answering
    }

    InProgress --> Submitted : User Submits
    InProgress --> Terminated : Timer Expiry
    InProgress --> Terminated : Violation Detected

    Submitted --> Graded : Async Grading Complete
    Terminated --> Graded : Partial Grading

    Graded --> [*]
```
