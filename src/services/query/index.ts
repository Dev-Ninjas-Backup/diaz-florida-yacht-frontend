import { SearchQueryData } from '@/types/search-query-types';

export const postAiQuery = async ({
  queryData,
}: {
  queryData: SearchQueryData;
}) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL;

    const res = await fetch(`${baseUrl}/florida_query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(queryData),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    console.error('AI Query Error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to process AI query');
  }
};
