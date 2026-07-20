import httpx

from app.config import (
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)



def exchange_code_for_token(code: str):
    token_url = "https://accounts.spotify.com/api/token"

    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    }

    response = httpx.post(token_url, data=data)

    return response.json()



def get_current_user(access_token: str):
    user_profile_url = "https://api.spotify.com/v1/me"

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    response = httpx.get(user_profile_url, headers=headers)

    response.raise_for_status()  # Raise an exception for HTTP errors

    return response.json()

