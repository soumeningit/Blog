const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
    try {
        console.log("Inside Auth Middleware");
        // console.log("Request Body in auth ", req.body);
        // console.log("Request ", req.headers);
        const token = req?.cookies?.token
            || req?.body?.token ||
            (req.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : null);

        // console.log("Token ", token);
        if (!token) {
            return res.status(401)
                .json({
                    success: false,
                    message: "Token is missing"
                })
        }

        try {
            const verifiedToken = jwt.verify(token, process.env.JWT_PRIVATEKEY);
            req.user = verifiedToken;
            next();
        } catch (error) {
            console.log("Invalid token")
            return res.status(401)
                .json({
                    success: false,
                    message: "Invalid token"
                })
        }

    } catch (error) {
        console.log("Something went wrong, Please try after some time")
        console.log(error)
        return res.status(500)
            .json({
                success: false,
                message: "Not authorised"
            })
    }
};
exports.isUser = async (req, res, next) => {
    try {
        const role = req.user.accountType;
        console.log("Role ", role)
        if (role !== "user") {
            return res.status(400)
                .json({
                    success: false,
                    message: "Not authorised"
                })
        }
        next();
    } catch (error) {
        console.log("Something went wrong, Please try after some time")
        console.log(error)
        return res.status(500)
            .json({
                success: false,
                message: "Not authorised"
            })
    }
};

exports.isAuthor = async (req, res, next) => {
    try {
        console.log("Inside isAuthor")
        const role = req.user.accountType;
        console.log("Role ", role)
        if (role !== "author") {
            return res.status(400)
                .json({
                    success: false,
                    message: "Not authorised"
                })
        }
        next();
    } catch (error) {
        console.log("Something went wrong, Please try after some time")
        console.log(error)
        return res.status(500)
            .json({
                success: false,
                message: "Not authorised"
            })
    }
};

exports.isEmployee = async (req, res, next) => {
    try {
        const role = req.user.accountType;
        console.log("Role ", role)
        if (role !== "employee") {
            return res.status(400)
                .json({
                    success: false,
                    message: "Not authorised"
                })
        }
        next();
    } catch (error) {
        console.log("Something went wrong, Please try after some time")
        console.log(error)
        return res.status(500)
            .json({
                success: false,
                message: "Not authorised"
            })
    }
};

exports.isAdmin = async (req, res, next) => {
    try {
        const role = req.user.accountType;
        console.log("Role ", role)
        if (role !== "admin") {
            return res.status(400)
                .json({
                    success: false,
                    message: "Not authorised"
                })
        }
        next();
    } catch (error) {
        console.log("Something went wrong, Please try after some time")
        console.log(error)
        return res.status(500)
            .json({
                success: false,
                message: "Not authorised"
            })
    }
};