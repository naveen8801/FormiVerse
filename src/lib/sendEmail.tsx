// @ts-ignore
import * as nodemailer from "nodemailer";
import { render } from "@react-email/render";
import WelcomeEmail from "./emailTemplates/WelcomeEmail";
import * as React from "react";

/**
 * Returns the email subject based on the type.
 *
 * @param {string} type - The type of email subject. Can be "WELCOME" or "NEW_RESPONSE".
 * @return {string} The email subject based on the type.
 */
const getEmailSubjectBasedOnType = (type: "WELCOME" | "NEW_RESPONSE") => {
  switch (type) {
    case "WELCOME":
      return "Welcome to FormiVerse 🚀";
    case "NEW_RESPONSE":
      return "New Response";
    default:
      return "";
  }
};

/**
 * Generates an email body based on the type provided.
 *
 * @param {any} data - the data object containing information for the email
 * @param {"WELCOME" | "NEW_RESPONSE"} type - the type of email to generate
 * @return {any} the email body corresponding to the type provided
 */
const getEmailBodyBasedOnType = (
  data: any,
  type: "WELCOME" | "NEW_RESPONSE"
): any => {
  switch (type) {
    case "WELCOME":
      const { name } = data;
      return render(<WelcomeEmail name={name} />);
    case "NEW_RESPONSE":
      return "New Response!";
    default:
      return "";
  }
};

const generateMailData = (emailPayload: any) => {
  const { receiverEmail, data, emailType } = emailPayload;

  if (!receiverEmail) {
    throw new Error("Invalid receiver email");
  }

  // Get email template based on emailType
  const emailHtml = getEmailBodyBasedOnType(data, emailType);

  // Get email subject based on emailType
  const subject = getEmailSubjectBasedOnType(emailType);

  const mailOptions = {
    from: { name: "FormiVerse", address: process.env.EMAIL },
    to: receiverEmail,
    html: emailHtml,
    subject: subject,
  };

  return { mailOptions };
};

const sendEmail = async (emailPayload: {
  receiverEmail: string;
  data: any;
  emailType: "WELCOME" | "NEW_RESPONSE";
}): Promise<any> => {
  try {
    const { receiverEmail, data, emailType } = emailPayload;
    if (!receiverEmail || !data || !emailType) {
      throw new Error(
        "Receiver's email, email type & data not passed correctly"
      );
    } else {
      let { mailOptions } = generateMailData(emailPayload);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      const mail = await transporter.sendMail(mailOptions);
      return { msg: "Email sent successfully" };
    }
  } catch (error) {
    return { error };
  }
};

export default sendEmail;
