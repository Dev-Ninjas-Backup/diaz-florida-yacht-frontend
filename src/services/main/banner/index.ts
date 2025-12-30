import { Banner } from '@/types/banner-types';

export const getBanner = async (
  page: string,
  site: string,
): Promise<Banner | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
    const res = await fetch(
      `${baseUrl}/banners/single?page=${page}&site=${site}`,
      {
        method: 'GET',
        next: {
          tags: ['BANNER'],
        },
      },
    );

    if (!res.ok) {
      console.error(`Banner fetch failed with status: ${res.status}`);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    console.error('Banner fetch error:', error);
    return null;
  }
};
