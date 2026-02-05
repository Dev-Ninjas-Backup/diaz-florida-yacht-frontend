




import { useAuth } from '@/hooks/useAuth';
import { loginService } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { LOGIN_ERRORS, LOGIN_SUCCESS_MESSAGES } from './constants';
import type { LoginFormData } from './types';
import { validateLoginForm } from './validation';

interface UseLoginFormProps {
  onClose?: () => void;
}

export const useLoginForm = ({ onClose }: UseLoginFormProps = {}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { refreshUser } = useAuth();

  


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  


  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    const validation = validateLoginForm(formData.email, formData.password);
    if (!validation.isValid) {
      toast.error(validation.error || LOGIN_ERRORS.unexpectedError);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await loginService({
        email: formData.email,
        password: formData.password,
      });

      if ('success' in result && result.success) {
        await refreshUser();

        setTimeout(() => {
          router.push('/seller-dashboard/my-listing');
          setIsSubmitting(false);
          if (onClose) onClose();
        }, 1500);
      } else {
        
        setIsSubmitting(false);
        const errorMessage =
          'message' in result ? result.message : LOGIN_ERRORS.loginFailed;
        toast.error(errorMessage);
      }
    } catch (error) {
      setIsSubmitting(false);

      if (error instanceof Error) {
        toast.error(error.message || LOGIN_ERRORS.loginFailed);
      } else {
        toast.error(LOGIN_ERRORS.loginFailed);
      }

      console.error('Login error:', error);
    }
  };

  


  const handleGoogleLogin = () => {
    toast.info(LOGIN_SUCCESS_MESSAGES.googleComingSoon);
  };

  


  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      rememberMe: false,
    });
    setShowPassword(false);
    setIsSubmitting(false);
  };

  return {
    formData,
    showPassword,
    isSubmitting,
    handleInputChange,
    togglePassword,
    handleSubmit,
    handleGoogleLogin,
    resetForm,
  };
};
