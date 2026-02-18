# Structural Diagrams

## Class Diagram

**Classes:**

- User
- StudentProfile
- Course
- Lesson
- AINotes
- Quiz
- Question
- Exam
- ExamAttempt
- AnalyticsReport

### Diagram

```mermaid
classDiagram
    class User {
        +UUID id
        +String name
        +String email
        +String passwordHash
        +Role role
        +login()
        +register()
    }

    class StudentProfile {
        +UUID userId
        +String learningStyle
        +Map progress
        +updateProgress()
    }

    class Course {
        +UUID id
        +String title
        +String description
        +List~Lesson~ lessons
        +addLesson()
        +getProgress()
    }

    class Lesson {
        +UUID id
        +String topic
        +String content
        +generateNotes()
    }

    class AINotes {
        +UUID id
        +String summary
        +List~String~ keyPoints
    }

    class Quiz {
        +UUID id
        +List~Question~ questions
        +generate()
    }

    class Question {
        +UUID id
        +String text
        +List~String~ options
        +String correctAnswer
    }

    class Exam {
        +UUID id
        +Course course
        +int durationMinutes
        +evaluate()
    }

    class ExamAttempt {
        +UUID id
        +User student
        +Exam exam
        +int score
        +Date attemptedAt
    }

    User "1" -- "1" StudentProfile
    Course "1" *-- "*" Lesson
    Lesson "1" --> "0..1" AINotes
    Lesson "1" -- "*" Quiz
    Quiz "1" *-- "*" Question
    Course "1" -- "*" Exam
    User "1" -- "*" ExamAttempt
    Exam "1" -- "*" ExamAttempt
```

---

## Package Diagram

**Packages:**

- `com.edutech.auth`
- `com.edutech.course`
- `com.edutech.ai`
- `com.edutech.assessment`
- `com.edutech.analytics`
- `com.edutech.common`

### Diagram

```mermaid
packageDiagram
    package "com.edutech.common" {
        [Utils]
        [BaseEntity]
    }

    package "com.edutech.auth" {
        [AuthService]
        [UserController]
    }

    package "com.edutech.course" {
        [CourseService]
        [LessonManager]
    }

    package "com.edutech.ai" {
        [LLMClient]
        [PromptEngine]
    }

    package "com.edutech.assessment" {
        [QuizGenerator]
        [ExamEvaluator]
    }

    package "com.edutech.analytics" {
        [ProgressTracker]
        [ReportGenerator]
    }

    "com.edutech.auth" ..> "com.edutech.common"
    "com.edutech.course" ..> "com.edutech.common"
    "com.edutech.ai" ..> "com.edutech.common"

    "com.edutech.assessment" ..> "com.edutech.course"
    "com.edutech.assessment" ..> "com.edutech.ai"
    "com.edutech.analytics" ..> "com.edutech.assessment"
    "com.edutech.analytics" ..> "com.edutech.course"
```
