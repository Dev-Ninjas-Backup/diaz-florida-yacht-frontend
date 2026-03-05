export interface PromoCodeValidationResponse {
  success: boolean;
  message: string;
  data: {
    code: string;
    isValid: boolean;
    freeDays?: number;
    expiresAt?: string | null;
    maxRedemptions?: number | null;
    usedCount?: number;
    remainingRedemptions?: number | null;
    reason?: string;
  };
}

export const validatePromoCode = async (
  code: string,
): Promise<PromoCodeValidationResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/subscription/promo/validate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: PromoCodeValidationResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Promo code validation error:', error);
    throw error;
  }
};
