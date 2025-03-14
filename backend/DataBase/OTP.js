const mongoose = require("mongoose")
const mailSender = require("../Utils/mailSender")

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expired: 5 * 60
    }
});

async function sendVerificationMail(email, otp) {
    try {
        console.log("inside sendVerificationMail " + "email " + email + " otp ", otp)
        const mail = await mailSender(email, "Verification mail", otp);
        console.log("Mail send succsessfully", mail);
    } catch (error) {
        console.log("Sending verification mail failed!");
        console.log(error);
        throw error;
    }
}

OTPSchema.pre("save", async function (next) {
    console.log("New document saved to database");

    // Only send an email when a new document is created
    if (this.isNew) {
        await sendVerificationMail(this.email, this.otp);
    }
    next();
})

// module.exports = mongoose.model("OTP", OTPSchema);

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;