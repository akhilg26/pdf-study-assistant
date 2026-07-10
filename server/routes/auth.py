from fastapi import APIRouter, HTTPException
from models.user import User
import bcrypt
from jose import jwt
import os
import datetime
from dotenv import load_dotenv
from config.db import db
from datetime import datetime
from datetime import timedelta

load_dotenv()

jwt_secret = os.getenv('JWT_SECRET')

router = APIRouter()

@router.post("/register")
def register(user: User):
    if db["users"].find_one({
        'username' : user.username
    }):
        raise HTTPException(
            status_code = 400,
            detail="Username already taken"
        )
    salt = bcrypt.gensalt()
    hashed_pw = bcrypt.hashpw(user.password.encode('utf-8'), salt)
    db_user = db["users"].insert_one({
        'username': user.username,
        'password': hashed_pw,
        'query_count': 0,
        'query_reset_date': datetime.now() + timedelta(days=7)
    })

    token = jwt.encode({'id' : str(db_user.inserted_id)}, jwt_secret, 'HS256')

    return_dict = {
        'username' : user.username,
        'token' : token,
        'id' : str(db_user.inserted_id)
    }

    return return_dict

@router.post("/login")
def login(user: User):
    
    db_user = db['users'].find_one({
        'username' : user.username
    })
    
    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="Username not found"
        )
    
    if not bcrypt.checkpw(user.password.encode('utf-8'), db_user['password']):
        raise HTTPException(
            status_code=400,
            detail='Incorrect password'
        )
    
    token = jwt.encode({'id': str(db_user['_id'])}, jwt_secret, 'HS256')

    return {'token' : token}