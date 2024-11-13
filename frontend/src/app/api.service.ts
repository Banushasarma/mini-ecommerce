import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseURL = 'http://localhost:8000/api/v1';
  constructor(private http: HttpClient) {}

  productsSource = new BehaviorSubject([]);
  currentProducts = this.productsSource.asObservable();
  productsTmp = [];

  //Get Products from the API
  getProducts() {
    this.http
      .get(`${environment.apiUrl}/api/v1/products`)
      .subscribe((response: any) => {
        this.productsSource.next(response);
        this.productsTmp = response;
      });
  }

  //serch the products
  searchProducts(searchTerm: string) {
    this.http
      .get(`${environment.apiUrl}/api/v1/products?keyword=${searchTerm}`)
      .subscribe((response: any) => {
        this.productsSource.next(response);
      });
  }

  clearSearch(searchText: string) {
    if (searchText == '') {
      this.productsSource.next(this.productsTmp);
    }
  }
}
