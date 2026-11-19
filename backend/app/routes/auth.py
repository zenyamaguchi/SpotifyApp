from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
from app.services import spotify_service
from fastapi.responses import RedirectResponse

from app.config import CLIENT_ID, CLIENT_SECRET, REDIRECT_URI

router = APIRouter()

@router.get("/login")
def login():
    scope = "user-top-read"
    auth_url = (
    "https://accounts.spotify.com/authorize"
    f"?client_id={CLIENT_ID}"
    "&response_type=code"
    f"&redirect_uri={REDIRECT_URI}"
    f"&scope={scope}")
    return RedirectResponse(auth_url)



@router.get("/callback")
def callback(request: Request):

    code = request.query_params.get("code")

    token_data = spotify_service.exchange_code_for_token(code)

    access_token = token_data["access_token"]

    request.session["access_token"] = access_token


   # user = spotify_service.get_current_user(access_token)

   
    #return user
    return RedirectResponse("https://spotifyapp-spx5.onrender.com/")

 