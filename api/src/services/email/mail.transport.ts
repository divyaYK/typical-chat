/* eslint-disable class-methods-use-this */
import sendGridMail from "@sendgrid/mail";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

import { config } from "config";
import { logger } from "helpers/logger";
import { BadRequestError } from "helpers/errorHandler";

interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
sendGridMail.setApiKey(config.SENDGRID_API_KEY!);

class MailTransport {
  private logger = logger;

  constructor() {
    this.logger.level = "MailTransport";
  }

  public async sendEmail(
    recipient: string,
    subject: string,
    body: string,
  ): Promise<void> {
    if (config.NODE_ENV === "development") {
      this.devMailHandler(recipient, subject, body);
    } else {
      this.prodMailHandler(recipient, subject, body);
    }
  }

  private async devMailHandler(
    recipient: string,
    subject: string,
    body: string,
  ) {
    const transporter: Mail = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: config.DEV_SENDER_EMAIL,
        pass: config.DEV_SENDER_EMAIL_PASSWORD,
      },
    });

    const mailOptions: IMailOptions = {
      from: `Typical Chat <${config.DEV_SENDER_EMAIL}>`,
      to: recipient,
      subject,
      html: body,
    };
    try {
      await transporter.sendMail(mailOptions);
      this.logger.info("Dev Env: Mail sent successfully");
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestError(err);
    }
  }

  private async prodMailHandler(
    recipient: string,
    subject: string,
    body: string,
  ) {
    const mailOptions: IMailOptions = {
      from: `Typical Chat <${config.SENDGRID_SENDER}>`,
      to: recipient,
      subject,
      html: body,
    };

    try {
      await sendGridMail.send(mailOptions);
      this.logger.info("Prod Env: Mail sent successfully");
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestError(err);
    }
  }
}

export const mailTransport: MailTransport = new MailTransport();
