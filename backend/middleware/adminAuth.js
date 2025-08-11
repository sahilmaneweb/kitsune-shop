import jwt from "jsonwebtoken";

const JWT_KEY = process.env.ADMIN_JWT_KEY;


export const createAdminToken = (payload) => {
    const token = jwt.sign(payload, JWT_KEY, { expiresIn: "3h" });
    return `Bearer ${token}`;
};


export const verifyAdmin = (req, res) => {
    try {
        let { token } = req.headers;

        if (!token) {
            return res.status(401).json({
                status: 401,
                success: false,
                message: "No token provided"
            });
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7);
        }

        const decoded = jwt.verify(token, JWT_KEY);

        const currentTime = Math.floor(Date.now() / 1000);
        const timeRemaining = decoded.exp - currentTime;

        if (timeRemaining <= 600) {
            return res.status(440).json({
                status: 440,
                success: false,
                message: "Token about to expire, authenticate again"
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: "Token is valid",
            payload: decoded
        });
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                status: 401,
                success: false,
                message: "Token expired"
            });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(403).json({
                status: 403,
                success: false,
                message: "Invalid token"
            });
        }
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Token verification failed",
            error: error.message
        });
    }
};


export const authAdmin = (req, res, next) => {
    let { token } = req.headers;

    if (!token) {
        return res.status(401).json({
            status: 401,
            success: false,
            message: "No token provided"
        });
    }

    try {
        if (token.startsWith("Bearer ")) {
            token = token.slice(7);
        }

        const decoded = jwt.verify(token, JWT_KEY);

        req.admin = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                status: 401,
                success: false,
                message: "Token expired"
            });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(403).json({
                status: 403,
                success: false,
                message: "Invalid token"
            });
        }
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Authentication failed",
            error: error.message
        });
    }
};
