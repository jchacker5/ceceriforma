import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: process.env.SMTP_SECURE === "false" ? false : true, // true for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function sendContactGmail(data: ContactPayload) {
  const fromAddress = process.env.CONTACT_FROM!;
  const toAddress = process.env.CONTACT_TO!;

  const escaped = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const html = `
    <h2>New Contact Submission</h2>
    <p><strong>Name:</strong> ${escaped(data.name)}</p>
    <p><strong>Email:</strong> ${escaped(data.email)}</p>
    ${data.phone ? `<p><strong>Phone:</strong> ${escaped(data.phone)}</p>` : ""}
    <p><strong>Subject:</strong> ${escaped(data.subject)}</p>
    <p style="white-space:pre-wrap;"><strong>Message:</strong>\n${escaped(
      data.message
    )}</p>
  `;

  const text = `Name: ${data.name}\nEmail: ${data.email}\n${
    data.phone ? `Phone: ${data.phone}\n` : ""
  }Subject: ${data.subject}\nMessage:\n${data.message}`;

  await transporter.sendMail({
    from: `"Campaign Website" <${fromAddress}>`,
    to: toAddress,
    subject: `[Contact] ${data.subject}`,
    replyTo: data.email,
    html,
    text,
  });
}
