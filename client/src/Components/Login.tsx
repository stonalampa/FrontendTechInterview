import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useStore } from "../store/store";
import axios from "axios";
import "../style/Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const setIsLogged = useStore((state) => state.setIsLogged);
    const setJwtToken = useStore((state) => state.setJwtToken);
    const setStoreEmail = useStore((state) => state.setEmail);
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/login",
                {
                    email,
                    password,
                }
            );

            if (response.data.token) {
                console.log("Login successful!", response.data);
                setJwtToken(response.data.token);
                setIsLogged(true);
                setStoreEmail(email);
                navigate("/profile");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    useEffect(() => {
        setIsFormValid(validateEmail(email) && password !== "");
    }, [email, password]);

    const handleRedirectToRegister = () => {
        navigate("/register");
    };

    return (
        <div className="login-container">
            {useStore((state) => state.isLogged) && <Navigate to="/profile" />}
            <h2>Login</h2>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="password-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "👁️" : "👁️‍🗨️"}
                    </span>
                </div>
            </div>
            <button onClick={handleLogin} disabled={!isFormValid}>
                Login
            </button>
            <button onClick={handleRedirectToRegister}>Register</button>
        </div>
    );
};

export default Login;
