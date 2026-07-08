from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from config.db import db
from routes.auth import router as auth_router
from routes.pdf import router as pdf_router
from routes.query import router as query_router
from middleware.auth import verify_token

print("MongoDB connected:", db.name)

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix='/api/auth')
app.include_router(pdf_router, prefix='/api/pdf')
app.include_router(query_router, prefix='/api/query')

@app.get("/")
def root():
    return {"message": "Server is running"}

@app.get("/protected")
def protected_route(user_id: str = Depends(verify_token)):
    return {'user-id': user_id}