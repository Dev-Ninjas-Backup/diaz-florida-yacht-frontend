'use client';

import { getSpecifications } from '@/services/main/register-input';
import { useCallback, useEffect, useState } from 'react';

interface SpecificationParams {
  type: string;
  search?: string;
  limit?: number;
}

interface UseGetSpecificationsOptions {
  enabled?: boolean; // Auto-fetch on mount
  initialParams?: SpecificationParams;
}

interface UseGetSpecificationsReturn {
  data: string[] | null;
  loading: boolean;
  error: Error | null;
  refetch: (params?: SpecificationParams) => Promise<void>;
  setParams: (params: SpecificationParams) => void;
}

export const useGetSpecifications = (
  options: UseGetSpecificationsOptions = {},
): UseGetSpecificationsReturn => {
  const { enabled = true, initialParams } = options;

  const [data, setData] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [params, setParams] = useState<SpecificationParams | undefined>(
    initialParams,
  );

  const fetchSpecifications = useCallback(
    async (fetchParams?: SpecificationParams) => {
      const queryParams = fetchParams || params;

      if (!queryParams) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await getSpecifications({
          type: queryParams.type,
          search: queryParams.search || '',
          limit: queryParams.limit || 20,
        });

        console.log('Specification response:', response);
        // Check if response is an Error instance
        if (response instanceof Error) {
          throw response;
        }

        // Handle API response structure
        if (response?.items) {
          setData(response.items);
        } else if (Array.isArray(response)) {
        } else {
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err
            : new Error('Failed to fetch specifications');
        setError(errorMessage);
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [params],
  );

  useEffect(() => {
    if (enabled && params) {
      fetchSpecifications();
    }
  }, [enabled, params, fetchSpecifications]);

  const refetch = useCallback(
    async (newParams?: SpecificationParams) => {
      if (newParams) {
        setParams(newParams);
      }
      await fetchSpecifications(newParams);
    },
    [fetchSpecifications],
  );

  return {
    data,
    loading,
    error,
    refetch,
    setParams,
  };
};
