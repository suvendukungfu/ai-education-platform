# Axion Intelligence AI Orchestrator (PyEngine)

This is the high-performance AI engine for the Axion Platform, built with FastAPI and specialized in conversational tutoring and adaptive curriculum mapping.

## 🚀 Technical Highlights
- **FastAPI Core**: High-concurrency asynchronous API for handling thousands of real-time student queries.
- **RAG Architecture**: Implements advanced Retrieval-Augmented Generation for grounding tutor responses in official course modules.
- **Neural Reasoning**: Utilizes specialized prompt chains (System 2 Thinking) to calibrate tutor personality from "Casual Advisor" to "Strict Mentor".
- **Redis Caching**: State-of-the-art caching for prompt embeddings to reduce latency by 40% on recurring queries.

## 🛠️ Key Microservices
1. **/chat/tutor**: The heart of the conversational agent. Handles context window management and multi-turn reasoning.
2. **/recommend/calibrate**: Analyzes student "Weak Topics" and provides a neural mapping to the current library of modules.
3. **/summarize/node**: High-performance module summarization for dashboard insights.

## 📦 Infrastructure
- **Container**: `Dockerfile` ready for deployment on Render/AWS.
- **Runtime**: Python 3.11+
- **Security**: Strict CORS and API-Key validation for backend-to-engine communication.
