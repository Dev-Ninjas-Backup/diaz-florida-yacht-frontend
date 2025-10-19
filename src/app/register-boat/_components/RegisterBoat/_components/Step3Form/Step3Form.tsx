import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useFormContext } from "react-hook-form";

const cities = [
  "Los Angeles",
  "San Francisco",
  "New York City",
  "Houston",
  "Dallas",
  "Miami",
  "Chicago",
  "Seattle",
  "Atlanta",
  "Phoenix",
];

const states = [
  "California",
  "New York",
  "Texas",
  "Florida",
  "Illinois",
  "Washington",
  "Ohio",
  "Georgia",
  "Pennsylvania",
  "Arizona",
];

const Step3Form = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
  } = useFormContext();

  const country = watch("country");
  const state = watch("state");
  const city = watch("city");
  const handleSelectChange = (fieldName: string, value: string) => {
    setValue(fieldName, value);
    clearErrors(fieldName);
  };
  return (
    <div className="space-y-6 mt-10">
      {/* Your Contact Details */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Your Contact Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              placeholder="Type here"
              {...register("firstName")}
              className={`w-full bg-white rounded-[12px] border-none shadow-none`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message as string}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              placeholder="Type here"
              {...register("lastName")}
              className={`w-full bg-white rounded-[12px] border-none shadow-none`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="contactNumber">Contact Number *</Label>
            <Input
              id="contactNumber"
              placeholder="Type here"
              {...register("contactNumber")}
              className={`w-full bg-white rounded-[12px] border-none shadow-none`}
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contactNumber.message as string}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              placeholder="Type here"
              {...register("email")}
              className={`w-full bg-white rounded-[12px] border-none shadow-none`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>
        </div>
        <div className="mt-5">
          <Label htmlFor="country">Country *</Label>
          <Select
            value={country || ""}
            onValueChange={(value) => handleSelectChange("country", value)}
          >
            <SelectTrigger
              className={`w-full bg-white rounded-[12px] border-none shadow-none`}
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usa">United States</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message as string}
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {/* CITY SELECT */}
          <div>
            <Label htmlFor="city">City *</Label>
            <Select
              value={city || ""}
              onValueChange={(value) => handleSelectChange("city", value)}
            >
              <SelectTrigger className="w-full bg-white rounded-[12px] border-none shadow-none">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">
                {errors.city.message as string}
              </p>
            )}
          </div>

          {/* STATE SELECT */}
          <div>
            <Label htmlFor="state">State *</Label>
            <Select
              value={state || ""}
              onValueChange={(value) => handleSelectChange("state", value)}
            >
              <SelectTrigger className="w-full bg-white rounded-[12px] border-none shadow-none">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {states.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.state.message as string}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="zip">Zip *</Label>
            <Input
              id="zip"
              placeholder="Type here"
              {...register("zip")}
              className={`w-full bg-white rounded-[12px] border-none shadow-none`}
            />
            {errors.zip && (
              <p className="text-red-500 text-sm mt-1">
                {errors.zip.message as string}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Seller Account Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Seller Account Information
        </h3>
        <div>
          <Label htmlFor="username">Username *</Label>
          <Input
            id="username"
            placeholder="Type here"
            {...register("username")}
            className={`w-full bg-white rounded-[12px] border-none shadow-none`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message as string}
            </p>
          )}
        </div>

        <div className="mt-4">
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            placeholder="Type here"
            {...register("password")}
            className={`w-full bg-white rounded-[12px] border-none shadow-none`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message as string}
            </p>
          )}
        </div>

        <div className="mt-4">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Type here"
            {...register("confirmPassword")}
            className={`w-full bg-white rounded-[12px] border-none shadow-none`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step3Form;
