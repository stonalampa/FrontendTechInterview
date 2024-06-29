import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission

        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:3000/api/login",
                {
                    email: email,
                    password: password,
                }
            );
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files); // Update selectedFiles state with all selected files
    };

    const tryRegister = async () => {
        const formData = new FormData();
        // Append each selected file to formData
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append("photos", selectedFiles[i]);
        }
        // Append other form data fields
        formData.append("firstName", "John");
        formData.append("lastName", "Doe");
        formData.append("email", "john.doe@example2.com");
        formData.append("password", "password");
        formData.append("role", "client");

        try {
            const response = await axios.post(
                "http://localhost:3000/api/register",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Registration successful:", response.data);
            // Handle success, e.g., show a success message or update UI
        } catch (error) {
            console.error("Error registering user:", error);
            // Handle error, e.g., show an error message or alert
        }
    };

    const tryGet = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/user?email=john.doe@example.com",
                {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                }
            );
            setData(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            {error && <p>Error: {error}</p>}
            {data && (
                <div>
                    <h3>Response:</h3>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
            <div>
                <h2>Upload Files</h2>
                <input type="file" multiple onChange={handleFileChange} />
            </div>
            <button onClick={tryGet}>Try GET</button>
            <button onClick={tryRegister}>Try Register</button>
        </div>
    );
};

export default LoginPage;
