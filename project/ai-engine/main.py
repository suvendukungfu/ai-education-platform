import os
import shutil
from typing import List, Optional
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import PyPDF2

app = FastAPI(title="AI Education Engine")

# CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simulated Knowledge Base (In-memory/Local for MVP)
KNOWLEDGE_DIR = "storage"
if not os.path.exists(KNOWLEDGE_DIR):
    os.makedirs(KNOWLEDGE_DIR)

class QueryRequest(BaseModel):
    course_id: str
    question: str
    conversation_id: Optional[str] = None

class QueryResponse(BaseModel):
    answer: str
    sources: List[str]
    thinking: str

@app.get("/")
async def root():
    return {"status": "AI Engine Online", "features": ["RAG", "Assessments"]}

@app.post("/ingest")
async def ingest_document(
    course_id: str = Form(...),
    file: UploadFile = File(...)
):
    try:
        # Save file to local storage
        file_path = os.path.join(KNOWLEDGE_DIR, f"{course_id}_{file.filename}")
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Extract basic text for context (Simulated indexing)
        text_content = ""
        with open(file_path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                text_content += page.extract_text() + "\n"

        # Save context to a simple text file
        context_path = os.path.join(KNOWLEDGE_DIR, f"{course_id}_context.txt")
        with open(context_path, "w", encoding="utf-8") as f:
            f.write(text_content)

        return {
            "status": "success",
            "course_id": course_id,
            "message": f"Successfully ingested {file.filename}",
            "chunks": len(text_content) // 1000 # Estimate
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/query", response_model=QueryResponse)
async def query_tutor(request: QueryRequest):
    try:
        # 1. Retrieve context
        context_path = os.path.join(KNOWLEDGE_DIR, f"{request.course_id}_context.txt")
        if not os.path.exists(context_path):
            context = "No course materials available."
        else:
            with open(context_path, "r", encoding="utf-8") as f:
                context = f.read(5000) # Only first 5000 chars for now

        # 2. Simulated RAG Response (Integrate LangChain here later)
        thinking = f"Analyzing document context for course {request.course_id}. Searching for: {request.question}"
        
        # Stub response if no OpenAI key
        if not os.getenv("OPENAI_API_KEY"):
            answer = f"I see you're asking about {request.question}. Based on the materials I've ingested, here's what I found: [AI would normally use OpenAI here]. Since the API key is not yet configured, I am in Simulation Mode."
            sources = ["Extracted Materials", "Course Syllabus"]
        else:
            # Integrate actual LLM logic here
            answer = "OpenAI integration would process this with the context: " + context[:100]
            sources = ["Source Page 1"]

        return QueryResponse(
            answer=answer,
            sources=sources,
            thinking=thinking
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", "8000")),
    )
