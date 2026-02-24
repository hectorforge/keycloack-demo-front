import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './user-profile';
import { ClienteService } from './cliente-service';
import { ClienteResponse } from '../models/ClienteDto';
import { OperationResult } from '../models/ClienteDto';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;
  private _cliente?: ClienteResponse; // cliente local sincronizado

  get keycloak(): Keycloak {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8089',
        realm: 'keycloack-libreria',
        clientId: 'lup'
      });
    }
    return this._keycloak;
  }

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  get cliente(): ClienteResponse | undefined {
    return this._cliente;
  }

  constructor(private clienteService: ClienteService) {}

  async init() {
    console.log('Iniciando Keycloak');
    const authenticated = await this.keycloak?.init({
      onLoad: 'login-required',
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
    });

    if (authenticated) {
      console.log('User authenticated...');
      this._profile = (await this.keycloak?.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak?.token;
      console.log(this._keycloak?.token)
      this.syncCliente();
    }
  }

  async syncCliente() {
    if (!this._profile?.token) return;

    this.clienteService.syncUsuario(this._profile.token)
      .subscribe({
        next: (result: OperationResult<ClienteResponse>) => {
          if (result.isSuccess && result.data) {
            this._cliente = result.data;
            console.log('Usuario sincronizado en BD interna:', this._cliente);
          } else {
            console.error('Error sincronizando usuario:', result.errorMessage);
          }
        },
        error: err => {
          console.error('Error HTTP sincronizando usuario:', err);
        }
      });
  }

  login() {
    return this.keycloak?.login();
  }

  logout() {
    return this.keycloak?.logout();
  }
}
