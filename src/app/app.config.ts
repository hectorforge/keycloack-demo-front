import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { KeycloakService } from './services/keycloack';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {tokenInterceptorInterceptor} from './interceptor/token-interceptor-interceptor';

export function kcFactory(kc: KeycloakService) {
  return () => kc.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([tokenInterceptorInterceptor]), withFetch()),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true
    }
  ]
};
