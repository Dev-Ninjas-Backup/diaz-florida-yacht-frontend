export const getAllBoats = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API;

    const res = await fetch(`${baseUrl}/boats?page=${page}&limit=${limit}`, {
      method: 'GET',
      next: {
        tags: ['ALL_BOATS'],
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    console.error('Boat Gets Error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch boats');
  }
};
