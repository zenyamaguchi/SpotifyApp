import { useEffect, useState } from "react";
import { getProfile } from "../services/api";
import { apiFetch } from "../services/api";

type Profile = {
    display_name: string;
    followers: {
        total: number;
    };
    images: {
        url: string;
        height: number;
        width: number;
    }[];
};
function ProfileCard() {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        getProfile()
            .then((data) => {
                setProfile(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    if (!profile) {
        return (
            <div className="profile-card">
                <p>Loading profile...</p>
            </div>
        );
    }

return (
    <div className="profile-card">

        {profile.images.length > 0 && (
            <img
                src={profile.images[0].url}
                alt={`${profile.display_name}'s profile`}
                className="profile-picture"
            />
        )}

        <h2>{profile.display_name}</h2>
        <p>{profile.followers.total} followers</p>

    </div>
);
}
export default ProfileCard;