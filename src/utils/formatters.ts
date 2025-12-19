export const formatCurrency = (value: number, currency: string) => {
  const localeMap: { [key: string]: string } = {
    USD: "en-US",
    AED: "ar-AE",
    TRY: "tr-TR",
  };

  const currencyMap: { [key: string]: string } = {
    USD: "USD",
    AED: "AED",
    TRY: "TRY",
  };

  return new Intl.NumberFormat(localeMap[currency] || "en-US", {
    style: "currency",
    currency: currencyMap[currency] || "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(value);
};

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(value);
};
