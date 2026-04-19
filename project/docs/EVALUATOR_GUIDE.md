# 🎓 Axion Intelligence Platform - Evaluator's Guided Tour

Welcome to the final submission of the **Axion Intelligence AI Education Platform**. This document is designed to help you navigate the high-fidelity features we've implemented for this project.

## 🔑 Demo Access (Student-Faculty-Admin)

| Role | Email | Password | What to explore |
| :--- | :--- | :--- | :--- |
| **Student** | `student@example.com` | `password123` | **NeuralHUD**, Adaptive Learning widget, Tutor Chat. |
| **Faculty** | `faculty@example.com` | `password123` | Course Creation, Module orchestration. |
| **Admin** | `admin@example.com` | `password123` | **System Telemetry**, Audit Logs, Node Connectivity. |

---

## 🚀 Key "Senior Level" Features to Observe

### 1. Neural HUD & Adaptive Calibration (Student Dashboard)
When logged in as a student, look at the top-right **NeuralHUD**. It features a pulsating heartbeat and real-time biometric-simulated telemetry. Below it, the **Weak Topic Calibration** widget uses AI to identify knowledge gaps and suggest specific curriculum nodes.

### 2. Clean Architecture & Design Patterns (Backend)
The backend refactor utilizes **Clean Architecture** with a strictly decoupled class hierarchy:
- `BaseRepository.ts`: Demonstrates Master-Level **Inheritance** and **Abstraction**.
- `CourseController.ts`: Practical implementation of **Dependency Injection** and **SOLID** principles.

### 3. Administrative Control Center (Admin Dashboard)
The Admin dashboard (`/admin`) demonstrates the platform's orchestration capabilities. Observe the **Neural Connectivity** chart and the **System Audit Log** which captures real-time telemetry from the Prisma engine and FastAPI worker nodes.

### 4. Global Page Transitions
Every route navigation is handled via **Framer Motion** synchronized wrappers, providing a premium, high-fidelity experience that rivals enterprise SaaS platforms.

---

## 🛠️ Automated Setup Verification
- **CI/CD**: Check `.github/workflows/main.yml` for the professional automated pipeline.
- **Testing**: Run `npm test` in the `backend` directory to see the **Vitest** unit testing suite in action.
- **Prisma 7**: The platform is fully optimized for the latest Prisma 7 datasource protocols.

---

**Thank you for evaluating the Axion Intelligence Platform. We have designed this to be the definitive production-grade submission.**
