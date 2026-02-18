# Behavioral Diagrams

## Sequence Diagram

**Flow:** Student → Frontend → Backend API → AI Engine → Database → Response

**Prompt:**
Create a Sequence Diagram depicting the "Generate AI Notes" workflow.

1. **Student** requests notes generation via Frontend.
2. **Frontend** calls **Backend API**.
3. **Backend API** sends request to **AI Engine**.
4. **AI Engine** processes content and returns notes.
5. **Backend API** stores notes in **Database**.
6. **Backend API** returns success to **Frontend**.
7. **Frontend** displays notes to **Student**.

**Style:** Clean arrows, Readable labels, Professional academic design.

---

## Activity Diagram

**Steps:**

- Login
- Select Topic
- Generate Notes
- Create Quiz
- Take Exam
- View Result

**Prompt:**
Generate an Activity Diagram for a typical student study session.

- Start -> Login -> Select Topic.
- Decision: Generate Notes OR Create Quiz.
- If Generate Notes -> View Notes -> End.
- If Create Quiz -> Take Quiz -> View Result -> End.
- Parallel: Background sync of progress.

**Style:** Professional flow chart, Clear decision nodes.

---

## State Machine Diagram

**States:**

- Idle
- Learning
- Practicing
- Testing
- Completed

**Prompt:**
Create a State Machine Diagram for a Student's engagement with a specific Lesson.

- Initial State: **Idle**.
- Transition to **Learning** when material is opened.
- Transition to **Practicing** when taking a quiz.
- Transition to **Testing** when taking an exam.
- Transition to **Completed** when passing threshold met.
- Return to **Idle** or **Learning** from other states based on actions.

**Style:** Professional academic design, Clear state transitions.
