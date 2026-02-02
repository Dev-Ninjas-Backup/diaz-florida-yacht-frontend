'use server';

import { getValidToken } from '@/lib/verifyAuth';

export const createBoatListing = async (formData: FormData) => {
  try {
    const token = await getValidToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/boats/seller/create-listing`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return { success: false, message: msg };
  }
};

export const updateBoatListing = async (boatId: string, formData: FormData) => {
  try {
    const token = await getValidToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/boats/seller/update-listing/${boatId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return { success: false, message: msg };
  }
};


export const deleteBoatListing = async (boatId: string) => {
  try {
    const token = await getValidToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/admin/listings/${boatId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return { success: false, message: msg };
  }
};
  