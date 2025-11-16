'use server';

import { getValidToken } from '@/lib/verifyAuth';
import { cookies } from 'next/headers';

/**
 * Authentication Service
 * Server-side authentication operations using Next.js server actions
 */

// ============================================================================
// Types
// ============================================================================

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  [key: string]: unknown;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    user?: User;
    token?: string;
    [key: string]: unknown;
  };
  message?: string;
  [key: string]: unknown;
}

export interface AuthError {
  success: false;
  message: string;
  error?: string;
}

// ============================================================================
// Login Service
// ============================================================================

/**
 * Authenticate user with email and password
 * Sets accessToken and user cookies on success
 * @param data - Login credentials
 * @returns Login response or error
 */
export const loginService = async (
  data: LoginRequest,
): Promise<LoginResponse | AuthError> => {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Handle non-200 responses
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || 'Login failed',
        error: `HTTP ${res.status}`,
      };
    }

    const responseData = (await res.json()) as LoginResponse;
    const token = responseData.data?.token as string | undefined;
    const user = responseData.data?.user;

    if (responseData.success && token && user) {
      // Set httpOnly cookie for token (secure, not accessible via JS)
      cookieStore.set('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      // Set user cookie WITHOUT httpOnly so client can check auth status
      cookieStore.set('user', JSON.stringify(user), {
        httpOnly: false, // Client-side accessible for auth checks
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      // Set a simple auth flag for client-side checks
      cookieStore.set('isAuthenticated', 'true', {
        httpOnly: false, // Client-side accessible
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return responseData;
    }

    return {
      success: false,
      message: responseData.message || 'Login failed - no token received',
    };
  } catch (error) {
    console.error('Login service error:', error);
    const message =
      error instanceof Error ? error.message : 'Network error during login';
    return {
      success: false,
      message,
      error: 'NETWORK_ERROR',
    };
  }
};

// ============================================================================
// Get User Profile
// ============================================================================

/**
 * Fetch the authenticated user's profile
 * Requires valid accessToken in cookies
 * @returns User profile data or error
 */
export const getUserProfile = async (): Promise<
  { success: true; data: User } | AuthError
> => {
  try {
    const token = await getValidToken();

    if (!token) {
      return {
        success: false,
        message: 'No authentication token found',
        error: 'NO_TOKEN',
      };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/profile`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        next: {
          tags: ['USER_PROFILE'],
        },
      },
    );

    if (!res.ok) {
      return {
        success: false,
        message: `Failed to fetch profile: HTTP ${res.status}`,
        error: 'FETCH_ERROR',
      };
    }

    const data = await res.json();

    if (data.success && data.data) {
      return { success: true, data: data.data };
    }

    return {
      success: false,
      message: data.message || 'Failed to fetch profile',
    };
  } catch (error) {
    console.error('Get user profile error:', error);
    const message =
      error instanceof Error ? error.message : 'Network error fetching profile';
    return {
      success: false,
      message,
      error: 'NETWORK_ERROR',
    };
  }
};

// ============================================================================
// Logout Service
// ============================================================================

/**
 * Clear authentication cookies and log out user
 */
export const logoutService = async (): Promise<{ success: boolean }> => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('user');
    cookieStore.delete('isAuthenticated');
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false };
  }
};
