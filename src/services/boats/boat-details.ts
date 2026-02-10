import { BoatDetail } from '@/types/boat-detail-types';

export const getBoatDetails = async (boatId: string): Promise<BoatDetail> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
    const res = await fetch(`${baseUrl}/boats/${boatId}/details`, {
      method: 'GET',
      next: {
        tags: ['BOAT_DETAILS'],
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const response = await res.json();
    return response.data;
  } catch (error: unknown) {
    console.error('Boat details fetch error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch boat details');
  }
};
