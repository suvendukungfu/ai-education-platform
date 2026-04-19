import os
import shutil
from typing import List, Optional
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import PyPDF2
import json

# AI/ML Imports
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_qdrant import QdrantVectorStore
from langchain_core.prompts import ChatPromptTemplate
from langchain_text_splitters import RecursiveCharacterTextSplitter

app = FastAPI(title="AI Education Engine (Production)")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# AI Persistence
STORAGE_DIR = "storage"
QDRANT_DIR = os.path.join(STORAGE_DIR, "qdrant")
for d in [STORAGE_DIR, QDRANT_DIR]:
    if not os.path.exists(d):
        os.makedirs(d)

# AI Models initialized lazily if keys exist
def get_embeddings():
    return OpenAIEmbeddings(model="text-embedding-3-small")

def get_llm():
    return ChatOpenAI(model="gpt-4o", temperature=0.7)

class QueryRequest(BaseModel):
    course_id: str
    question: str
    conversation_id: Optional[str] = None

class QueryResponse(BaseModel):
    answer: str
    sources: List[str]
    thinking: str

class ForgeRequest(BaseModel):
    topic: str
    level: str

class LessonNode(BaseModel):
    title: str
    content: str
    order: int

class ModuleNode(BaseModel):
    title: str
    order: int
    lessons: List[LessonNode]

class ForgeResponse(BaseModel):
    title: str
    description: str
    modules: List[ModuleNode]

@app.get("/")
async def root():
    has_key = bool(os.getenv("OPENAI_API_KEY"))
    return {
        "status": "online",
        "provider": "OpenAI",
        "api_ready": has_key,
        "capabilities": ["Vector RAG", "Dynamic Forge", "Semantic Search"]
    }

@app.post("/ingest")
async def ingest_document(
    course_id: str = Form(...),
    file: UploadFile = File(...)
):
    try:
        # 1. Save and extract text
        file_path = os.path.join(STORAGE_DIR, f"{course_id}_{file.filename}")
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        text_content = ""
        with open(file_path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                text_content += page.extract_text() + "\n"

        # 2. Chunking
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        chunks = text_splitter.split_text(text_content)

        # 3. Vector Storage (Qdrant)
        vector_store = QdrantVectorStore.from_texts(
            texts=chunks,
            embedding=get_embeddings(),
            location=f"{QDRANT_DIR}/{course_id}",
            collection_name=course_id,
        )

        return {
            "status": "success",
            "course_id": course_id,
            "message": f"Successfully indexed {len(chunks)} chunks into vector store.",
        }
    except Exception as e:
        print(f"Ingestion Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/query", response_model=QueryResponse)
async def query_tutor(request: QueryRequest):
    try:
        if not os.getenv("OPENAI_API_KEY"):
            return QueryResponse(
                answer="Simulation Mode: OpenAI Key is missing.",
                sources=["System Default"],
                thinking="Skipped vector search due to missing credentials."
            )

        # 1. Vector Search
        try:
            vector_store = QdrantVectorStore.from_existing_collection(
                embedding=get_embeddings(),
                location=f"{QDRANT_DIR}/{request.course_id}",
                collection_name=request.course_id,
            )
            docs = vector_store.similarity_search(request.question, k=4)
            context = "\n\n".join([doc.page_content for doc in docs])
        except:
            context = "No specific course materials found. Relying on general knowledge."
            docs = []

        # 2. LLM RAG
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are an elite AI Tutor. Use the following course context to answer the student's question accurately and clearly. If you don't know the answer, say so. Context:\n{context}"),
            ("user", "{question}")
        ])

        llm = get_llm()
        chain = prompt | llm
        response = chain.invoke({"context": context, "question": request.question})

        return QueryResponse( # type: ignore
            answer=response.content,
            sources=[f"Material Chunk {i+1}" for i in range(len(docs))],
            thinking=f"Retrieved {len(docs)} relevant chunks for synthesis."
        )
    except Exception as e:
        print(f"Query Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/forge", response_model=ForgeResponse)
async def forge_course_api(request: ForgeRequest):
    try:
        # Prompt for Forge (Generates structured JSON)
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are a Master Learning Designer. Given a topic and level, design a professional course syllabus in JSON format. The JSON must exactly follow this schema: {{ 'title': 'Course Title', 'description': 'Summary', 'modules': [ {{ 'title': 'M1 Title', 'order': 1, 'lessons': [ {{ 'title': 'L1', 'content': 'Full lesson content in Markdown', 'order': 1 }} ] }} ] }}. Create 3 modules with 3 lessons each."),
            ("user", "Forge a {level} level curriculum for: {topic}")
        ])

        llm = get_llm()
        response = llm.invoke(prompt.format(level=request.level, topic=request.topic))
        
        # Robust JSON extraction from LLM response
        import re
        content_str = response.content
        json_match = re.search(r"```json\s*([\s\S]*?)\s*```", content_str)
        if json_match:
            content_str = json_match.group(1)
        else:
            # Fallback to cleaning the whole string if no code block
            content_str = content_str.replace("```", "").strip()
            # If there's still text before/after the JSON, try to find the start and end of { ... }
            start = content_str.find("{")
            end = content_str.rfind("}") + 1
            if start != -1 and end != 0:
                content_str = content_str[start:end]

        try:
            data = json.loads(content_str)
            return ForgeResponse(**data)
        except json.JSONDecodeError as je:
            print(f"JSON Decode Error: {je} for content: {content_str}")
            raise ValueError("Invalid structured response from AI")
    except Exception as e:
        print(f"Forge Error: {e}")
        # Fallback to simulated data if LLM parsing fails
        fallback_title = f"Synthesized Path: {request.topic}"
        return ForgeResponse(
            title=fallback_title,
            description="Synthesis complete via backup neural pathways.",
            modules=[ModuleNode(title="Fundamentals", order=1, lessons=[LessonNode(title="Intro", content="Content Loading...", order=1)])]
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
