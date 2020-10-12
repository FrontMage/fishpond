from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from snownlp import SnowNLP

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/sentiment/")
async def get_sentiment(sentence = ""):
    s = SnowNLP(sentence)
    return s.sentiments
