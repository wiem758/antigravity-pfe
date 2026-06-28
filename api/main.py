# api/main.py
# Point d'entrée de l'API agent.
# Reçoit les requêtes Angular, orchestre LangGraph.
# Lance : uvicorn api.main:app --reload --port 8000


from dotenv import load_dotenv
load_dotenv()  


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import chat, sessions

app = FastAPI(title="Agent DWEXO — API", version="1.0.0")

# CORS : autorise Angular (port 4200) à appeler cette API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)
app.include_router(sessions.router)

@app.get("/health")
def health():
    return {"status": "ok", "service": "agent-api"}