import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../MailAdapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "7378357e874080",
    pass: "04e11dc10f87eb"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail ({subject, body}: SendMailData) {
      
  await transport.sendMail({
    from: 'Equipe feedget <oi@gmail.com',
    to: 'Ederlan Augusto <ederlanaugusto@hotmail.com>',
    //to: 'Diego Fernandes <diego.schell.f@hotmail.com>',
    subject,
    html: body
  })
  };
}