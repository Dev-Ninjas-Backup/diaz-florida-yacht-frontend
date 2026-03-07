/* eslint-disable @typescript-eslint/no-explicit-any */

export const createSellerInfo = async (data: {
  name: string;
  phone: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  username: string;
  password: string;
}): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/boats/seller/onboarding/seller-info`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    const responseData = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: responseData.message || `HTTP error! status: ${res.status}`,
        error: responseData.error || null,
      };
    }

    return responseData;
  } catch (error: any) {
    console.error('Seller info creation error:', error);
    return { success: false, error: error.message };
  }
};

export const createOnboardingBoat = async (
  token: string,
  data: FormData,
): Promise<any> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5 * 60 * 1000);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/boats/seller/onboarding/boat`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
        signal: controller.signal,
      },
    );

    clearTimeout(timeoutId);

    const responseData = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: responseData.message || `HTTP error! status: ${res.status}`,
        error: responseData.error || null,
      };
    }

    return responseData;
  } catch (error: any) {
    console.error('Onboarding boat creation error:', error);
    if (error instanceof Error && error.name === 'AbortError') {
      return {
        success: false,
        error:
          'Upload timeout. Please try with smaller images or check your internet connection.',
      };
    }
    return { success: false, error: error.message };
  }
};

export const createSetupIntent = async (
  token: string,
  planId: string,
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment/seller/setup-intent/${planId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const responseData = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: responseData.message || `HTTP error! status: ${res.status}`,
        error: responseData.error || null,
      };
    }

    return responseData;
  } catch (error: any) {
    console.error('Setup intent creation error:', error);
    return { success: false, error: error.message };
  }
};
