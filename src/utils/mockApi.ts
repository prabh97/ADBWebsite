import { jwtDecode } from 'jwt-decode';

// Simulated database
const users = new Map<string, { username: string; email: string; password: string }>();

// Mock token generation
function generateToken(email: string): string {
  return `mock_token_${Date.now()}_${email}`;
}

// Simulate sending an email
async function sendMockEmail(to: string, subject: string, content: string) {
  console.log('📧 Simulated Email:');
  console.log('To:', to);
  console.log('Subject:', subject);
  console.log('Content:', content);
  
  // Simulate email delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return true;
}

export const mockApi = {
  async register(data: { username: string; email: string; password: string }) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if email already exists
    if (users.has(data.email)) {
      throw new Error('Email already registered');
    }

    // Store user
    users.set(data.email, {
      username: data.username,
      email: data.email,
      password: data.password,
    });

    // Send welcome email
    await sendMockEmail(
      data.email,
      'Welcome to ADB Data Analytics Platform',
      `Dear ${data.username},\n\nThank you for registering!`
    );

    // Generate and return token
    const token = generateToken(data.email);
    return { token };
  },

  async login(data: { email: string; password: string }) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user exists
    const user = users.get(data.email);
    if (!user || user.password !== data.password) {
      throw new Error('Invalid email or password');
    }

    // Generate and return token
    const token = generateToken(data.email);
    return { token };
  },

  async forgotPassword(data: { email: string }) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user exists
    const user = users.get(data.email);
    if (!user) {
      // For security, we don't want to reveal if the email exists or not
      return;
    }

    // Generate reset token
    const resetToken = `reset_${Date.now()}`;

    // Send password reset email
    await sendMockEmail(
      data.email,
      'Reset Your Password',
      `Reset token: ${resetToken}`
    );
  },
};