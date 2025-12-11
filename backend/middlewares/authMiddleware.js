const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
    console.log("Verifying token...");
    try {
        const token =
            req?.cookies?.token ||
            req?.body?.token ||
            (req?.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : null);

        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("error : " + error);
        return res.status(404).json({ message: "Invalid token" });
    }
}

const allowRolesForPostCreation = (req, res, next) => {
    const userRole = req?.user?.role;
    const allowedRoles = ["author", "admin"];
    if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
            role: userRole,
            upgradeToAuthor: true,
            message: "Access denied: To create posts, please upgrade your account to an author role."
        });
    }
    next();
};

const allowRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied"
            });
        }
        next();
    };
};

const isAuthor = (req, res, next) => {
    const userRole = req?.user?.role;
    if (userRole !== "author") {
        return res.status(403).json({ message: "Access denied: Author role required" });
    }

    next();
}

const isAdmin = (req, res, next) => {
    const userRole = req?.user?.role;
    if (userRole !== "admin") {
        return res.status(403).json({ message: "Access denied: Admin role required" });
    }

    next();
}

module.exports = {
    verifyToken,
    isAuthor,
    isAdmin,
    allowRoles,
    allowRolesForPostCreation
};