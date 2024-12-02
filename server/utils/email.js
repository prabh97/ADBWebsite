import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendWelcomeEmail = async (email, username) => {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Welcome to ADB Data Analytics Platform',
    html: `
      <h1>Welcome to ADB Data Analytics Platform</h1>
      <p>Dear ${username},</p>
      <p>Thank you for registering with the ADB Data Analytics Platform.</p>
      <p>You can now log in and start managing your projects.</p>
    `,
  });
};

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  });
};