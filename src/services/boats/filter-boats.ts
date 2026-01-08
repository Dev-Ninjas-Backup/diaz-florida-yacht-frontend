export interface FilterOptions {
  makes: string[];
  models: string[];
  years: number[];
  cities: string[];
  states: string[];
  classes: string[];
}

export interface FilteredBoatsResponse {
  success: boolean;
  message: string;
  data: any[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface FilterParams {
  page?: number;
  limit?: number;
  make?: string;
  model?: string;
  class?: string;
  buildYear?: number;
  buildYearStart?: number;
  buildYearEnd?: number;
  priceStart?: number;
  priceEnd?: number;
  lengthStart?: number;
  lengthEnd?: number;
  beamSizeStart?: number;
  beamSizeEnd?: number;
  enginesNumber?: number;
  headsNumber?: number;
  cabinsNumber?: number;
  location?: string;
}

export const getFilterOptions = async (): Promise<FilterOptions> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
  const res = await fetch(`${baseUrl}/boats/filter-options`, {
    method: 'GET',
    next: { tags: ['BOAT_FILTER_OPTIONS'] },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch filter options (${res.status})`);
  }

  const json = await res.json();
  return (
    json.data ?? {
      makes: [],
      models: [],
      years: [],
      cities: [],
      states: [],
      classes: [],
    }
  );
};

export const getFilteredBoats = async (
  filters: FilterParams,
): Promise<FilteredBoatsResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
  const queryParams = new URLSearchParams();

  // Add default pagination
  queryParams.append('page', String(filters.page ?? 1));
  queryParams.append('limit', String(filters.limit ?? 10));

  // Add other filters only if they have values
  Object.entries(filters).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== '' &&
      key !== 'page' &&
      key !== 'limit'
    ) {
      queryParams.append(key, String(value));
    }
  });

  const res = await fetch(`${baseUrl}/boats?${queryParams.toString()}`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch filtered boats (${res.status})`);
  }

  return await res.json();
};
