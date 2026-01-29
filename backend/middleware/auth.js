import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Qasje e mohuar! Mungon token-i." });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token i pavlefshëm ose ka skaduar!" });
        }
        req.user = user;
        next();
    });
};

export const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Qasje e mohuar! Kërkohet autorizim i nivelit Admin." });
    }
};
