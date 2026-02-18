# Behavioral Diagrams

## Sequence Diagram

**Flow:** Student → Frontend → Backend API → AI Engine → Database → Response

### Diagram

```mermaid
sequenceDiagram
    autonumber
    actor Student
    participant Frontend
    participant API as "Backend API"
    participant AI as "AI Engine"
    participant DB as "Database"

    Student->>Frontend: Request AI Notes Generation
    Frontend->>API: POST /api/generate-notes
    activate API
    API->>AI: Process Document Content
    activate AI
    AI-->>API: Return Generated Notes
    deactivate AI
    API->>DB: Save Notes
    activate DB
    DB-->>API: Confirm Save
    deactivate DB
    API-->>Frontend: Return Success & Notes
    deactivate API
    Frontend-->>Student: Display Generated Notes
```

---

## Activity Diagram

**Steps:**

- Login
- Select Topic
- Generate Notes
- Create Quiz
- Take Exam
- View Result

### Diagram

```mermaid
flowchart TD
    Start((Start)) --> Login[Login]
    Login --> SelectTopic[Select Topic]
    SelectTopic --> Choice{Action?}

    Choice -->|Generate Notes| GenNotes[Generate AI Notes]
    GenNotes --> ViewNotes[View Notes]
    ViewNotes --> End((End))

    Choice -->|Take Quiz| CreateQuiz[Create Quiz]
    CreateQuiz --> TakeQuiz[Take Quiz]
    TakeQuiz --> SubmitQuiz[Submit Quiz]
    SubmitQuiz --> ViewResult[View Result]
    ViewResult --> Analysis{Passed?}

    Analysis -->|Yes| MarkComplete[Mark Topic Complete]
    Analysis -->|No| Review[Review Material]

    MarkComplete --> End
    Review --> SelectTopic
```

---

## State Machine Diagram

**States:**

- Idle
- Learning
- Practicing
- Testing
- Completed

### Diagram

```mermaid
stateDiagram-v2
    [*] --> Idle

    Idle --> Learning : Open Material
    Learning --> Idle : Close Material

    Learning --> Practicing : Start Quiz
    Practicing --> Learning : Quit Quiz
    Practicing --> Testing : Start Exam

    Testing --> Completed : Pass Exam
    Testing --> Learning : Fail Exam

    Completed --> [*]

    note right of Learning
        Student is reading content
        or watching videos
    end note

    note right of Practicing
        Taking low-stakes quizzes
        to reinforcement learning
    end note
```
