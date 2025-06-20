const formatISODuration = (duration: string): string => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return duration;
  const hours = match[1] ? `${match[1]}h` : "";
  const minutes = match[2] ? `${match[2]}m` : "";
  return `${hours} ${minutes}`;
};

const formatPrice = (amount: number, currencyCode: string) => {
  return new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
};

export { formatISODuration, formatPrice };
