import { BoatDetail } from '@/types/boat-detail-types';

export const getBoatDetails = async (boatId: string): Promise<BoatDetail> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds
    
    const res = await fetch(`${baseUrl}/boats/${boatId}/details`, {
      method: 'GET',
      signal: controller.signal,
      next: {
        tags: ['BOAT_DETAILS'],
        revalidate: 0,
      },
    });
    
    clearTimeout(timeoutId);

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
