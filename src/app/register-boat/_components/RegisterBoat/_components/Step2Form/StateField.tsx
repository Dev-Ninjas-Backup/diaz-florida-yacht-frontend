'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { US_STATES } from '@/lib/utils/register-boats-select-options';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormSelect } from '../FormFields/FormSelect';

export function StateField() {
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
      // Import the US_STATES from our data file
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
