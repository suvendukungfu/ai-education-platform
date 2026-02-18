# Structural Design: The Code Backbone

Great software isn't just written; it's engineered. For the AI Education Platform, we've adhered to strict **Object-Oriented Programming (OOP)** principles to ensure our code is cleaner, scalable, and easier to maintain.

### The Blueprint

![Excalidraw Class Diagram](../docs/structural/class_diagram_excalidraw.png)

```mermaid
classDiagram
    %% Abstract & Interface Definitions
    class AIService {
        <<interface>>
        +generate(input: String): JSON
    }

    class BaseEntity {
        <<abstract>>
        +UUID id
        +Date createdAt
        +Date updatedAt
    }

    %% User Hierarchy (Inheritance)
    class User {
        -String name
        -String email
        -String passwordHash
        +login()
        +logout()
    }

    class Student {
        -StudentProfile profile
        +enrollCourse(courseId)
        +viewProgress()
    }

    class Admin {
        -String department
        +createCourse()
        +manageUsers()
    }

    User --|> BaseEntity
    Student --|> User
    Admin --|> User

    %% Core Domain Models
    class Course {
        -String title
        -String description
        +addLesson(Lesson)
        +getModules()
    }

    class Lesson {
        -String topic
        -String content
        +generateAIContent()
    }

    class AINotes {
        -String summary
        -List~String~ keyPoints
    }

    class Quiz {
        -List~Question~ questions
        +evaluate(answers)
    }

    class Exam {
        -int duration
        +start()
        +submit()
    }

    %% AI Implementation (Polymorphism)
    class NotesGenerator {
        +generate(content): Notes
    }

    class QuizGenerator {
        +generate(topic): Quiz
    }

    class ExamGenerator {
        +generate(course): Exam
    }

    NotesGenerator ..|> AIService
    QuizGenerator ..|> AIService
    ExamGenerator ..|> AIService

    %% Relationships
    Course "1" *-- "*" Lesson : Contains
    Lesson "1" --> "1" AINotes : Generates
    Lesson "1" *-- "*" Quiz : Has
    Course "1" *-- "*" Exam : Includes
    Student "1" --> "*" Exam : Attempts
```

---

## 1. Class Hierarchy (The "Why")

This isn't just a list of classes. It's a carefully structured family tree of objects.

- **Inheritance (The "Is-A" Relationship)**: We don't repeat code for `Student` and `Admin`. Both inherit from a robust `User` class, sharing core identity logic while keeping their unique powers separate.
- **Polymorphism (The "Acts-Like" Relationship)**: Our AI is versatile. Whether generating **Notes**, **Quizzes**, or **Exams**, the system treats them all as an `AIService`. This means we can add a "Flashcard Generator" tomorrow without breaking the existing code.
- **Encapsulation**: Data is sacred. We lock down sensitive fields (like `passwordHash`) and only expose safe methods to interact with them.

---

## 2. Code Organization (Package Diagram)

A messy codebase is a dying codebase. We organize our logic into distinct packages, essentially "neighborhoods" of code that handle specific jobs.

- **`com.edutech.auth`**: The security gatekeepers.
- **`com.edutech.ai`**: The intelligent core.
- **`com.edutech.assessment`**: The testing center.

By clearly defining dependencies (the dotted lines), we prevent "spaghetti code" where everything depends on everything else.

### The Package Neighborhoods

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
