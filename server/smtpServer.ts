import { SMTPServer } from 'smtp-server';
import {log} from "./util/log.ts";
import {smtpPORT} from "./config.ts";

const server = new SMTPServer({
    authOptional: true,
});

server.listen(smtpPORT, '127.0.0.1', () => {
    log('INFO', 'Private SMTP server is running on port'+ smtpPORT.toString());
});