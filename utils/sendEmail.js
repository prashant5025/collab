const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            service: process.env.SMTP_SERVICE,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD
            },
        });

        await transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: subject,
            text: text,
        })
        console.log('Email sent');
    }catch(error){
        console.log(error);
    }
}

module.exports = sendEmail;