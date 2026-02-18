# 🧬 The System DNA (Class Diagram)

If you looked at our code under a microscope, this is the genetic structure you would see. It defines _what_ things are and _how_ they relate to each other.

### The Genetic Code 🔬

- **Inheritance (The Lineage)**: Just as children inherit traits from parents, our `Student` and `Admin` classes inherit core identities from the `User` class.
- **Polymorphism (The Shapeshifters)**: Our `AIService` is a chameleon. It can morph into a `NotesGenerator`, a `QuizGenerator`, or an `ExamGenerator` depending on what the user needs.
- **Composition (The Building Blocks)**: A `Course` isn't just a title; it is _composed_ of many `Lessons`. Without lessons, a course is just an empty shell.

### The Blueprint

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
