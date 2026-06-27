import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/card-showroom/card-showroom.page').then(
        (module) => module.CardShowroomPageComponent,
      ),
  },
];
