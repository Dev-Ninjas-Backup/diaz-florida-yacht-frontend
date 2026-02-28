'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getCitiesForState } from '@/lib/utils/register-boats-select-options';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormSelect } from '../FormFields/FormSelect';

export function CityField() {
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

    // Don't reset city if it already has a value (edit mode)
    const currentCity = watch('city');
    if (!currentCity) {
      setValue('city', '');
    }

    if (!selectedState) return;

    try {
      const list = getCitiesForState(selectedState);
      if (!mounted) return;
      const opts = list?.map((c) => ({ value: c.name, label: c.name }));
      setCityOptions(opts);

      // Check if current city is in the list
      if (currentCity) {
        const found = opts.some((o) => o.value === currentCity);
        if (!found) {
          setShowCustomCity(true);
        }
      }
    } catch (error) {
      console.error('Failed to load cities:', error);
    }

    return () => {
      mounted = false;
    };
  }, [selectedState, setValue, watch]);

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
