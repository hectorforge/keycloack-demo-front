import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ProductDto} from '../models/ProductDto';
import {UserInfoDto} from '../models/UserInfoDto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
    private readonly API_URL = 'http://localhost:8080/api/clientes/dummy';

  constructor(private http: HttpClient) {}

  // Ruta del back que trae todos los usuariosa
  getUserInfo(): Observable<UserInfoDto> {
    return this.http.get<UserInfoDto>(`${this.API_URL}/me`);
  }

  getProducts(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${this.API_URL}/list`);
  }

  getDummy() : Observable<any>{
    return this.http.get<any>(`${this.API_URL}`);
  }
}
