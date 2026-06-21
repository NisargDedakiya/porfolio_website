import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Default configuration for Gmail SMTP
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "587");
    const user = process.env.SMTP_USER || "dedakiyanisarg@gmail.com";
    const pass = process.env.SMTP_PASS;

    // Log received submission in server terminal logs
    console.log(`[Contact Form API] Message received from Name: ${name}, Email: ${email}, Subject: ${subject}`);

    // Fallback logic when SMTP_PASS is missing to avoid breaking client-side testing before variables are configured
    if (!pass) {
      console.warn("SMTP_PASS environment variable is missing. Bypassing email transmission (Simulated success).");
      return NextResponse.json({
        success: true,
        mocked: true,
        message: "Message logged successfully (configure SMTP_PASS in .env.local to send actual emails)"
      });
    }

    // Create SMTP transport transporter
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
    });

    // Setup email headers and text templates
    const mailOptions = {
      from: `"${name}" <${user}>`, // Sent via authenticated address to bypass sender domain authorization blocks
      to: "dedakiyanisarg@gmail.com",
      replyTo: email,
      subject: `[Portfolio Message] ${subject || "New Collaboration Inquiry"}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 24px; background-color: #0b1220; color: #ffffff; border-radius: 12px; border: 1px solid rgba(255, 77, 77, 0.15); max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FF4D4D; font-size: 18px; margin-top: 0; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px;">
            New Connection Logged
          </h2>
          <div style="margin-bottom: 16px;">
            <span style="color: rgba(255,255,255,0.4); font-size: 10px; text-transform: uppercase; display: block; margin-bottom: 4px;">Sender Name</span>
            <strong style="color: #ffffff; font-size: 14px;">${name}</strong>
          </div>
          <div style="margin-bottom: 16px;">
            <span style="color: rgba(255,255,255,0.4); font-size: 10px; text-transform: uppercase; display: block; margin-bottom: 4px;">Sender Email</span>
            <a href="mailto:${email}" style="color: #3B82F6; font-size: 14px; text-decoration: none;">${email}</a>
          </div>
          <div style="margin-bottom: 24px;">
            <span style="color: rgba(255,255,255,0.4); font-size: 10px; text-transform: uppercase; display: block; margin-bottom: 4px;">Subject</span>
            <span style="color: #ffffff; font-size: 14px;">${subject || "N/A"}</span>
          </div>
          <div style="background-color: rgba(17, 24, 39, 0.6); border: 1px solid rgba(255,255,255,0.05); padding: 16px; border-radius: 8px; border-left: 4px solid #FF4D4D;">
            <span style="color: rgba(255,255,255,0.4); font-size: 9px; text-transform: uppercase; display: block; margin-bottom: 8px;">Message Content</span>
            <p style="margin: 0; color: rgba(255,255,255,0.9); font-size: 13px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    };

    // Deliver email securely
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Nodemailer transmission failure:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process email dispatch." },
      { status: 500 }
    );
  }
}
