




import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetSpecifications } from '@/hooks/useGetSpecifications';
import { Loader2, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface DynamicFormSelectProps {
  name: string;
  label: string;
  type: string; 
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const DynamicFormSelect: React.FC<DynamicFormSelectProps> = ({
  name,
  label,
  type,
  placeholder = 'Select or type custom value',
  required = false,
  disabled = false,
  className = '',
}) => {
  const {
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const value = watch(name);
  const error = errors[name];

  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(20);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState('');

  
  const {
    data,
    loading,
    error: apiError,
    setParams,
  } = useGetSpecifications({
    enabled: true,
    initialParams: { type, search: '', limit: 20 },
  });
  console.log('Fetched specifications:', data);

  
  useEffect(() => {
    setParams({ type, search: searchQuery, limit });
  }, [searchQuery, limit, type, setParams]);

  const handleSelectChange = (newValue: string) => {
    if (newValue === '__custom__') {
      setShowCustomInput(true);
      return;
    }
    setValue(name, newValue);
    clearErrors(name);
    setShowCustomInput(false);
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCustomValue(newValue);
    setValue(name, newValue);
    clearErrors(name);
  };

  const handleLoadMore = () => {
    setLimit((prev) => prev + 20);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setLimit(20); 
  };

  
  useEffect(() => {
    if (value && data) {
      const isInOptions = data.some((item) => item === value || item === value);
      if (!isInOptions) {
        setShowCustomInput(true);
        setCustomValue(value);
      }
    }
  }, [value, data]);

  if (showCustomInput) {
    return (
      <div className={className}>
        <Label htmlFor={name}>
          {label} {required && '*'}
        </Label>
        <div className="space-y-2">
          <Input
            id={name}
            value={customValue}
            onChange={handleCustomInputChange}
            placeholder={`Enter custom ${label.toLowerCase()}`}
            disabled={disabled}
            className="w-full bg-white rounded-[12px] border-none shadow-none"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowCustomInput(false);
              setCustomValue('');
              setValue(name, '');
            }}
            className="text-xs text-blue-600 hover:text-blue-700 p-0 h-auto"
          >
            Choose from list instead
          </Button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-1">{error.message as string}</p>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <Label htmlFor={name}>
        {label} {required && '*'}
      </Label>
      <Select
        value={value || ''}
        onValueChange={handleSelectChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full bg-white rounded-[12px] border-none shadow-none">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          
          <div className="p-2 border-b sticky top-0 bg-white z-10">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder={`Search ${label.toLowerCase()}...`}
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-8 h-9"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          
          {loading && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
              <span className="ml-2 text-sm text-gray-500">Loading...</span>
            </div>
          )}

          
          {apiError && (
            <div className="px-2 py-4 text-center text-sm text-red-500">
              Failed to load options
            </div>
          )}

          
          {!loading && data && data.length > 0 && (
            <>
              {data?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}

              
              {data.length >= limit && (
                <div className="p-2 border-t sticky bottom-0 bg-white">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLoadMore();
                    }}
                    className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    Load 20 More
                  </Button>
                </div>
              )}
            </>
          )}

          
          {!loading && data && data.length === 0 && (
            <div className="px-2 py-4 text-center text-sm text-gray-500">
              No results found
            </div>
          )}

          
          <div className="p-2 border-t sticky bottom-0 bg-white">
            <SelectItem value="__custom__">
              <span className="text-blue-600 font-medium">
                + Enter custom {label.toLowerCase()}
              </span>
            </SelectItem>
          </div>
        </SelectContent>
      </Select>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message as string}</p>
      )}
    </div>
  );
};
