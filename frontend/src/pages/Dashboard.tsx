import ProfileCard from "../components/ProfileCard";
import GenreChart from "../components/GenreChart";

function Dashboard() {
    return (
        <div>
            <h1>Spotify Pie Chart</h1>

            <ProfileCard />

            <GenreChart />
        </div>
    );
}

export default Dashboard;