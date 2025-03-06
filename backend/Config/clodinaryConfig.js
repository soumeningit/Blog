const cloudinary = require('cloudinary').v2;

exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET,
        }).then(() => {
            console.log("Cloudinary Connected Successfully");
        });
    } catch (error) {
        console.log("Cloudinary Connection Error : " + error);
    }
}