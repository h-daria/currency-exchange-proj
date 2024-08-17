import { Component, OnInit } from '@angular/core';
import {
  ConversionRates,
  CurrencyData,
} from '../currency-interfaces';
import { Subject, takeUntil } from 'rxjs';
import { CurrenciesApiService } from '../services/currencies-api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface CurrenciesToConvert {
  currencyBase: CurrencyData;
  currencyConvertTo: CurrencyData;
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    FormsModule,
  ],
  selector: 'app-currency-exchange-tool',
  templateUrl: './currency-exchange-tool.component.html',
  styleUrls: ['./currency-exchange-tool.component.scss'],
})
export class CurrencyExchangeToolComponent implements OnInit {
  currencyCodes: string[] = ['UAH', 'USD', 'EUR'];
  selectedCurrencies: CurrenciesToConvert = {
    currencyBase: {
      code: 'UAH',
      value: '',
    },
    currencyConvertTo: {
      code: 'USD',
      value: '',
    },
  };

  currencyConvertToRate: string = '';

  destroy$: Subject<void> = new Subject<void>();

  constructor(private currenciesApiService: CurrenciesApiService) {}

  ngOnInit(): void {
    this.getCurrencyRates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectCurrency(currencyCode: string, currency: CurrencyData) {
    if (
      currency === this.selectedCurrencies.currencyBase &&
      currencyCode !== this.selectedCurrencies.currencyConvertTo.code &&
      currencyCode !== this.selectedCurrencies.currencyBase.code
    ) {
      this.selectedCurrencies.currencyBase.code = currencyCode;
      currency.value = '0';
    } else if (
      currency === this.selectedCurrencies.currencyConvertTo &&
      currencyCode !== this.selectedCurrencies.currencyBase.code &&
      currencyCode !== this.selectedCurrencies.currencyConvertTo.code
    ) {
      this.selectedCurrencies.currencyConvertTo.code = currencyCode;
      currency.value = '0';
    } else return;

    this.getCurrencyRates();
  }

  getCurrencyRates() {
    this.currenciesApiService
      .getCurrencyData(this.selectedCurrencies.currencyBase.code)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ConversionRates) => {
        this.currencyConvertToRate =
          data[this.selectedCurrencies.currencyConvertTo.code].toString();

        this.selectedCurrencies.currencyBase.value = '';
        this.selectedCurrencies.currencyConvertTo.value = '';
      });
  }

  onConvertCurrency($event: any, currency: CurrencyData): void {
    const convertedValue =
      currency === this.selectedCurrencies.currencyBase
        ? $event.target.value / Number(this.currencyConvertToRate)
        : $event.target.value * Number(this.currencyConvertToRate);

    currency.value = (Math.floor(convertedValue * 100) / 100).toString();
  }
}
