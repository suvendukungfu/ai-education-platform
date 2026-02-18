# 🎭 The Cast & Their Roles (Use Case Diagram)

Every great platform has a cast of characters. Here is how the key players interact with our AI Education system.

### The Actors 🎬

1.  **The Student**: The hero of our story. They aren't just consuming; they are requesting custom notes, challenging themselves with quizzes, and tracking their own growth.
2.  **The Admin**: The director. Only they can set the stage (Courses & Lessons) and ensure the audience (Users) plays by the rules.
3.  **The AI Engine**: The special effects wizard. It works behind the scenes to generate content on demand, making the magic happen.

### The Script (Diagram)

```mermaid
usecaseDiagram
    actor Student
    actor Admin
    actor AI_Engine as "AI Engine"

    package "AI Education Platform" {
        usecase "Register/Login" as UC_Auth
        usecase "Select Course/Topic" as UC_Browse
        usecase "Generate AI Notes" as UC_Notes
        usecase "Create Quiz" as UC_Quiz
        usecase "Attempt Exam" as UC_Exam
        usecase "Chat with AI Tutor" as UC_Chat
        usecase "View Analytics" as UC_Analytics

        usecase "Manage Courses" as UC_ManageCourses
        usecase "Manage Lessons" as UC_ManageLessons
        usecase "Monitor Users" as UC_Monitor

        usecase "Generate Content" as UC_GenContent
        usecase "Answer Queries" as UC_Answer
    }

    %% Student Relationships
    Student --> UC_Auth
    Student --> UC_Browse
    Student --> UC_Notes
    Student --> UC_Quiz
    Student --> UC_Exam
    Student --> UC_Chat
    Student --> UC_Analytics

    %% Admin Relationships
    Admin --> UC_Auth
    Admin --> UC_ManageCourses
    Admin --> UC_ManageLessons
    Admin --> UC_Monitor

    %% AI Engine Relationships
    AI_Engine --> UC_GenContent
    AI_Engine --> UC_Answer

    %% Dependencies (Includes)
    UC_Notes ..> UC_GenContent : <<include>>
    UC_Quiz ..> UC_GenContent : <<include>>
    UC_Exam ..> UC_GenContent : <<include>>
    UC_Chat ..> UC_Answer : <<include>>
```
