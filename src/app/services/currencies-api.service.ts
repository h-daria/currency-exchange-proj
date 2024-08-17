import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EXCHANGE_RATE_API_KEY } from '../../env';
import { Observable, map } from 'rxjs';
import { ConversionRates } from '../currency-interfaces';

const BASE_URL = 'https://v6.exchangerate-api.com';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesApiService {
  constructor(private http: HttpClient) {}

  getCurrencyData(currencyName: string): Observable<ConversionRates> {
    let url = `${BASE_URL}/v6/${EXCHANGE_RATE_API_KEY}/latest/${currencyName}`;

    return this.http.get(url).pipe(
      map((data: any) => {
        const { conversion_rates }: { conversion_rates: ConversionRates } = data;
        const conversionRates: ConversionRates = conversion_rates;

        return conversionRates;
      })
    );
  }
}
