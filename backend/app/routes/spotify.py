from fastapi import APIRouter, Request, HTTPException
from app.services import spotify_service


router = APIRouter()

@router.get("/profile")
def profile(request: Request):

    access_token = request.session.get("access_token")
   
    return spotify_service.get_current_user(access_token)

@router.get("/top-artists")
def top_artists(request: Request):

    access_token = request.session.get("access_token")

    return spotify_service.simplify_artists(spotify_service.get_top_artists(access_token))

@router.get("/top-tracks")
def get_top_tracks(request: Request):

    access_token = request.session.get("access_token")

    return spotify_service.get_top_tracks(access_token)

@router.get("/genre-breakdown")
def get_genre_breakdown(request: Request):

    access_token = request.session.get("access_token")

    return spotify_service.get_genre_breakdown(access_token)

