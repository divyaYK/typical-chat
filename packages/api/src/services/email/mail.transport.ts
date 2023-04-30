/* eslint-disable class-methods-use-this */
import sendGridMail from "@sendgrid/mail";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { GraphQLError } from "graphql";
import { config } from "config";
import { logger } from "shared/helpers/logger";
import httpStatus from "http-status";

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
      throw new GraphQLError("Error sending mail", {
        extensions: {
          code: httpStatus.BAD_REQUEST,
        },
      });
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
      throw new GraphQLError("Error sending mail", {
        extensions: {
          code: httpStatus.BAD_REQUEST,
        },
      });
    }
  }
}

export const mailTransport: MailTransport = new MailTransport();
