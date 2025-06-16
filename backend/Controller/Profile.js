const User = require("../DataBase/User");
const Content = require("../DataBase/Content");
const Profile = require("../DataBase/Profile");
const { cloudinaryConnect } = require("../Config/clodinaryConfig");
const { uploadFileToCloudinary } = require("../Utils/fileUploader");

exports.getBookMarkedItems = async (req, res) => {
    try {
        console.log("INSIDE GET BOOKMARKED ITEMS");
        const { userId } = req.query;
        console.log("USER ID", userId);
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User Id is required"
            });
        }
        const user_id = req.user.id;
        console.log("USER_ID", user_id);
        if (userId !== userId) {
            return res.status(400).json({
                success: false,
                message: "Not Authorized"
            });
        }

        const isUser = await User.findById({ _id: userId }).populate({
            path: "additionalDetails"
        })
        if (!isUser) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        console.log("IS USER", isUser);
        const bookmarks = isUser.bookmarks;
        console.log("BOOKMARKS", bookmarks);

        const bookmarkedItems = [];
        for (let bookmark of bookmarks) {
            const item = await Content.findById({ _id: bookmark });
            bookmarkedItems.push(item);
        }
        data = {
            bookmarks: bookmarkedItems,
            user: {
                firstName: isUser.firstName,
                lastName: isUser.lastName,
                email: isUser.email,
                accountType: isUser.accountType,
                additionalDetails: isUser.additionalDetails
            }
        }
        if (bookmarkedItems.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No bookmarks found",
                data
            });
        }

        console.log("BOOKMARKED ITEMS", bookmarkedItems);
        data = {
            bookmarks: bookmarkedItems,
            user: {
                firstName: isUser.firstName,
                lastName: isUser.lastName,
                email: isUser.email,
                accountType: isUser.accountType,
                additionalDetails: isUser.additionalDetails
            }
        }

        return res.status(200).json({
            success: true,
            message: "Bookmarks fetched successfully",
            data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

exports.updateImage = async (req, res) => {
    try {
        console.log("INSIDE UPDATE IMAGE");
        console.log("REQ BODY", req.body);
        const { userId } = req.body;
        const user_id = req.user.id;
        if (userId !== user_id) {
            return res.status(400).json({
                success: false,
                message: "Not Authorized"
            });
        }
        console.log("user id matched");
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User Id is required"
            });
        }
        console.log("req.files " + req.files.file);
        const file = req.files.file;
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "File is required"
            });
        }
        const user = await User.findById({ _id: userId });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        const profile = await Profile.findById({ _id: user.additionalDetails });
        if (!profile) {
            return res.status(400).json({
                success: false,
                message: "Profile not found"
            });
        }

        console.log("Profile " + profile);

        try {
            cloudinaryConnect();
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
        const cloudinaryResult = await uploadFileToCloudinary(file, process.env.CLOUD_FOLDER_NAME, 200, 80);
        console.log("CLOUDINARY RESULT", cloudinaryResult);
        user.image = cloudinaryResult.secure_url;
        profile.profilePicture = cloudinaryResult.secure_url;
        const updatedUser = await user.save();
        if (!updatedUser) {
            return res.status(400).json({
                success: false,
                message: "User not updated"
            });
        }
        console.log("UPDATED USER", updatedUser);
        const updatedProfile = await profile.save();
        if (!updatedProfile) {
            return res.status(400).json({
                success: false,
                message: "Profile not updated"
            });
        }
        console.log("UPDATED PROFILE", updatedProfile);
        return res.status(200).json({
            success: true,
            message: "Image uploaded successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        console.log("INSIDE UPDATE PROFILE");
        console.log("REQ BODY", req.body);
        const { userId, address, dialCode, mobileNumber, city, state, country, dob, gender, pincode, bio } = req.body;
        const user_id = req.user.id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User Id is required"
            });
        }
        if (userId !== user_id) {
            return res.status(400).json({
                success: false,
                message: "Not Authorized"
            });
        }
        const user = await User.findById({ _id: userId });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        const profile = await Profile.findById({ _id: user.additionalDetails });
        if (!profile) {
            return res.status(400).json({
                success: false,
                message: "Profile not found"
            });
        }
        const contact = dialCode + mobileNumber;
        console.log("CONTACT", contact);
        profile.address = address;
        profile.dob = dob;
        profile.countryCode = dialCode;
        profile.phoneNumber = contact;
        profile.city = city;
        profile.state = state;
        profile.country = country;
        profile.pincode = pincode;
        profile.gender = gender;
        profile.bio = bio;

        const updatedProfile = await profile.save();
        if (!updatedProfile) {
            return res.status(400).json({
                success: false,
                message: "Profile not updated"
            });
        }
        console.log("UPDATED PROFILE", updatedProfile);
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

exports.updateUserSocialLinks = async (req, res) => {
    try {
        console.log("INSIDE UPDATE SOCIAL LINKS");
        console.log("REQ BODY", req.body);
        const { userId, socialLinks } = req.body;
        const user_id = req.user.id;
        console.log("USER ID", userId);
        console.log("SOCIAL LINKS", socialLinks.Others.name);
        console.log("SOCIAL LINKS", socialLinks.Others.link);
        console.log("Social : " + JSON.stringify(socialLinks.Others));
        console.log("USER ID", user_id);
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User Id is required"
            });
        }
        if (userId !== user_id) {
            return res.status(400).json({
                success: false,
                message: "Not Authorized"
            });
        }
        const user = await User.findById({ _id: userId });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        const profile = await Profile.findById({ _id: user.additionalDetails });
        if (!profile) {
            return res.status(400).json({
                success: false,
                message: "Profile not found"
            });
        }
        console.log("PROFILE", profile);
        // profile.socialMedia = socialLinks;
        // const updatedProfile = await profile.save();
        // if (!updatedProfile) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Profile not updated"
        //     });
        // }

        profile.socialMedia.facebook = socialLinks.Facebook;
        profile.socialMedia.twitter = socialLinks.Twitter;
        profile.socialMedia.instagram = socialLinks.Instagram;
        profile.socialMedia.linkedin = socialLinks.LinkedIn;
        profile.socialMedia.github = socialLinks.GitHub;

        // Handle others array (if provided)
        if (socialLinks.Others && socialLinks.Others.length > 0) {
            profile.socialMedia.others = socialLinks.Others;
        }

        // Save the profile
        const updatedProfile = await profile.save();
        console.log("UPDATED PROFILE", updatedProfile);
        return res.status(200).json({
            success: true,
            message: "Social Links updated successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}