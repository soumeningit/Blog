const nodemailer = require("nodemailer");

const mailSender = async (senderName, email, title, body) => {
    try {
        console.log("Inside Mail Sender")
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSKEY,
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `${senderName}`, // sender address
            to: `${email}`, // list of receivers
            subject: `${title}`, // Subject line
            text: "Please Confirm", // plain text body
            html: `${body}`, // html body
        });
        console.log(info);

        return info;

    } catch (e) {
        console.log("Mail Can't Be Send Right Now")
        console.log(e)
        return null;
    }
}

module.exports = mailSender;