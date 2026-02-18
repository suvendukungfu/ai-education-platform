# Use Case Specifications

This diagram delineates the functional scope of the system, identifying primary actors and their permissible interactions with the platform's core domains.

## Actor Definitions

- **Student**: Authenticated end-user with read access to content and write access to assessment submissions.
- **Admin**: Privileged user responsible for content lifecycle management (CRUD on Courses/Lessons) and user administration.
- **AI Engine**: Autonomous system actor triggered by specific events (e.g., "Generate Notes") to perform background processing.

## Diagram Source

```mermaid
usecaseDiagram
    actor Student
    actor Admin
    actor AI_Engine as "AI Engine"

    package "Core Domain" {
        usecase "Authentication & Identity" as UC_Auth
        usecase "Content Navigation" as UC_Browse
        usecase "Performance Analytics" as UC_Analytics
        usecase "System Administration" as UC_Admin
    }

    package "AI Subsystem" {
        usecase "Contextual Note Generation" as UC_Notes
        usecase "Adaptive Assessment Generation" as UC_Quiz
        usecase "Automated Grading" as UC_Grading
        usecase "Semantic Search / Chat" as UC_Chat
    }

    %% Actor to Usecase mappings
    Student --> UC_Auth
    Student --> UC_Browse
    Student --> UC_Notes
    Student --> UC_Quiz
    Student --> UC_Chat
    Student --> UC_Analytics

    Admin --> UC_Auth
    Admin --> UC_Admin

    AI_Engine --> UC_Notes
    AI_Engine --> UC_Quiz
    AI_Engine --> UC_Grading
    AI_Engine --> UC_Chat

    %% Dependencies
    UC_Notes ..> UC_Browse : <<extends>>
    UC_Quiz ..> UC_Browse : <<extends>>
```
