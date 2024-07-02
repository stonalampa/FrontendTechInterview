import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import { SnackbarProvider } from "notistack";

function App() {
    return (
        <SnackbarProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </SnackbarProvider>
    );
}

export default App;
