import * as authService from "./auth.service.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const result = await authService.registerUser(email, password, role);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;


        const result = await authService.loginUser(email, password);
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

export const getMe = async (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user
    });
};

export const googleLogin = async (req, res) => {
    try {
        const { tokenId } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const { email, name, picture, sub } = ticket.getPayload();

        const result = await authService.loginOrRegisterGoogleUser(email, name, picture, sub);

        res.status(200).json({
            success: true,
            message: "Google Login successful",
            data: result
        });

    } catch (error) {
        console.error("Google Login Error:", error.message);
        res.status(401).json({
            success: false,
            message: "Google authentication failed"
        });
    }
};
