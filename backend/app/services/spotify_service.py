import httpx
from collections import Counter
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


def get_top_artists(access_token: str, limit: int = 20, time_range: str = "medium_term"):
    url = "https://api.spotify.com/v1/me/top/artists"

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    params = {
        "limit": limit,
        "time_range": time_range
    }

    response = httpx.get(
        url,
        headers=headers,
        params=params
    )

    response.raise_for_status()

    return response.json()


def get_top_tracks(
    access_token: str,
    limit: int = 20,
    time_range: str = "medium_term"
):
    url = "https://api.spotify.com/v1/me/top/tracks"

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    params = {
        "limit": limit,
        "time_range": time_range
    }

    response = httpx.get(
        url,
        headers=headers,
        params=params
    )

    response.raise_for_status()

    return response.json()

def get_genre_breakdown(
    access_token: str,
    limit: int = 20,
    time_range: str = "medium_term"
):

    artists = get_top_artists(
        access_token,
        limit,
        time_range
    )

    return calculate_genre_breakdown(artists)

def calculate_genre_breakdown(artists_json):
    genre_counter = Counter()

    artists = artists_json.get("items", [])

    for artist in artists:

        genres = artist.get("genres", [])

        genre_counter.update(genres)

    return dict(genre_counter)



def simplify_artists(artists_json):

    simplified = []

    for artist in artists_json["items"]:

        simplified.append({
            "name": artist["name"],
            "genres": artist["genres"],
            "popularity": artist["popularity"],
            "image": artist["images"][0]["url"] if artist["images"] else None
        })

    return simplified