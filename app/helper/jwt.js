const jwt = require("jsonwebtoken");
const JWTSecretKey = process.env.JWT_SECRETS;

const isset = require("isset");

// =================================== Check user authentication = =================================== 
module.exports.isAuthenticate = (req, res, next) => {
    let token = req.headers.authorization;
    
    jwt.verify(token, JWTSecretKey, async (err, result) => {
        if (err) return res.status(200).json({ status: false, message: "Something is wrong in Authentication.Please try again.", isAuth: false, data: [] });
        if (result && isset(result.id)) {
            req.body.id = result.id;
            return next();
        }
        return res.status(200).json({ status: false, message: "Invalid token or expired!", isAuth: false, data: [] });
    });
}
