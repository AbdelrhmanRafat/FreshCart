import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions} from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from '../core/interceptors/headers.interceptor';
import { errorInterceptor } from '../core/interceptors/error.interceptor';
import { spinnerInterceptor } from '../core/interceptors/spinner.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,
   withHashLocation(),
   withViewTransitions(),
   withInMemoryScrolling({
    scrollPositionRestoration : 'top'
   }),
  ),
  provideHttpClient(withFetch(),withInterceptors([headersInterceptor,errorInterceptor,spinnerInterceptor])),
  importProvidersFrom(BrowserAnimationsModule),
  provideAnimations(), // required animations providers
  provideToastr(), provideAnimationsAsync(), // Toastr providers
],
};
