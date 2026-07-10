from fastapi import APIRouter, Depends, HTTPException
from middleware.auth import verify_token
import chromadb
from pydantic import BaseModel
import anthropic
from config.db import db
from datetime import datetime
from datetime import timedelta
from bson import ObjectId



class Query(BaseModel):
    query: str


router = APIRouter()
client = chromadb.Client()
claude = anthropic.Anthropic()


@router.post("/")
def query(request: Query, user_id: str = Depends(verify_token)):
    user = db["users"].find_one({
        "_id": ObjectId(user_id)
    })

    if user['query_reset_date'] < datetime.now():
        db["users"].update_one({
            "_id": ObjectId(user_id)
        }, {"$set": {"query_count": 0, "query_reset_date": datetime.now() + timedelta(days=7)}}
        )
    
    if user['query_count'] > 3:
        raise HTTPException(
            status_code=429,
            detail="Query limit passed. Try again soon."
        )
    
    collection = client.get_or_create_collection(
        name=f'user_{user_id}'
    )

    results = collection.query(
        query_texts=[request.query],
        n_results = 3
    )

    


    chunks = results['documents'][0]
    context = '\n\n'.join(chunks)
    prompt = f'''Here is some context: \n\n{context}\n\n Question: {request.query}'''


    response = claude.messages.create(
        model='claude-haiku-4-5',
        max_tokens=1024,
        messages = [{
            'role': 'user',
            'content': prompt
        }]
    )
    db["users"].update_one({
        "_id": ObjectId(user_id)
    }, {"$inc": {"query_count": 1}})
    return {'response': response.content[0].text}