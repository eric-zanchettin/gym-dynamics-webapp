import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { ForgotPassword } from "../pages/ForgotPassword";

export default function Router() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};