# Domain Class Model

This diagram represents the static structure of the domain entities and their relationships. It highlights the use of inheritance for user roles and interfaces for polymorphic AI service implementations.

## Design Patterns

- **Inheritance**: `Student` and `Admin` extend `User` to inherit identity properties (`email`, `passwordHash`).
- **Composition**: `Course` is composed of `Modules` and `Lessons`, enforcing a strict parent-child lifecycle.
- **Strategy Interface**: `AIService` defines the contract for various generative strategies (`NotesGenerator`, `QuizGenerator`).

## Diagram Source

```mermaid
classDiagram
    %% Interface Segregation
    class AIService {
        <<interface>>
        +generate(context: Context): Result
        +validateOutput(output: JSON): boolean
    }

    class BaseEntity {
        <<abstract>>
        +UUID id
        +Timestamp createdAt
        +Timestamp updatedAt
        #prePersist()
        #preUpdate()
    }

    %% User Domain
    class User {
        -String email
        -String passwordHash
        -Role role
        +validateCredentials()
        +updateProfile()
    }

    class Student {
        -Profile learningProfile
        +enroll(Course c)
        +getAnalytics()
    }

    class Admin {
        -Permissions[] permissions
        +grantAccess()
        +auditLogs()
    }

    User --|> BaseEntity
    Student --|> User
    Admin --|> User

    %% Content Domain
    class Course {
        +UUID id
        +List~Module~ modules
        +publish()
        +archive()
    }

    class AssessmentStrategy {
        <<interface>>
        +evaluate(submission: Submission): Score
    }

    %% Implementations
    class NotesGenerator {
        +generate(context): Notes
    }

    class QuizGenerator {
        +generate(context): Quiz
    }

    NotesGenerator ..|> AIService
    QuizGenerator ..|> AIService

    %% Relationships
    Course *-- Module : Composition
    Student --> Course : Association (Enrollment)
```
