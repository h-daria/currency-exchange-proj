export interface CurrencyData {
  code: string;
  imageUrl?: string;
  value: string;
}

export interface ConversionRates {
  [currencyCode: string]: number;
}
