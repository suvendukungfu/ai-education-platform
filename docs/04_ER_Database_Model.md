# Database ER Model

## ER Diagram

**Tables:**

- `Users` (id, name, email, password_hash, role)
- `Courses` (id, title, description)
- `Lessons` (id, course_id, topic)
- `AINotes` (id, lesson_id, generated_content)
- `Quizzes` (id, lesson_id)
- `Questions` (id, quiz_id, question_text, answer)
- `Exams` (id, course_id)
- `ExamAttempts` (id, exam_id, user_id, score)
- `Analytics` (id, user_id, progress)

**Relationships:**

- **User** (1) ---- (0..\*) **ExamAttempts**
- **Course** (1) ---- (1..\*) **Lessons**
- **Lesson** (1) ---- (0..\*) **Quizzes**
- **Quiz** (1) ---- (1..\*) **Questions**
- **Lesson** (1) ---- (0..1) **AINotes**
- **Course** (1) ---- (0..\*) **Exams**

**Prompt:**
Create an Entity Relationship Diagram (ERD) for the AI Education Platform database.

- Visualise tables with primary keys (PK) and foreign keys (FK).
- distinct columns with data types (imputed).
- Show relationships with crow's foot notation.

**Style:**

- Startup SaaS database ERD.
- Clear cardinality.
- Professional layout.
- High contrast for readability.
