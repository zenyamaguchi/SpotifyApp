from fastapi import FastAPI

from app.routes.auth import router as auth_router
from app.routes.spotify import router as spotify_router
from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    SessionMiddleware,
    secret_key="your-secret-key",
    same_site="lax",   # "lax" works for localhost; use "none" if frontend/backend end up on different domains in prod
    https_only=False,  # set True in production once you're on HTTPS
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "https://zenyamaguchi.github.io"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(spotify_router)


@app.get("/")
def home():
    return {"message": "Spotify assboard API is running!"}