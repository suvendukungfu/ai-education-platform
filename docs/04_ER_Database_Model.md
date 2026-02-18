# Database ER Model

## ER Diagram

This diagram represents the normalized database schema for the AI Education Platform.

**Core Entities:**

- **Users**: Central identity table with role-based access.
- **Courses/Lessons**: Hierarchical content structure.
- **AI Notes**: Generated content linked to lessons.
- **Assessments**: Quizzes (practice) and Exams (evaluation).
- **Analytics**: Performance tracking.

### Diagram

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
