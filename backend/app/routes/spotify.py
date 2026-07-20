from fastapi import APIRouter
from app.services import spotify_service
router = APIRouter()

@router.get("/profile")
def get_profile():

@router.get("/top-artists")
def get_top_artists():

@router.get("/top-tracks")
def get_top_tracks():   

@router.get("/genre-breakdown")
def get_genre_breakdown():