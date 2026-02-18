# Sequence Diagram: Content Generation Lifecycle

This diagram illustrates the synchronous and asynchronous message flow required to fulfill a content generation request (e.g., AI Summarization).

## Process Flow

1.  **Authentication**: The request is first intercepted by the API Gateway/Auth Service for JWT validation.
2.  **Job Queuing**: Valid requests are acknowledged immediately (HTTP 202 Accepted), and a task is published to the message broker.
3.  **Worker Execution**: The AI worker consumes the task, performs the LLM inference, and updates the database.
4.  **Completion Notification**: The client is notified via WebSocket or Polling that the resource is available.

## Diagram Source

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
