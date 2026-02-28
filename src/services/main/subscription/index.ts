/* eslint-disable @typescript-eslint/no-explicit-any */

export const getAllSubscription = async () => {
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

export const createSubscription = async (data: any): Promise<any> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5 * 60 * 1000);
    
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/boats/seller/onboarding`,
      {
        method: 'POST',
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
    console.error('Subscription creation error:', error);
    if (error instanceof Error && error.name === 'AbortError') {
      return { 
        success: false, 
        error: 'Upload timeout. Please try with smaller images or check your internet connection.' 
      };
    }
    return { success: false, error: error.message };
  }
};

export const confirmSubscriptionPayment = async (
  userId: string,
): Promise<any> => {
  try {
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

export const subscriptionPackageLimitations = async (
  id: string,
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/subscription/plans/${id}`,
      {
        method: 'GET',
        next: {
          tags: ['SUBSCRIPTION_LIMITATIONS'],
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
