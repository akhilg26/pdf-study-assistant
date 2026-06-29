from fastapi import APIRouter, Depends
from middleware.auth import verify_token
import chromadb
from pydantic import BaseModel
import anthropic

class Query(BaseModel):
    query: str


router = APIRouter()
client = chromadb.Client()
claude = anthropic.Anthropic()


@router.post("/")
def query(request: Query, user_id: str = Depends(verify_token)):
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

    return {'response': response.content[0].text}