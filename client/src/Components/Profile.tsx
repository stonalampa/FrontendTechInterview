import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { useStore } from "../store/store";
import "../style/Profile.css";
import { config } from "../config";
import { useSnackbar } from "notistack";

const Profile = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [user, setUser] = useState<{
        fullName: string;
        avatar: string;
        photos: string[];
    } | null>(null);
    const [loading, setLoading] = useState(true);
    const isLogged = useStore((state) => state.isLogged);

    const handleLogout = () => {
        useStore.setState({ isLogged: false, jwtToken: "", email: "" });
    };

    const fetchUser = async () => {
        try {
            const email = useStore.getState().email;
            const token = useStore.getState().jwtToken;
            const response = await axios.get(
                `${config.apiUrl}/user?email=${email}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUser(response.data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error fetching user:", error);
            console.error("Error during login:", error);
            enqueueSnackbar(`${error.message}`, {
                variant: "error",
                autoHideDuration: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Error loading user data</div>;
    }

    const { fullName, avatar, photos } = user;
    return (
        <div className="profile-container">
            {!isLogged && <Navigate to="/" />}
            <div className="profile-header">
                <div className="profile-info">
                    <img
                        src={avatar}
                        alt={`${fullName}'s avatar`}
                        className="avatar"
                        style={{ width: "50px", height: "50px" }}
                    />
                    <h1>{fullName}</h1>
                </div>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <h2>Your Photos</h2>
            <Carousel>
                {photos.map((photo, index) => (
                    <div key={index}>
                        <img src={photo} alt={`User photo ${index + 1}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Profile;
