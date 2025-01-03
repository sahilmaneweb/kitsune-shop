const jwt = require('jsonwebtoken');

const authMiddleware = async(req, res, next) => {
    const { token } = req.headers;
    if(!token){
        return res.status(400).json({
            status : 400,
            success : false,
            message : "No token"
        })
    }

    try {
        const token_decode = jwt.verify(token,"SahilMane");
        req.body.userId = token_decode.id;
        req.body.userName = token_decode.userName;
        req.body.userEmail = token_decode.userEmail;
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status : 400,
            success : false,
            message : "Not authorized",
            error
        })
    }
}

module.exports = authMiddleware;