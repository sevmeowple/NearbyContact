import nodemailer from 'nodemailer';
import { log } from '../util/log.ts';
import { smtpPORT } from '../config.ts';

const transporter = nodemailer.createTransport({
	host: '127.0.0.1',
	port: smtpPORT,
	secure: false
});

export async function sendEmail(to: string, subject: string, text: string, html?: string) {
	const mailOptions = {
		from: ' "NearByContact" < noreply@NearByContact.com >',
		to,
		subject,
		text,
		html
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		log('INFO', 'Message sent:' + info.messageId);
	} catch (error) {
		log('WARN', 'Error occurred while sending email: ' + error);
	}
}