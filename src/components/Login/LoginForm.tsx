'use client';
import React from 'react';
import { FaUser } from 'react-icons/fa';
import { FormInput } from './FormInput';
import { PasswordInput } from './PasswordInput';
import { LOGIN_LABELS, LOGIN_PLACEHOLDERS } from './constants';
import type { LoginFormProps } from './types';
import { forgotPasswordService, resetPasswordService } from '@/services/auth';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

export const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  isSubmitting,
  showPassword,
  onInputChange,
  onSubmit,
  onTogglePassword,
}) => {
  const handleForgotPassword = async () => {
    const { value: email } = await Swal.fire({
      title: 'Forgot Password',
      input: 'email',
      inputLabel: 'Enter your email address',
      inputPlaceholder: 'you@example.com',
      showCancelButton: true,
      confirmButtonText: 'Send OTP',
      confirmButtonColor: '#3b82f6',
      inputValidator: (value) => {
        if (!value) return 'Please enter your email!';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email!';
        return null;
      },
    });

    if (!email) return;

    Swal.fire({
      title: 'Sending OTP...',
      html: 'Please wait while we send the OTP to your email.',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading(),
    });

    const result = await forgotPasswordService(email);
    Swal.close();

    if (!result.success) {
      toast.error(result.message || 'Failed to send OTP');
      return;
    }

    toast.success('OTP sent to your email!');

    const { value: formValues } = await Swal.fire({
      title: 'Reset Password',
      html: `
        <div style="text-align:left;margin-top:16px">
          <label style="display:block;font-weight:500;margin-bottom:6px;color:#374151">OTP Code</label>
          <input id="swal-otp" type="text" placeholder="Enter OTP"
            style="width:100%;padding:10px;border:1px solid #d1d5db;border-radius:8px;margin-bottom:14px;font-size:14px" autocomplete="off"/>
          <label style="display:block;font-weight:500;margin-bottom:6px;color:#374151">New Password</label>
          <input id="swal-password" type="password" placeholder="Enter new password"
            style="width:100%;padding:10px;border:1px solid #d1d5db;border-radius:8px;font-size:14px" autocomplete="new-password"/>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Reset Password',
      confirmButtonColor: '#3b82f6',
      focusConfirm: false,
      preConfirm: () => {
        const otp = (document.getElementById('swal-otp') as HTMLInputElement)?.value;
        const newPassword = (document.getElementById('swal-password') as HTMLInputElement)?.value;
        if (!otp) { Swal.showValidationMessage('Please enter the OTP!'); return false; }
        if (!newPassword || newPassword.length < 6) { Swal.showValidationMessage('Password must be at least 6 characters!'); return false; }
        return { otp, newPassword };
      },
    });

    if (!formValues) return;

    const resetResult = await resetPasswordService(email, formValues.otp, formValues.newPassword);

    if (resetResult.success) {
      await Swal.fire({
        icon: 'success',
        title: 'Password Reset!',
        text: 'Your password has been reset. Please login with your new password.',
        confirmButtonColor: '#3b82f6',
      });
    } else {
      toast.error(resetResult.message || 'Failed to reset password');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <FormInput
        id="email"
        name="email"
        type="email"
        label={LOGIN_LABELS.email}
        value={formData.email}
        placeholder={LOGIN_PLACEHOLDERS.email}
        onChange={onInputChange}
        icon={<FaUser className="w-4 h-4 text-blue-500" />}
        required
      />

      <PasswordInput
        id="password"
        name="password"
        label={LOGIN_LABELS.password}
        value={formData.password}
        placeholder={LOGIN_PLACEHOLDERS.password}
        showPassword={showPassword}
        onTogglePassword={onTogglePassword}
        onChange={onInputChange}
        required
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={onInputChange}
            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
          />
          <span className="ml-2 text-sm text-gray-700">{LOGIN_LABELS.rememberMe}</span>
        </label>
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors"
        >
          {LOGIN_LABELS.forgotPassword}
        </button>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? LOGIN_LABELS.loggingIn : LOGIN_LABELS.loginButton}
      </button>

      <p className="text-center text-sm text-gray-700 mt-6">
        {LOGIN_LABELS.dontHaveAccount}{' '}
        <a href="/register-boat" className="text-blue-500 hover:text-blue-600 font-semibold transition-colors">
          {LOGIN_LABELS.register}
        </a>
      </p>
    </form>
  );
};
