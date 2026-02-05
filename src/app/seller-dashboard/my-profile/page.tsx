'use client';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  getProfile,
  updateProfile,
  changePassword,
} from '@/services/auth/profile';
import { toast } from 'sonner';


const formSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First Name is required' }),
    lastName: z.string().min(1, { message: 'Last Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string().optional(),
    country: z.string().min(1, { message: 'Country is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    zipCode: z
      .string()
      .min(5, { message: 'ZIP Code must be at least 5 digits' })
      .max(10),
    avatar: z.any().optional(),
    oldPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword || data.confirmPassword) {
        return data.newPassword === data.confirmPassword;
      }
      return true;
    },
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    },
  );

export type FormSchema = z.infer<typeof formSchema>;

const MyProfilePage = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoadingProfile(true);
        const response = await getProfile();
        if (response.success && response.data) {
          const user = response.data;
          const nameParts = user.name?.split(' ') || ['', ''];
          reset({
            firstName: nameParts[0] || '',
            lastName: nameParts.slice(1).join(' ') || '',
            email: user.email || '',
            phone: user.phone || '',
            country: user.country || '',
            city: user.city || '',
            state: user.state || '',
            zipCode: user.zip || '',
          });
          if (user.avatarUrl) {
            setAvatarPreview(user.avatarUrl);
          }
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [reset]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setAvatarPreview(preview);
      setValue('avatar', file);
    }
  };

  const onSubmitProfile = async (data: FormSchema) => {
    setIsSubmittingProfile(true);
    try {
      const formData = new FormData();
      formData.append('name', `${data.firstName} ${data.lastName}`);
      if (data.phone) formData.append('phone', data.phone);
      formData.append('country', data.country);
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('zip', data.zipCode);
      if (data.avatar) formData.append('image', data.avatar);

      const response = await updateProfile(formData);
      if (response.success) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error(response.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('An error occurred while updating profile');
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  const onSubmitPassword = async (data: FormSchema) => {
    if (!data.newPassword) {
      toast.error('Please enter a new password');
      return;
    }

    setIsSubmittingPassword(true);
    try {
      const response = await changePassword({
        password: data.oldPassword,
        newPassword: data.newPassword,
      });
      if (response.success) {
        toast.success('Password changed successfully!');
        setValue('oldPassword', '');
        setValue('newPassword', '');
        setValue('confirmPassword', '');
      } else {
        toast.error(response.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Password change error:', error);
      toast.error('An error occurred while changing password');
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="pb-28 flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="pb-28">
      <div className="space-y-8 bg-[#F4F4F4] p-4 rounded-[10px]">
        <h1 className="text-2xl font-semibold"> My Details</h1>

        
        <div className="bg-white border border-[#D9D9D9]/30 rounded-[10px] p-4 mt-6">
          <div className="flex items-center mb-6">
            <h2 className="text-sm md:text-base font-medium text-black">
              Profile Image
            </h2>
          </div>

          <div className="flex flex-row gap-5 items-center flex-wrap mb-6">
            <div className="relative w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              {avatarPreview ? (
                <Image
                  src={avatarPreview}
                  alt="Avatar Preview"
                  width={100}
                  height={100}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <Camera className="w-10 h-10 text-gray-400" />
              )}
            </div>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              {...register('avatar')}
              onChange={handleAvatarChange}
            />
            <div>
              <label
                htmlFor="avatar-upload"
                className="inline-flex items-center gap-2 bg-[#006EF0] hover:bg-[#005ACC] text-white px-4 py-2 rounded-md cursor-pointer text-sm font-medium"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                Upload Image
              </label>
              <p className="text-xs text-gray-400 mt-2">
                JPG, PNG or GIF. Max size 5MB.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm md:text-base font-medium text-black block mb-1">
                First Name *
              </label>
              <input
                type="text"
                placeholder="Sarah"
                {...register('firstName')}
                className="w-full p-3 rounded-md focus:ring-2 focus:ring-cyan-500 bg-gray-100"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm md:text-base font-medium text-black block mb-1">
                Last Name *
              </label>
              <input
                type="text"
                placeholder="Johnson"
                {...register('lastName')}
                className="w-full p-3 rounded-md focus:ring-2 focus:ring-cyan-500 bg-gray-100"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm md:text-base font-medium text-black block mb-1">
                Contact Number: *
              </label>
              <input
                type="text"
                placeholder="0123 456789"
                {...register('phone')}
                className="w-full p-3 rounded-md focus:ring-2 focus:ring-cyan-500 bg-gray-100"
              />
            </div>

            <div>
              <label className="text-sm md:text-base font-medium text-black block mb-1">
                Email *
              </label>
              <input
                type="email"
                placeholder="sarah.johnson@gmail.com"
                {...register('email')}
                disabled
                className="w-full p-3 rounded-md focus:ring-2 focus:ring-cyan-500 bg-gray-100"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-5">
            <div className="md:col-span-3">
              <label className="text-sm md:text-base font-medium text-black block mb-1">
                Country: *
              </label>
              <input
                type="text"
                placeholder="USA"
                {...register('country')}
                className="w-full p-3 rounded-md focus:ring-2 focus:ring-cyan-500 bg-gray-100"
              />
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm md:text-base font-medium text-black block mb-1">
                City: *
              </label>
              <input
                type="text"
                placeholder="Florida"
                {...register('city')}
                className="w-full p-3 rounded-md focus:ring-2 focus:ring-cyan-500 bg-gray-100"
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm md:text-base font-medium text-black block mb-1">
                State: *
              </label>
              <input
                type="text"
                placeholder="FL"
                {...register('state')}
                className="w-full p-3 rounded-md focus:ring-2 focus:ring-cyan-500 bg-gray-100"
              />
              {errors.state && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm md:text-base font-medium text-black block mb-1">
                Zip: *
              </label>
              <input
                type="text"
                placeholder="33478"
                {...register('zipCode')}
                className="w-full p-3 rounded-md focus:ring-2 focus:ring-cyan-500 bg-gray-100"
              />
              {errors.zipCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.zipCode.message}
                </p>
              )}
            </div>
          </div>
        </div>

        
        <div className="bg-white border border-[#D9D9D9]/30 rounded-[10px] p-4">
          <h2 className="text-sm md:text-base font-medium text-black mb-6">
            Change Password
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="text-sm md:text-base font-medium text-black block mb-1">
                Enter Old Password: *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter old password"
                  {...register('oldPassword')}
                  className="w-full p-3 rounded-md focus:ring-2 focus:ring-cyan-500 bg-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm md:text-base font-medium text-black block mb-1">
                New Password: *
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  {...register('newPassword')}
                  className="w-full p-3 rounded-md focus:ring-2 focus:ring-cyan-500 bg-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="text-sm md:text-base font-medium text-black block mb-1">
                Confirm Password: *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  {...register('confirmPassword')}
                  className="w-full p-3 rounded-md focus:ring-2 focus:ring-cyan-500 bg-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
        </div>

        
        <div className="flex justify-start mt-6">
          <Button
            onClick={handleSubmit((data) => {
              onSubmitProfile(data);
              if (data.newPassword) {
                onSubmitPassword(data);
              }
            })}
            disabled={isSubmittingProfile || isSubmittingPassword}
            className="bg-[#006EF0] hover:bg-[#005ACC] text-white px-8 py-3 rounded-md"
          >
            {isSubmittingProfile || isSubmittingPassword
              ? 'Saving...'
              : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
