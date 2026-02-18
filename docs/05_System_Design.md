# High-Scalability System Design

## Architecture Overview

This document outlines the architecture designed to support **1 Million+ Concurrent Users**. It utilizes a microservices approach with horizontal scaling, caching strategies, and asynchronous processing.

### System Components

1.  **CDN (Content Delivery Network)**: Cloudflare/AWS CloudFront for static assets (JS, CSS, Images).
2.  **Load Balancer (L7)**: Nginx/AWS ALB to distribute traffic across API Gateway instances.
3.  **API Gateway**: Kong/Zuul for rate limiting, auth routing, and request aggregation.
4.  **Service Mesh**: Consul/Istio for inter-service communication and observability.
5.  **Cache Layer**: Redis Cluster for session management and hot data caching.
6.  **Message Queue**: Kafka/RabbitMQ for asynchronous tasks (e.g., generating AI notes, processing uploads).
7.  **Worker Nodes**: Python/Go workers consuming tasks from the queue (scalable independently).
8.  **Database Sharding**: PostgreSQL partitioned by UserID/CourseID.
9.  **Vector Search**: Pinecone/Milvus for RAG (Retrieval-Augmented Generation).

---

### Scalable Architecture Diagram

```mermaid
graph TD
    User((User)) -->|HTTPS| CDN[CDN (Cloudflare)]
    User -->|HTTPS| LB[Load Balancer (AWS ALB)]

    CDN --> LB

    subgraph "DMZ / Public Subnet"
        LB --> Gateway[API Gateway (Kong)]
    end

    subgraph "Service Layout (K8s Cluster)"
        Gateway --> Auth[Auth Service]
        Gateway --> Course[Course Service]
        Gateway --> AI_API[AI Orchestrator]

        Auth --> Redis[(Redis Cache)]
        Course --> Redis
    end

    subgraph "Async Processing"
        AI_API -->|Publish Task| Kafka{Kafka / RabbitMQ}

        Kafka --> Worker1[AI Worker: Note Gen]
        Kafka --> Worker2[AI Worker: Quiz Gen]
        Kafka --> Worker3[System Worker: Analytics]

        Worker1 --> LLM[External LLM API]
        Worker2 --> LLM
    end

    subgraph "Data Persistence"
        Auth --> DB_Users[(PostgreSQL - Users)]
        Course --> DB_Content[(PostgreSQL - Courses)]
        Worker1 --> VectorDB[(Vector DB - Qdrant)]
        Worker3 --> Warehouse[(ClickHouse - Analytics)]
    end
```

---

### Data Flow for "Heavy" Request (e.g., Generate Notes for 500pg PDF)

1.  **Upload**: User uploads PDF → stored in S3 → Metadata to API.
2.  **Queue**: API pushes `process_pdf_job` to Kafka.
3.  **Ack**: User receives "Processing Started" (202 Accepted).
4.  **Worker**:
    - Pulls job.
    - Downloads PDF from S3.
    - Chunks text & generates Embeddings.
    - Stores vectors in VectorDB.
    - Summarizes via LLM.
5.  **Notify**: Worker updates Job Status in Redis + Pushes WebSocket notification to User.
