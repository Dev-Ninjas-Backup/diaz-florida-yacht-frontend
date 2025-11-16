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

export const createSubscription = async (data : any): Promise<any> => {

  try{
     const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/boats/seller/onboarding`,
      {
        method: 'POST',
        body: data,
      },
    );
    const responseData = await res.json();
    return responseData;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const confirmSubscriptionPayment = async (userId: string): Promise<any> => {
  try{
     const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/boats/seller/subscription-confirmation/${userId}`,
      {
        method: 'GET',
      },
    );
    const responseData = await res.json();
    return responseData;
  } catch (error: any) {
    return Error(error.message);
  }
};