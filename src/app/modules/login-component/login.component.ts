import { Component, inject, OnInit } from '@angular/core';
import { KeycloakService } from '../../services/keycloack';

@Component({
  selector: 'app-login-component',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly _keycloackSvc = inject(KeycloakService)

  async ngOnInit(): Promise<void> {
    await this._keycloackSvc.init();
    await this._keycloackSvc.login();
  }
}
