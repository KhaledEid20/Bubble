import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { loadingScreenInterceptor } from './core/interceptor/Loading/loading-screen-interceptor';
import { headingInterceptor } from './core/interceptor/Heading/heading-interceptor';
import { errorsInterceptor } from './core/interceptor/Errors/errors-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes ,
      withInMemoryScrolling({scrollPositionRestoration:'top'}),
      withViewTransitions({
        skipInitialTransition:true,
      })
    ),
    provideHttpClient(withFetch(), withInterceptors([loadingScreenInterceptor, headingInterceptor , errorsInterceptor]))
  ]
};
