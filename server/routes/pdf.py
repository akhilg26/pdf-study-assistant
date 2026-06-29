import pymupdf
from fastapi import APIRouter, UploadFile, Depends
from middleware.auth import verify_token
from langchain_text_splitters import RecursiveCharacterTextSplitter
import chromadb

router = APIRouter()
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
client = chromadb.Client()



@router.post('/upload')
async def upload(file: UploadFile, user_id: str = Depends(verify_token)):
    contents = await file.read() # convert to raw bytes
    doc = pymupdf.open(stream=contents, filetype='pdf') # open using stream (of raw bytes) 
    text = ''
    for page in doc:
        text += page.get_text()
    chunks = text_splitter.split_text(text)
    collection = client.get_or_create_collection(
        name=f'user_{user_id}'
    )
    ids = [f'id_{file.filename}_{i}' for i in range(len(chunks))]
    collection.add(
        ids=ids,
        documents=chunks,
    )
   

