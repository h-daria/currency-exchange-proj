export interface CurrencyData {
  code: string;
  imageUrl?: string;
  value: string;
}

export interface ConversionRates {
  [currencyCode: string]: number;
}

export interface CurrenciesDto {
  base_code: string;
  conversion_rates: ConversionRates;
  result: boolean;
}
