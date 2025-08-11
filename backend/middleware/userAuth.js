import jwt from "jsonwebtoken";

const JWT_KEY = process.env.USER_JWT_KEY;
const SERVER_URL = process.env.SERVER_URL || "http://localhost:8080";

export const createUserToken = (payload) => {
    const token = jwt.sign(payload, JWT_KEY, { expiresIn: "3h" });
    return `Bearer ${token}`;
};

export const createUserVerifyUrl = (payload) => {
    const token = jwt.sign(payload, JWT_KEY, { expiresIn: "10m" });
    const verifyUrl = `${SERVER_URL}/user/verify?token=${token}`;
    return verifyUrl;
}

export const verifyTokenFromParams = (req, res, next) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).render('verificationError', {
      title: 'Verification Error',
      message: 'Verification token is missing in the URL.',
        error: 'Token is required for verification.'
    });
  }

  try {
    const payload = jwt.verify(token, JWT_KEY);
    req.body = req.body || {};
    req.body.userVerificationPayload = payload;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).render('verificationError', {
        title: 'Verification Error',
        message: 'Verification token expired. Please request a new verification email.',
        error: error.message,
      });
    }
    return res.status(400).render('verificationError', {
      title: 'Verification Error',
      message: 'Invalid verification token.',
      error: error.message,
    });
  }
};


export const verifyUserToken = (req, res) => {
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



export const authUser = (req, res, next) => {
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

        req.user = decoded;
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
