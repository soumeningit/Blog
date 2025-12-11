const User = require("../database/User");

async function isUserExist(email) {
    try {
        const userData = await User.findOne({ email: email });
        if (!userData) {
            return {
                success: false,
                status: 404,
                message: "User does not exist",
                data: null
            }
        }

        return {
            success: true,
            status: 200,
            message: "User exists",
            data: userData
        }
    } catch (error) {
        return {
            success: false,
            status: 500,
            message: "Error checking user existence",
            error: error.message,
            data: null
        }
    }
}

async function checkUserRole(userId) {
    try {
        const userData = await User.findById(userId);
        if (!userData) {
            return {
                success: false,
                status: 404,
                message: "User not found",
                data: null
            }
        }
        return {
            success: true,
            status: 200,
            message: "User found",
            data: userData.role
        }
    } catch (error) {
        return {
            success: false,
            status: 500,
            message: "Error retrieving user role",
            error: error.message,
            data: null
        }
    }
}

module.exports = {
    isUserExist,
    checkUserRole
}