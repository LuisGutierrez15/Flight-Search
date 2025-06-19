export const buildQueryString = (params: Record<string, any>) => {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
};
