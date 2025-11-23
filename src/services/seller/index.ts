/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { getValidToken } from '@/lib/verifyAuth';

export const getSellerStats = async () => {
  try {
    const token = await getValidToken();
    console.log('Seller Service Token:', token);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/seller/stats`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ['SELLER_STATS'],
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSellerBoats = async ({ page, limit, search, status }: any) => {
  try {
    const token = await getValidToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/boats/seller/get-own-boats?page=${page}&limit=${limit}&search=${search}&status=${status}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ['SELLER_BOATS'],
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSellerInvoices = async ({
  page,
  limit,
  search,
  status,
}: any) => {
  try {
    const token = await getValidToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment/seller/invoices?page=${page}&limit=${limit}&search=${search}&status=${status}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ['SELLER_INVOICES'],
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
