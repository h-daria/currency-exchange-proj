import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ConversionRates, CurrencyData } from '../currency-interfaces';
import { Subject, takeUntil } from 'rxjs';
import { CurrenciesApiService } from '../services/currencies-api.service';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [MatIconModule, CurrencyPipe, CommonModule],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  baseCurrency = 'UAH';
  currencies: CurrencyData[] = [
    {
      code: 'USD',
      imageUrl: '../../assets/images/united-states-flag-icon.svg',
      value: '0',
    },
    {
      code: 'EUR',
      imageUrl: '../../assets/images/europe-flag-icon.svg',
      value: '0',
    },
  ];

  destroy$: Subject<void> = new Subject<void>();

  constructor(private currenciesApiService: CurrenciesApiService) {}

  ngOnInit(): void {
    this.initCurrencyData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initCurrencyData() {
    this.currenciesApiService
      .getCurrencyData(this.baseCurrency)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ConversionRates) => {
        this.currencies.forEach((item: CurrencyData) => {
          item.value = (1 / data[item.code]).toString();
        });
      });
  }
}
