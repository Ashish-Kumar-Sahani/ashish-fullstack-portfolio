import nodemailer from "nodemailer";
const sendEmail = async (subject: string, html: string) => {
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    },
});
await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject,
    html,
});
};

export default sendEmail;