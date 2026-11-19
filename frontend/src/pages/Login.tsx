function Login() {
    const handleLogin = () => {
        window.location.href = "https://spotifyapp-spx5.onrender.com/login";
    };

    return (
        <div>
            <h1>Spotify Pie Chart</h1>
            <p>Connect your Spotify account to see your music profile.</p>

            <button onClick={handleLogin}>
                Login with Spotify
            </button>
        </div>
    );
}

export default Login;