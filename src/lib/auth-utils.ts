/**
 * Client-side Authentication Utilities
 * Helper functions for managing authentication state on the client
 */

/**
 * Get token from cookies (client-side)
 */
export const getTokenFromCookies = (): string | null => {
  if (typeof window === 'undefined') return null;

  try {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith('accessToken='),
    );

    if (tokenCookie) {
      return tokenCookie.split('=')[1];
    }

    return null;
  } catch (error) {
    console.error('Error reading token from cookies:', error);
    return null;
  }
};

/**
 * Get user from cookies (client-side)
 */
export const getUserFromCookies = (): unknown | null => {
  if (typeof window === 'undefined') return null;

  try {
    const cookies = document.cookie.split(';');
    const userCookie = cookies.find((cookie) =>
      cookie.trim().startsWith('user='),
    );

    if (userCookie) {
      const userString = decodeURIComponent(userCookie.split('=')[1]);
      return JSON.parse(userString);
    }

    return null;
  } catch (error) {
    console.error('Error reading user from cookies:', error);
    return null;
  }
};

/**
 * Check if user is authenticated (client-side)
 * Checks for isAuthenticated flag set by server
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find((cookie) =>
      cookie.trim().startsWith('isAuthenticated='),
    );
    return authCookie?.split('=')[1] === 'true';
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

/**
 * Clear authentication cookies (client-side)
 */
export const clearAuthCookies = (): void => {
  if (typeof window === 'undefined') return;

  try {
    // Set cookies to expire immediately
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie =
      'isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Note: accessToken is httpOnly and can only be deleted server-side
  } catch (error) {
    console.error('Error clearing auth cookies:', error);
  }
};

/**
 * Check if token is expired (basic client-side check)
 */
export const isTokenExpiredClient = (token: string): boolean => {
  if (!token) return true;

  try {
    // Basic JWT structure check
    const parts = token.split('.');
    if (parts.length !== 3) return true;

    // Decode payload
    const payload = JSON.parse(atob(parts[1]));
    const exp = payload.exp;

    if (!exp) return true;

    // Check if expired (exp is in seconds, Date.now() is in milliseconds)
    return exp * 1000 < Date.now();
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
};
