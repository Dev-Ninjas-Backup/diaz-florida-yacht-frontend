'use server';

import { getValidToken } from '@/lib/verifyAuth';

type SellerQuery = {
  page?: number | string;
  limit?: number | string;
  search?: string;
  status?: string;
};

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
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return Error(msg);
  }
};

export const getSellerBoats = async ({
  page,
  limit,
  search,
  status,
}: SellerQuery) => {
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
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return Error(msg);
  }
};

export const getSellerInvoices = async ({
  page,
  limit,
  search,
  status,
}: SellerQuery) => {
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
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return Error(msg);
  }
};

export const getSellerLeads = async ({ page, limit, search }: SellerQuery) => {
  try {
    const params = new URLSearchParams();
    if (page) params.append('page', String(page));
    if (limit) params.append('limit', String(limit));
    if (search) params.append('search', search);
    params.append('source', 'FLORIDA');

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/contact?${params.toString()}`,
      {
        method: 'GET',
        next: {
          tags: ['SELLER_LEADS'],
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return Error(msg);
  }
};
