const jwt = require("jsonwebtoken");
const { signinWithOAuth } = require("../service/oauthService");

// This controller expects req.user to be set by Passport after Google OAuth
async function signInWithGoogle(req, res) {
    try {
        const googleProfile = req.user;
        if (!googleProfile) {
            return res.status(400).json({ error: "No Google profile found" });
        }

        console.log("Google Profile:", googleProfile);

        // Extract info from Google profile
        const email = googleProfile.emails?.[0]?.value;
        const name = googleProfile.displayName;
        const profilePic = googleProfile.photos?.[0]?.value || "";
        const googleId = googleProfile.id;
        const provider = "google";

        const response = await signinWithOAuth(email, name, profilePic, "google");
        console.log("OAuth Service Response:", response);

        if (!response.success) {
            return res.status(response.status).json({
                success: false,
                message: response.message,
                error: response.error || null
            });
        }

        const payload = {
            name: response.data.name,
            email: response.data.email,
            id: response.data.userId,
            role: response.data.role
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        const redirectURL = process.env.FRONTEND_URL;
        const url = `${redirectURL}/auth/oauth-success/verify?token=${token}&userId=${response.data.userId}&email=${encodeURIComponent(
            response.data.email
        )}&userName=${encodeURIComponent(name)}&role=${encodeURIComponent(response.data.role)}`;

        return res.redirect(url);

    } catch (error) {
        console.error("Error signing in with Google:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { signInWithGoogle };