import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideClerk } from '@jsrob/ngx-clerk'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideClerk({
      publishableKey: 'pk_test_d29ydGh5LWhhZ2Zpc2gtMzUuY2xlcmsuYWNjb3VudHMuZGV2JA'
    }),
  ]
};
