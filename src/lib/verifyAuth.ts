'use server';

import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

interface JWTPayload {
  exp: number;
  [key: string]: unknown;
}

export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) return true;

  try {
    const decoded = jwtDecode<JWTPayload>(token);

    if (!decoded.exp) {
      console.error('Token does not contain expiration (exp) claim');
      return true;
    }

    
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

export const isAuthenticatedServer = async (): Promise<boolean> => {
  const token = await getValidToken();
  return !!token;
};
