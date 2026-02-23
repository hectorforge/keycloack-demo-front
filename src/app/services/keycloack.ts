import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './user-profile';
import {ClienteService} from './cliente-service';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;
  private _profile : UserProfile | undefined;

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

  constructor() {}

  async init() {
    console.log('Iniciando Keycloak');
    const authenticated = await this.keycloak?.init({
      onLoad: 'login-required',
      //      checkLoginIframe: false
    });


    if(authenticated){
      console.log('User authenticated...')
      this._profile = (await this.keycloak?.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak?.token;
    }
    console.log(this._profile?.token);
  }

  login(){
    return this.keycloak?.login();
  }

  logout(){
    return this.keycloak?.logout();
    //Esto usamos si queremos cambiar de contraseña actualizar nuestros datos, etc.
    //this.keycloak?.accountManagement();
  }
}
