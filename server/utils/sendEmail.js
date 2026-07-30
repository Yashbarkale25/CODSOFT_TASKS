const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) {
    console.log("SMTP Error:", err);
  } else {
    console.log("✅ Brevo SMTP Connected");
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: `"Job Portal" <${process.env.SENDER_EMAIL}>`,
      to,
      subject,
      text,
    });

    console.log("✅ Email Sent");
    console.log("Message ID:", info.messageId);
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);
    console.log("Response:", info.response);

    return info;
  } catch (err) {
    console.log("❌ Send Mail Error:", err);
    throw err;
  }
};

module.exports = sendEmail;