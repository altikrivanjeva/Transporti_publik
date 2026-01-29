import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

// Helper for generating tokens
const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username, email: user.email, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
};

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Plotëso të gjitha fushat!" });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Ky email ekziston!" });
        }

        const hash = bcrypt.hashSync(password, 10);

        const newUser = await User.create({
            username,
            email,
            password_hash: hash,
        });

        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);

        return res.json({
            message: "U regjistrua me sukses!",
            accessToken,
            refreshToken,
            user: { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role }
        });
    } catch (err) {
        console.error("Register Error:", err);
        return res.status(500).json({ message: "Gabim gjatë regjistrimit!" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Plotëso të gjitha fushat!" });

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "Email ose fjalëkalim i pasaktë!" });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password_hash);

        if (!isPasswordValid)
            return res.status(401).json({ message: "Email ose fjalëkalim i pasaktë!" });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return res.json({
            message: "Hyrja u krye me sukses!",
            accessToken,
            refreshToken,
            user: { id: user.id, username: user.username, email: user.email, role: user.role },
        });
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ message: "Gabim në server!" });
    }
};

export const refresh = (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(401).json({ message: "Mungon refresh token!" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message: "Refresh token i pavlefshëm!" });

        const user = await User.findByPk(decoded.id);
        if (!user) return res.status(404).json({ message: "Përdoruesi nuk ekziston!" });

        const newAccessToken = generateAccessToken(user);
        res.json({ accessToken: newAccessToken });
    });
};
