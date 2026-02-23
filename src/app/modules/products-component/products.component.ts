import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ProductDto } from '../../models/ProductDto';
import { UserInfoDto } from '../../models/UserInfoDto';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-products-component',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent  {
  /*
  private readonly productSvc = inject(ProductService);

  userInfo?: UserInfoDto;
  products: ProductDto[] = [];

  ngOnInit(): void {
    this.loadUserInfo();
    this.loadProducts();
  }

  private loadUserInfo(): void {
    this.productSvc.getUserInfo().subscribe({
      next: (data) => {
        this.userInfo = data;
        console.log(this.userInfo)
      },
      error: (err) => {
        console.error('Error loading user info', err);
      },
    });
  }

  private loadProducts(): void {
    this.productSvc.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log(this.products)
      },
      error: (err) => {
        console.error('Error loading products', err);
      },
    });
  }*/
  private readonly productSvc = inject(ProductService);

  // 🔥 Observables, no variables mutables
  /*
  userInfo$: Observable<UserInfoDto> = this.productSvc.getUserInfo();
  products$: Observable<ProductDto[]> = this.productSvc.getProducts();*/

  dummy$: Observable<any> = this.productSvc.getDummy();
}
