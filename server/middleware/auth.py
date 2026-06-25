from jose import jwt
from fastapi import HTTPException, Header
import os
from dotenv import load_dotenv

load_dotenv()

jwt_secret = os.getenv('JWT_SECRET')



def verify_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(
            status_code=401,
            detail = 'Authorization does not exist'
        )
    print("Authorization header:", authorization)
    token = authorization.split(' ')[1]
    try: 
        decoded_token = jwt.decode(token, jwt_secret, algorithms=['HS256'])
    except:
        raise HTTPException(
            status_code=401,
            detail = 'Token cannot be decoded'
        )
    
    token_id = decoded_token['id']

    return token_id


