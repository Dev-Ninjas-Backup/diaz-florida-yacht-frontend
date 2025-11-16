/**
 * Social Login Buttons Component
 * OAuth provider login buttons (Google, Facebook, etc.)
 */

import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { LOGIN_LABELS } from './constants';

interface SocialLoginButtonsProps {
  onGoogleLogin: () => void;
}

export const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  onGoogleLogin,
}) => {
  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative px-4 bg-white">
          <span className="text-sm text-gray-500">
            {LOGIN_LABELS.orDivider}
          </span>
        </div>
      </div>

      {/* Google Login Button */}
      <button
        type="button"
        onClick={onGoogleLogin}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-3"
      >
        <FcGoogle className="w-5 h-5" />
        <span>{LOGIN_LABELS.continueWithGoogle}</span>
      </button>

      {/* Future: Add more social login buttons here */}
      {/* <button type="button" onClick={onFacebookLogin}>Facebook</button> */}
      {/* <button type="button" onClick={onAppleLogin}>Apple</button> */}
    </div>
  );
};
