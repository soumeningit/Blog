const OAuthUser = require("../database/OAuthUser");
const User = require("../database/User");
const UserProfile = require("../database/UserProfile");

async function signinWithOAuth(email, name, profilePicture, provider) {
    try {
        const userData = await User.findOne({ email: email });

        // log in with existing OAuth user
        if (userData && userData.isOAuthUser) {
            return {
                status: 200,
                success: true,
                message: "User already registered with OAuth",
                data: {
                    userId: userData._id,
                    email: userData.email,
                    name: userData.name,
                    role: userData.role
                }
            }
        }

        // register new OAuth user
        if (!userData) {
            const newUser = new User({
                name: name,
                email: email
            });
            const savedUser = await newUser.save();

            const oAuthUser = new OAuthUser({
                userId: savedUser._id,
                provider: provider,
                email: email,
                name: name,
                profilePicture: profilePicture
            });
            await oAuthUser.save();

            const userProfile = await UserProfile.create({
                userId: savedUser._id
            });
            savedUser.userProfile = userProfile._id;
            savedUser.isOAuthUser = true;
            savedUser.oAuthData = oAuthUser._id;
            const updatedUser = await savedUser.save();

            return {
                status: 200,
                success: true,
                message: "OAuth user registered successfully",
                data: {
                    userId: updatedUser._id,
                    email: updatedUser.email,
                    name: updatedUser.name,
                    role: updatedUser.role
                }
            }
        }

        // link OAuth to existing non-OAuth user
        if (userData && !userData.isOAuthUser) {

            const oAuthUser = new OAuthUser({
                userId: userData._id,
                provider: provider,
                email: userData.email,
                name: userData.name,
                profilePicture: profilePicture
            });
            const savedOAuthUser = await oAuthUser.save();

            userData.isOAuthUser = true;
            userData.oAuthData = savedOAuthUser._id;
            const updatedUser = await userData.save();

            return {
                status: 200,
                success: true,
                message: "OAuth linked to existing user successfully",
                data: {
                    userId: updatedUser._id,
                    email: updatedUser.email,
                    name: updatedUser.name,
                    role: updatedUser.role
                }
            }
        }


    } catch (error) {
        console.error("Error in signinWithOAuth:", error);
        return {
            status: 500,
            success: false,
            message: "Internal server error",
            data: null
        }
    }
}

module.exports = { signinWithOAuth };
