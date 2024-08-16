import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'exchange-tool',
  },
  {
    path: 'exchange-tool',
    loadComponent: () =>
      import(
        '../app/currency-exchange-tool/currency-exchange-tool.component'
      ).then((mod) => mod.CurrencyExchangeToolComponent),
  },
];
