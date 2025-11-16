/**
 * Server-side Authentication Verification
 * Utilities for verifying JWT tokens on the server
 */

'use server';

import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

interface JWTPayload {
  exp: number;
  [key: string]: unknown;
}

/**
 * Check if a JWT token is expired
 * @param token - JWT token string
 * @returns true if expired or invalid, false if valid
 */
export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) return true;

  try {
    const decoded = jwtDecode<JWTPayload>(token);

    if (!decoded.exp) {
      console.error('Token does not contain expiration (exp) claim');
      return true;
    }

    // exp is in seconds, Date.now() is in milliseconds
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      console.warn('Token has expired');
    }

    return isExpired;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

/**
 * Get valid token from cookies
 * Returns token only if it exists and is not expired
 * @returns Valid token string or null
 */
export const getValidToken = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('accessToken');

    if (!tokenCookie?.value) {
      return null;
    }

    const token = tokenCookie.value;
    const expired = await isTokenExpired(token);

    if (expired) {
      // Token is expired, clean up cookie
      cookieStore.delete('accessToken');
      cookieStore.delete('user');
      return null;
    }

    return token;
  } catch (error) {
    console.error('Error getting valid token:', error);
    return null;
  }
};

/**
 * Check if user is authenticated (server-side)
 * @returns true if valid token exists, false otherwise
 */
export const isAuthenticatedServer = async (): Promise<boolean> => {
  const token = await getValidToken();
  return !!token;
};
