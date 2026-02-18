# Use Case Specifications

This diagram delineates the functional scope of the system, identifying primary actors and their permissible interactions with the platform's core domains.

## Actor Definitions

- **Student**: Authenticated end-user with read access to content and write access to assessment submissions.
- **Admin**: Privileged user responsible for content lifecycle management (CRUD on Courses/Lessons) and user administration.
- **AI Engine**: Autonomous system actor triggered by specific events (e.g., "Generate Notes") to perform background processing.

## Diagram Source

> **Note**: This diagram uses `flowchart` syntax for maximum compatibility, modeling Use Cases as rounded nodes and Actors as hexagons/circles.

```mermaid
flowchart LR
    %% Actors
    Student{{Student}}
    Admin{{Admin}}
    AIEngine{{AI Engine}}

    %% Package: Core Domain
    subgraph Core ["Core Domain"]
        direction TB
        UC_Auth([Authentication & Identity])
        UC_Browse([Content Navigation])
        UC_Analytics([Performance Analytics])
        UC_Admin([System Administration])
    end

    %% Package: AI Subsystem
    subgraph AI ["AI Subsystem"]
        direction TB
        UC_Notes([Contextual Note Generation])
        UC_Quiz([Adaptive Assessment Generation])
        UC_Grading([Automated Grading])
        UC_Chat([Semantic Search / Chat])
    end

    %% Actor Relationships
    Student --> UC_Auth
    Student --> UC_Browse
    Student --> UC_Notes
    Student --> UC_Quiz
    Student --> UC_Chat
    Student --> UC_Analytics

    Admin --> UC_Auth
    Admin --> UC_Admin

    AIEngine --> UC_Notes
    AIEngine --> UC_Quiz
    AIEngine --> UC_Grading
    AIEngine --> UC_Chat

    %% Dependencies
    UC_Notes -.->|includes| UC_Browse
    UC_Quiz -.->|includes| UC_Browse
```
