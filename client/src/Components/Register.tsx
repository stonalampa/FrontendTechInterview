import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useStore } from "../store/store";
import "../style/Register.css";

const Register = () => {
    const [formData, setFormData] = useState<{
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        photos: Blob[];
    }>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        photos: [],
    });
    const [selectedFiles, setSelectedFiles] = useState<Blob[]>([]);
    const navigate = useNavigate();
    const handleChange = (e: { target: { name: string; value: unknown } }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name as string]: value });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const filesArray = Array.from(files).slice(0, 4);
            setSelectedFiles(filesArray);
            setFormData({ ...formData, photos: filesArray });
        }
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        try {
            const formDataWithFiles = new FormData();
            formDataWithFiles.append("firstName", formData.firstName);
            formDataWithFiles.append("lastName", formData.lastName);
            formDataWithFiles.append("email", formData.email);
            formDataWithFiles.append("password", formData.password);
            formDataWithFiles.append("role", "client");
            for (let i = 0; i < selectedFiles.length; i++) {
                formDataWithFiles.append("photos", selectedFiles[i]);
            }

            const response = await axios.post(
                "http://localhost:3000/api/register",
                formDataWithFiles,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Registration successful!", response.data);
            navigate("/");
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className="register-page">
            {useStore((state) => state.isLogged) && <Navigate to="/profile" />}
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="photos">Select up to 4 photos</label>
                    <input
                        type="file"
                        id="photos"
                        name="photos"
                        accept="image/*"
                        onChange={handleFileChange}
                        multiple
                        max="4"
                    />
                    <div className="image-preview">
                        {selectedFiles.map((file, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index}`}
                            />
                        ))}
                    </div>
                </div>
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/">Login here</Link>
            </p>
        </div>
    );
};

export default Register;
