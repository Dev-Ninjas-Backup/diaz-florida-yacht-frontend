"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, X, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ✅ Zod schema updated (profession removed)
const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().optional(),
    country: z.string().min(1, { message: "Country is required" }),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    zipCode: z
      .string()
      .min(5, { message: "ZIP Code must be at least 5 digits" })
      .max(10),
    subCategories: z.array(z.string().min(1)).optional(),
    portfolio: z.array(z.any()).optional(),
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
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type FormSchema = z.infer<typeof formSchema>;

const MyProfilePage = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subCategories: [""],
      portfolio: [],
    },
  });

  const onSubmit = (data: FormSchema) => {
    console.log("Form Data:", data);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setAvatarPreview(preview);
      setValue("avatar", file);
    }
  };

  return (
    <div className="pb-28">
      <form
        id="main-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 bg-[#F4F4F4] p-4 rounded-[10px]"
      >
        <h1 className="text-2xl font-semibold"> My Details</h1>

        {/* Profile Info */}
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
              {...register("avatar")}
              onChange={handleAvatarChange}
            />
            <div>
              <div className="flex items-center gap-3 mt-1">
                <label
                  htmlFor="avatar-upload"
                  className="text-primary font-medium cursor-pointer text-sm"
                >
                  Change Photo
                </label>
                {avatarPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setAvatarPreview(null);
                      setValue("avatar", null);
                    }}
                    className="text-red-500 w-6 h-6 p-1 bg-red-50 rounded-full border border-red-500 font-medium cursor-pointer text-sm flex items-center justify-center"
                  >
                    <X />
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-1">
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
                {...register("firstName")}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500"
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
                {...register("lastName")}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm md:text-base font-medium text-black block mb-1">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+1 (555) 123-4567"
                {...register("phone")}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="text-sm md:text-base font-medium text-black block mb-1">
                Email *
              </label>
              <input
                type="email"
                placeholder="sarah.johnson@gmail.com"
                {...register("email")}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-5">
            <div className="md:col-span-2">
              <label className="text-sm md:text-base font-medium text-black block mb-1">
                Country *
              </label>
              <input
                type="text"
                placeholder="Country"
                {...register("country")}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500"
              />
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm md:text-base font-medium text-black block mb-1">
                City *
              </label>
              <input
                type="text"
                placeholder="City"
                {...register("city")}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500"
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm md:text-base font-medium text-black block mb-1">
                State *
              </label>
              <select
                {...register("state")}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 bg-white"
              >
                <option value="">State</option>
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="TX">Texas</option>
              </select>
              {errors.state && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="text-sm md:text-base font-medium text-black block mb-1">
                ZIP Code *
              </label>
              <input
                type="text"
                placeholder="12345"
                {...register("zipCode")}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500"
              />
              {errors.zipCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.zipCode.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="bg-white border border-[#D9D9D9]/30 rounded-[10px] p-4 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Change Password
          </h2>

          {[
            { label: "Enter Old Password", name: "oldPassword" as const },
            { label: "Enter New Password", name: "newPassword" as const },
            { label: "Confirm New Password", name: "confirmPassword" as const },
          ].map((field) => (
            <div key={field.name} className="mt-4 first:mt-0">
              <label className="text-sm md:text-base font-medium text-black block mb-1">
                {field.label}: *
              </label>
              <div className="relative">
                <Input
                  className="pr-10 bg-[#F4F4F4] py-6"
                  type={showPassword ? "text" : "password"}
                  placeholder={"**********"}
                  {...register(field.name)}
                />
                <span
                  className="hover:cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye
                      size={18}
                      className="text-slate-400 absolute top-4 right-2"
                    />
                  ) : (
                    <EyeOff
                      size={18}
                      className="text-slate-400 absolute top-4 right-2"
                    />
                  )}
                </span>
              </div>
              {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[field.name]?.message?.toString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </form>

      <div className="flex justify-end mt-8">
        <Button type="submit" form="main-form" className="py-6 px-8">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default MyProfilePage;
