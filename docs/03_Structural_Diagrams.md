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

**Relationships:**

- **Course** _contains_ **Lesson** (Composition).
- **Lesson** _generates_ **AINotes** (Association).
- **Quiz** _contains_ **Question** (Composition).
- **Exam** _evaluates_ **Student** (Association via ExamAttempt).
- **User** _has_ **StudentProfile** (One-to-One).

**Prompt:**
Create a Class Diagram for the AI Education Platform core entities.

- Define attributes and methods for key classes (e.g., `User.login()`, `Course.addLesson()`, `Quiz.generate()`).
- Show relationships with correct multiplicity (1..\*, 1..1).

**Style:** Enterprise software architecture, Clean structure, Professional spacing.

---

## Package Diagram

**Packages:**

- `com.edutech.auth`
- `com.edutech.course`
- `com.edutech.ai`
- `com.edutech.assessment`
- `com.edutech.analytics`
- `com.edutech.common`

**Prompt:**
Generate a Package Diagram showing the high-level organization of the backend codebase.

- Show dependencies between packages (e.g., `assessment` depends on `course` and `ai`).
- Group related classes into packages.

**Style:** Logical grouping, Hierarchical layout, Clear dependency arrows.
