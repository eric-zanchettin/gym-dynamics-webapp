import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Login } from "../pages/Login";
import { ForgotPassword } from "../pages/ForgotPassword";
import { Home } from "../pages/Home";
import { setupApiService } from "../services/api";
import { GymDetails } from "../pages/GymDetails";

export default function Router() {
    const [cookies] = useCookies(['loginToken']);

    useEffect(() => {
        if (cookies.loginToken) {
            setupApiService.setupHeaders(cookies.loginToken);
        };
    }, [cookies]);

    return (
        <Routes>
            <Route path="/login" element={cookies?.loginToken ? <Navigate to="/" /> : <Login />} />
            <Route path="/forgot-password" element={cookies?.loginToken ? <Navigate to="/" /> : <ForgotPassword />} />
            <Route path="/home" element={cookies?.loginToken ? <Home /> : <Navigate to="/" />} />
            <Route path="/gym/:gymId" element={cookies?.loginToken ? <GymDetails /> : <Navigate to="/" />} />
            <Route path="/" element={cookies?.loginToken ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};