# Database Design: The Foundation

Data is the lifeblood of our platform. We've designed a normalized, relational schema that ensures integrity without sacrificing performance. Every table serves a clear purpose, and every relationship is strictly defined.

### Entity Relationship Diagram (ERD)

![Excalidraw ER Diagram](../docs/er-diagram/er_diagram_excalidraw.png)

```mermaid
erDiagram
    %% User Management
    USERS {
        UUID id PK
        string name
        string email
        string password_hash
        enum role "STUDENT, ADMIN, INSTRUCTOR"
        timestamp created_at
    }

    %% Course Management
    COURSES {
        UUID id PK
        string title
        text description
        timestamp created_at
    }

    LESSONS {
        UUID id PK
        UUID course_id FK
        string topic
        text content
        int order_index
    }

    AI_NOTES {
        UUID id PK
        UUID lesson_id FK
        text generated_content
        timestamp created_at
    }

    %% Assessments
    QUIZZES {
        UUID id PK
        UUID lesson_id FK
        string title
    }

    QUESTIONS {
        UUID id PK
        UUID quiz_id FK
        text question_text
        text answer
        json options "Optional multiple choice"
    }

    EXAMS {
        UUID id PK
        UUID course_id FK
        string title
        int duration_minutes
    }

    EXAM_ATTEMPTS {
        UUID id PK
        UUID exam_id FK
        UUID user_id FK
        int score
        boolean passed
        timestamp attempted_at
    }

    %% Analytics
    ANALYTICS {
        UUID id PK
        UUID user_id FK
        json progress_data
        timestamp last_updated
    }

    %% Relationships
    USERS ||--o{ EXAM_ATTEMPTS : takes
    USERS ||--o{ ANALYTICS : has

    COURSES ||--|{ LESSONS : contains
    COURSES ||--o{ EXAMS : has

    LESSONS ||--o{ QUIZZES : has
    LESSONS ||--o| AI_NOTES : generates

    QUIZZES ||--|{ QUESTIONS : contains

    EXAMS ||--|{ EXAM_ATTEMPTS : results_in
```

---

## The Data Story

1.  **Identity (Users)**: This is where it starts. A `User` is the central entity, capable of being a student, admin, or instructor.
2.  **Content Hierarchy (Courses & Lessons)**: Content isn't just a blob. It's structured. A `Course` holds multiple `Lessons`, creating a clear learning path.
3.  **Generated Value (AI Notes)**: When AI creates content, it's not ephemeral. We store `AI_Notes` linked directly to lessons, so students can revisit them anytime.
4.  **Assessment & Growth**: We don't just store questions (`Questions`); we track every single attempt (`Exam_Attempts`). This allows our `Analytics` engine to see _how_ a student is improving over time, not just where they are today.
