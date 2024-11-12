import { environment } from './../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseURL = 'http://localhost:8000/api/v1';
  constructor(private http: HttpClient) {}

  //Get Products from the API
  getProducts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/products`);
  }
}
