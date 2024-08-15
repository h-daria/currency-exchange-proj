import { config } from '../app.config.server';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EXCHANGE_RATE_API_KEY } from '../../env';

const BASE_URL = 'https://v6.exchangerate-api.com';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesApiService {
  constructor(private http: HttpClient) {}

  getCurrencyData(currencyName: string) {
    let url = `${BASE_URL}/v6/${EXCHANGE_RATE_API_KEY}/latest/${currencyName}`;

    return this.http.get(url);
  }
}
