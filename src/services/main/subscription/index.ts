/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

// import { getValidToken } from '@/lib/verifyToken';
// import { revalidateTag } from 'next/cache';

export const getAllSubscription = async () => {
//   const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/subscription/plans`,
      {
        method: 'GET',
        next: {
          tags: ['SUBSCRIPTION'],
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const createSubscription = async (data): Promise<any> => {

  try{
     const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/boats/onboarding`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
    const responseData = await res.json();
    return responseData;
  } catch (error: any) {
    return Error(error.message);
  }
};

// export const createCategory = async (
//   categoryData: Partial<ICategoryFormData>,
// ): Promise<any> => {
//   const token = await getValidToken();

//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/categories`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(categoryData),
//     });

//     revalidateTag('CATEGORY');
//     const result = await res.json();

//     return result;
//   } catch (error: any) {
//     return Error(error);
//   }
// };

// export const deleteCategory = async (categoryId: string): Promise<any> => {
//   const token = await getValidToken();

//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/categories/${categoryId}`,
//       {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );
//     revalidateTag('CATEGORY');
//     return res.json();
//   } catch (error: any) {
//     return Error(error);
//   }
// };
