import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login-component/login.component';
import {ProductsComponent} from './modules/products-component/products.component';
import {authGuardGuard} from './guards/auth-guard-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
      path: 'products',
      component: ProductsComponent,
      canActivate: [authGuardGuard]
    }
];
