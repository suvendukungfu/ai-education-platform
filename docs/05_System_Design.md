# System Design & Scalability Architecture

This document details the infrastructure design intended to support the AI Education Platform at scale (1M+ concurrent users). It adheres to the **Twelve-Factor App** methodology and utilizes cloud-native patterns for resilience and elasticity.

## Architectural Principles

1.  **Statelessness**: All application services are stateless, delegating state persistence to external backing services (Postgres, Redis). This allows for horizontal autoscaling.
2.  **Asynchronous Processing**: High-latency operations (e.g., PDF analysis, LLM generation) are decoupled from the request/response cycle using message queues (Kafka/RabbitMQ).
3.  **Caching at the Edge**: Static assets and idempotent API responses are cached via CDN and Redis to minimize origin load.

## Scalability Components

### 1. Load Balancing & API Gateway

- **Infrastructure**: AWS ALB (Application Load Balancer) fronting a Kong API Gateway.
- **Function**: Terminates SSL, enforces rate limits, manages CORS, and routes traffic based on URL path.
- **Strategy**: Round/Robin distribution to healthy backend instances.

### 2. Service Orchestration

- **Environment**: Kubernetes (EKS/GKE).
- **Scaling Policy**: HPA (Horizontal Pod Autoscaler) triggers new pod replicas when CPU usage exceeds 70% or Request Queue depth increases.

### 3. Data Partitioning & Caching

- **Read Replicas**: PostgreSQL configured with a single writer and multiple read replicas. Reporting/Analytics queries are routed strictly to replicas.
- **Caching Strategy**: **Write-Through** cache for user profiles; **Time-to-Live (TTL)** cache for course content.

### System Topology Diagram

```mermaid
graph TD
    Client[Client (Web/Mobile)] -->|HTTPS| CDN[Cloudflare CDN]
    CDN -->|Filtered Traffic| LB[AWS ALB]

    subgraph VPC [Private Network]
        LB --> Gateway[Kong API Gateway]

        subgraph Kubernetes Cluster
            Gateway --> Svc_Auth[Auth Service]
            Gateway --> Svc_Core[Course Service]
            Gateway --> Svc_AI[AI Orchestrator]

            Svc_Auth -- HPA --> Svc_Auth
        end

        subgraph Data Layer
            Svc_Auth --> Redis[(Redis Cluster)]
            Svc_Auth --> DB_Master[(Postgres Primary)]
            Svc_Core --> DB_Read[(Postgres Replicas)]
        end

        subgraph Async Worker Layer
            Svc_AI --> Kafka{Kafka Topics}
            Kafka --> Worker_Gen[Generation Worker]
            Kafka --> Worker_Index[Vector Indexer]

            Worker_Gen --> LLM[OpenAI API]
            Worker_Index --> VectorDB[(Qdrant Shards)]
        end
    end
```

## Resilience Patterns

- **Circuit Breakers**: Implemented in service-to-service calls (e.g., calling the LLM provider). If the error rate exceeds a threshold, the circuit opens to fail fast and prevent cascading failures.
- **Dead Letter Queues (DLQ)**: Failed async jobs are routed to a DLQ for manual inspection and replay, ensuring no data loss during processing errors.
- **Graceful Degradation**: If the AI service is down, the core platform (reading, quizzes) remains fully functional. The UI simply disables "Generate" buttons.

## Bottleneck Analysis

| Component     | Potential Bottleneck               | Mitigation Strategy                                                                            |
| :------------ | :--------------------------------- | :--------------------------------------------------------------------------------------------- |
| **Vector DB** | High-latency searches during load. | Implement HNSW formatting for approximate nearest neighbor search; shard based on Course ID.   |
| **LLM API**   | Rate limits & high cost.           | Implement semantic caching (check if a similar query was answered before) to reduce API calls. |
| **Database**  | Write contention on Analytics.     | Use ClickHouse or TimescaleDB for time-series analytics data instead of row-based Postgres.    |
