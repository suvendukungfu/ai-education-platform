# The Filing System (ER Diagram)

This is how we organize the platform's long-term memory. It's not just a pile of data; it's a connected web of information.

### The Connections

- **Users & History**: We trace every `User` to their `ExamAttempts`. We verify not just _that_ they passed, but _when_ and with what score.
- **Content Tree**:
  - A **Course** is the root.
  - It branches into **Lessons**.
  - Lessons bloom into **Quizzes** and **AI Notes**.
- **Analytics**: This is the meta-layer. The `Analytics` table watches the user's interaction with everything else, building a profile of their progress.

### The Data Map

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
