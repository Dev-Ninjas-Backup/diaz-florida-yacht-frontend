/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

export const getSpecifications = async ({ type, search, limit }: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/boats/specification/list?type=${type}&search=${search}&limit=${limit}`,
      {
        method: 'GET',
        next: {
          tags: ['SPECIFICATION'],
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
