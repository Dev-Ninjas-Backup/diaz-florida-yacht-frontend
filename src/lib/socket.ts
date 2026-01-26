export const getSocketBaseUrl = (): string => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_BASE_API ||
    'https://api.floridayachttrader.com';

  return baseUrl.replace(/\/api$/, '');
};
