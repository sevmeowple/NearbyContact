import nodemailer from "nodemailer";
import {log} from "../util/log.ts";
import {domain, smtpPORT} from "../config.ts";

const transporter = nodemailer.createTransport({
    host: '127.0.0.1',
    port: smtpPORT,
    secure: false,
});

async function sendEmail(to: string, subject: string, text: string, html?: string) {
    const mailOptions = {
        from: ' "NearByContact" < noreply@NearByContact.com >',
        to,
        subject,
        text,
        html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        log('INFO', 'Message sent:' + info.messageId);
    } catch (error) {
        log('WARN', 'Error occurred while sending email: ' + error);
    }
}

export async function sendVerificationEmail(to: string, token: string) {
    const verificationUrl = `https://${domain}/verify-email?token=${token}`;
    await sendEmail(
        to,
        'Email Verification',
        `Please verify your email by clicking the following link: ${verificationUrl}`,
        `<p>Please verify your email by clicking the following link: <a href="${verificationUrl}">${verificationUrl}</a></p>`
    );
}