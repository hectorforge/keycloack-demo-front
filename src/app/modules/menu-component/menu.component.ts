import { Component, inject, OnInit } from '@angular/core';
import { KeycloakService } from '../../services/keycloack';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-menu-component',
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {

    private readonly _keyCloackSvc = inject(KeycloakService);

    ngOnInit(): void {
      const linkColor = document.querySelectorAll('.nav-link');
      linkColor.forEach(link => {
        if (window.location.href.endsWith(link.getAttribute('href') || '')) {
          link.classList.add('active');
        }
        link.addEventListener('click', () => {
          linkColor.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        });
      });
    }

    async logout(){
      this._keyCloackSvc.logout();
    }
}
