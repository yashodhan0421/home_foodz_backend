import nodemailer from 'nodemailer';
import mailConfig from '../config/mailConfig';

export default async (mailData: any) => {
  const transporter = nodemailer.createTransport({
    server: mailConfig.server,
    host: mailConfig.host,
    port: mailConfig.port,
    ssl: mailConfig.ssl,
    auth: {
      user: mailConfig.user,
      pass: mailConfig.pass
    }
  });

  // send mail with defined transport object
  await transporter.sendMail(mailData);
};
