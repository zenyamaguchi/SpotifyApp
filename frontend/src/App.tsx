import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        fetch("https://spotifyapp-spx5.onrender.com//profile", {
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    setLoggedIn(true);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    if (loggedIn) {
        return <Dashboard />;
    }

    return <Login />;
}

export default App;