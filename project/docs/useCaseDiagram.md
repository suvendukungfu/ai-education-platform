# Use Case Diagram

```mermaid
useCaseDiagram
    actor "Student" as student
    actor "Faculty" as faculty
    actor "Admin" as admin
    actor "AI Engine" as ai

    package "Learning Core" {
        usecase "View Courses" as UC1
        usecase "Enroll in Course" as UC2
        usecase "Chat with AI Tutor" as UC3
        usecase "Take Quiz" as UC4
    }

    package "Course Management" {
        usecase "Forge Course via AI" as UC5
        usecase "Ingest Documents" as UC6
        usecase "View Student Progress" as UC7
    }

    package "System Admin" {
        usecase "Manage Users" as UC8
        usecase "View System Analytics" as UC9
    }

    student --> UC1
    student --> UC2
    student --> UC3
    student --> UC4

    faculty --> UC5
    faculty --> UC6
    faculty --> UC7

    admin --> UC8
    admin --> UC9

    UC3 ..> ai : <<include>>
    UC5 ..> ai : <<include>>
    UC6 ..> ai : <<include>>
```
