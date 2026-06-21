from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
db_key = os.getenv("MONGODB_URI")
mc = MongoClient(db_key)
db = mc["pdf-study-assistant"]