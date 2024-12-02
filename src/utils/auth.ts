import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
  sub: string;
  email: string;
  exp: number;
}

export const auth = {
  setToken(token: string) {
    localStorage.setItem('auth_token', token);
    // Dispatch an event to notify AuthContext
    window.dispatchEvent(new Event('auth-change'));
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  removeToken() {
    localStorage.removeItem('auth_token');
    // Dispatch an event to notify AuthContext
    window.dispatchEvent(new Event('auth-change'));
  },

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      // In our mock implementation, any valid token is considered authenticated
      return token.startsWith('mock_token_');
    } catch {
      return false;
    }
  },

  getUserInfo(): { id: string; email: string } | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      // Extract email from mock token
      const parts = token.split('_');
      const email = parts[2];
      return {
        id: email,
        email: email,
      };
    } catch {
      return null;
    }
  },
};