# Entity Relationship Diagram (ERD)

This diagram details the physical data model for the PostgreSQL database. It emphasizes 3rd Normal Form (3NF) compliance and the use of JSONB for semi-structured data attributes.

## Schema Highlights

- **Users**: Central identity table with role based discrimination.
- **Courses/Lessons**: Hierarchical content structure.
- **AI_Notes**: Stores generated content, strictly linked 1:1 with Lessons.
- **Exam_Attempts**: Immutable ledger of student assessment performance.

## Diagram Source

```mermaid
erDiagram
    %% Identity Management
    USERS {
        UUID id PK "gen_random_uuid()"
        string email UK "Indexed, Lowercase"
        string password_hash "Argon2"
        enum role "STUDENT, ADMIN, INSTRUCTOR"
        timestamp created_at
        timestamp updated_at
    }

    %% Content Management
    COURSES {
        UUID id PK
        string title
        text description
        boolean is_published "Index"
        timestamp created_at
    }

    LESSONS {
        UUID id PK
        UUID course_id FK "Index"
        string title
        text content_url "S3 Object Key"
        int order_index
    }

    %% AI Artifacts
    AI_NOTES {
        UUID id PK
        UUID lesson_id FK "Unique Constraint (1:1)"
        text summary_markdown
        jsonb key_concepts "Structured array"
        timestamp generated_at
    }

    %% Assessment Domain
    EXAMS {
        UUID id PK
        UUID course_id FK
        string title
        int duration_seconds
        int passing_score_percent
        jsonb config "Adaptive settings"
    }

    EXAM_ATTEMPTS {
        UUID id PK
        UUID exam_id FK
        UUID user_id FK
        int score
        timestamptz started_at
        timestamptz completed_at
        jsonb answer_sheet "User responses snapshot"
    }

    %% Relationships
    COURSES ||--|{ LESSONS : owns
    LESSONS ||--o| AI_NOTES : generates
    COURSES ||--o{ EXAMS : contains
    EXAMS ||--|{ EXAM_ATTEMPTS : logs
    USERS ||--|{ EXAM_ATTEMPTS : performs
```
