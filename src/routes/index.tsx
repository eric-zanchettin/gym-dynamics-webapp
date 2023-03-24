import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Login } from "../pages/Login";
import { ForgotPassword } from "../pages/ForgotPassword";
import { Home } from "../pages/Home";

export default function Router() {
    const [cookies] = useCookies(['loginToken']);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        if (cookies.loginToken) {
            setLoggedIn(() => true);
        } else {
            setLoggedIn(() => false);
        };
    }, [cookies]);

    console.log(cookies.loginToken, loggedIn);

    return (
        <Routes>
            <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login />} />
            <Route path="/forgot-password" element={loggedIn ? <Navigate to="/" /> : <ForgotPassword />} />
            <Route path="/home" element={loggedIn ? <Home /> : <Navigate to="/" />} />
            <Route path="/" element={loggedIn ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};