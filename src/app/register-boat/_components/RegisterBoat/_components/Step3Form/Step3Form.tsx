'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  countryOptions,
  getCitiesForState,
  US_STATES,
} from '@/lib/utils/register-boats-select-options';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput } from '../FormFields/FormInput';
import { FormSelect } from '../FormFields/FormSelect';

const Step3Form = () => {
  return (
    <div className="space-y-6 mt-10">
      <div>
        <h3 className="text-lg font-semibold mb-4">Your Contact Details</h3>

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

        <div className="mt-5">
          <FormSelect
            name="country"
            label="Country"
            options={countryOptions}
            placeholder="Select"
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <StateFieldStep3 />
          <CityFieldStep3 />
          <FormInput name="zip" label="Zip" placeholder="Type here" required />
        </div>
      </div>

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

function StateFieldStep3() {
  const { watch, setValue, clearErrors, formState } = useFormContext();
  const { errors } = formState;
  const selectedState = watch('state');

  const [stateOptions, setStateOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [showCustomState, setShowCustomState] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    try {
      const opts = US_STATES?.map((s: { code: string; name: string }) => ({
        value: s.name,
        label: s.name,
      }));
      if (mounted) {
        setStateOptions(opts);
      }
    } catch (err) {
      console.error('Failed to load states:', err);
    } finally {
      if (mounted) setLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedState || loading) return;
    const found = stateOptions.some((o) => o.value === selectedState);
    if (!found) setShowCustomState(true);
  }, [selectedState, stateOptions, loading]);

  const error = errors['state'];
  const fieldError = error as unknown as { message?: string } | undefined;

  if (showCustomState) {
    return (
      <div>
        <Label htmlFor="state">State *</Label>
        <Input
          id="state"
          placeholder="Enter state"
          value={selectedState || ''}
          onChange={(e) => {
            setValue('state', e.target.value);
            clearErrors('state');
          }}
          className="w-full bg-white rounded-[12px] border-none shadow-none"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            setShowCustomState(false);
            setValue('state', '');
          }}
          className="text-xs text-blue-600 hover:text-blue-700 p-0 h-auto mt-1"
        >
          Choose from list instead
        </Button>
        {fieldError?.message && (
          <p className="text-red-500 text-sm mt-1">{fieldError.message}</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <FormSelect
        name="state"
        label="State"
        options={stateOptions}
        placeholder="Select"
        required
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setShowCustomState(true)}
        className="text-xs text-blue-600 hover:text-blue-700 p-0 h-auto mt-1"
      >
        Enter custom state
      </Button>
      {fieldError?.message && (
        <p className="text-red-500 text-sm mt-1">{fieldError.message}</p>
      )}
    </div>
  );
}

function CityFieldStep3() {
  const { watch, setValue, clearErrors, formState } = useFormContext();
  const { errors } = formState;
  const selectedState = watch('state');
  const selectedCity = watch('city');

  const [cityOptions, setCityOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [showCustomCity, setShowCustomCity] = useState(false);

  useEffect(() => {
    let mounted = true;
    setShowCustomCity(false);
    setCityOptions([]);
    setValue('city', '');

    if (!selectedState) return;

    try {
      const list = getCitiesForState(selectedState);
      if (!mounted) return;
      const opts = list?.map((c) => ({ value: c.name, label: c.name }));
      setCityOptions(opts);
    } catch (error) {
      console.error('Failed to load cities:', error);
    }

    return () => {
      mounted = false;
    };
  }, [selectedState, setValue]);

  useEffect(() => {
    if (!selectedCity) return;
    const found = cityOptions.some((o) => o.value === selectedCity);
    if (!found) setShowCustomCity(true);
  }, [selectedCity, cityOptions]);

  const error = errors['city'];
  const fieldError = error as unknown as { message?: string } | undefined;

  if (showCustomCity) {
    return (
      <div>
        <Label htmlFor="city">City *</Label>
        <Input
          id="city"
          placeholder="Enter city"
          value={selectedCity || ''}
          onChange={(e) => {
            setValue('city', e.target.value);
            clearErrors('city');
          }}
          className="w-full bg-white rounded-[12px] border-none shadow-none"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            setShowCustomCity(false);
            setValue('city', '');
          }}
          className="text-xs text-blue-600 hover:text-blue-700 p-0 h-auto mt-1"
        >
          Choose from list instead
        </Button>
        {fieldError?.message && (
          <p className="text-red-500 text-sm mt-1">{fieldError.message}</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <FormSelect
        name="city"
        label="City"
        options={cityOptions}
        placeholder="Select"
        required
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setShowCustomCity(true)}
        className="text-xs text-blue-600 hover:text-blue-700 p-0 h-auto mt-1"
      >
        Enter custom city
      </Button>
      {fieldError?.message && (
        <p className="text-red-500 text-sm mt-1">{fieldError.message}</p>
      )}
    </div>
  );
}
