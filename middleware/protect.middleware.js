// protect middleware
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { UnauthenticatedError } = require("../errors");

const protect = async (req, res, next) => {
    let token;
    
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        throw new UnauthenticatedError("Not authorized to access this route");
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // const user = await User.findById( decoded.id )

        if (!user) {
        throw new UnauthenticatedError("No user found with this id");
        }
        req.user = { userId: decoded.id, name: decoded.name };
        next();
    } catch (error) {
        throw new UnauthenticatedError("Not authorized to access this route");
    }


};

module.exports = protect;
