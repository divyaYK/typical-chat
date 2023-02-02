import { readFile } from "fs/promises";
import mjml2html from "mjml";
import { compile } from "handlebars";
import path from "path";

const verificationMailTemplate = path.join(__dirname, "/verificationMail.mjml");

export const verifyEmailTemplate = async (verificationLink: string) => {
  const mjmlContent = await readFile(verificationMailTemplate);
  const renderedContent = compile(mjmlContent.toString());
  const mjml = renderedContent({ verificationLink });
  const { html } = mjml2html(mjml);
  return html;
};
