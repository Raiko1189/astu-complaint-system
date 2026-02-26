import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            fetchMe();
        } else {
            localStorage.removeItem('token');
            setUser(null);
            setLoading(false);
        }
    }, [token]);

    const fetchMe = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(res.data.data);
        } catch (err) {
            console.error("Auth verification failed", err);
            setToken(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        const newToken = res.data.data.token;
        setToken(newToken);
        localStorage.setItem('token', newToken);

        // Immediately fetch user data to ensure state is ready before navigation
        try {
            const userRes = await axios.get('http://localhost:5000/api/auth/me', {
                headers: { Authorization: `Bearer ${newToken}` }
            });
            setUser(userRes.data.data);
            // Return combined data so components can check role immediately
            return {
                ...res.data,
                user: userRes.data.data
            };
        } catch (error) {
            console.error("Failed to fetch user after login", error);
            return res.data;
        }
    };

    const register = async (email, password) => {
        const res = await axios.post('http://localhost:5000/api/auth/register', { email, password });
        setToken(res.data.data.token);
        return res.data;
    };

    const googleLogin = async (tokenId) => {
        const res = await axios.post('http://localhost:5000/api/auth/google', { tokenId });
        const newToken = res.data.data.token;
        setToken(newToken);
        localStorage.setItem('token', newToken);

        // Immediately fetch user data to ensure state is ready before navigation
        try {
            const userRes = await axios.get('http://localhost:5000/api/auth/me', {
                headers: { Authorization: `Bearer ${newToken}` }
            });
            setUser(userRes.data.data);
        } catch (error) {
            console.error("Failed to fetch user after Google login", error);
        }

        return res.data;
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout, googleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
