import nodemailer from "nodemailer";
console.log(process.env.GMAIL_SECRET);

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_SECRET,
    pass: process.env.GOOGLE_SECRET,
  },
});

transporter
  .verify()
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

export default transporter;
