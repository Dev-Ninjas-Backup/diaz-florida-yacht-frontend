import { cityOptions, countryOptions, stateOptions } from '@/lib/utils/register-boats-select-options';
import { FormInput } from '../FormFields/FormInput';
import { FormSelect } from '../FormFields/FormSelect';


const Step3Form = () => {


  return (
    <div className="space-y-6 mt-10">
      {/* Your Contact Details */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Your Contact Details</h3>

        {/* First Name & Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            name="firstName"
            label="First Name"
            placeholder="Type here"
            required
          />
          <FormInput
            name="lastName"
            label="Last Name"
            placeholder="Type here"
            required
          />
        </div>

        {/* Contact Number & Email */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <FormInput
            name="contactNumber"
            label="Contact Number"
            placeholder="Type here"
            type="tel"
            required
          />
          <FormInput
            name="email"
            label="Email"
            placeholder="Type here"
            type="email"
            required
          />
        </div>

        {/* Country */}
        <div className="mt-5">
          <FormSelect
            name="country"
            label="Country"
            options={countryOptions}
            placeholder="Select"
            required
          />
        </div>

        {/* City, State, Zip */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <FormSelect
            name="city"
            label="City"
            options={cityOptions}
            placeholder="Select"
            required
          />
          <FormSelect
            name="state"
            label="State"
            options={stateOptions}
            placeholder="Select"
            required
          />
          <FormInput name="zip" label="Zip" placeholder="Type here" required />
        </div>
      </div>

      {/* Seller Account Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Seller Account Information
        </h3>

        <div>
          <FormInput
            name="username"
            label="Username"
            placeholder="Type here"
            required
          />
        </div>

        <div className="mt-4">
          <FormInput
            name="password"
            label="Password"
            placeholder="Type here"
            type="password"
            required
          />
        </div>

        <div className="mt-4">
          <FormInput
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Type here"
            type="password"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default Step3Form;
