const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 20000,
});

// Verify SMTP
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ SMTP Verify Error:");
    console.log(error);
  } else {
    console.log("✅ SMTP Server is Ready");
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    console.log("=================================");
    console.log("📧 Sending Email...");
    console.log("To:", to);

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    console.log("✅ Email Sent Successfully");
    console.log("Message ID:", info.messageId);
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);
    console.log("Response:", info.response);
    console.log("=================================");

    return info;
  } catch (error) {
    console.log("=================================");
    console.log("❌ Email Error");
    console.log(error);
    console.log("=================================");
    throw error;
  }
};

module.exports = sendEmail;