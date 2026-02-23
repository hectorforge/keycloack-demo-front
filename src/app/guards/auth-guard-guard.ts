import { CanActivateFn, Router } from '@angular/router';
import { inject} from '@angular/core';
import { KeycloakService } from '../services/keycloack';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const keycloackService = inject(KeycloakService);
  const router = inject(Router)
  if(keycloackService.keycloak.isTokenExpired()){
    router.navigate(['login'])
    return false
  }
  return true;
};
