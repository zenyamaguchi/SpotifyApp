from fastapi import FastAPI

from app.routes.auth import router as auth_router
from app.routes.spotify import router as spotify_router
from starlette.middleware.sessions import SessionMiddleware
app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key="your-secret-key")

app.include_router(auth_router)
app.include_router(spotify_router)


@app.get("/")
def home():
    return {"message": "Spotify Dashboard API is running!"}