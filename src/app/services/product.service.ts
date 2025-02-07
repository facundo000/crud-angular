import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../interfaces/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  // private url:string = environment.apiUrl;
  private apiUrl:string = 'http://localhost:3000'


  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${ this.apiUrl }/productos`)
  }

  addProduct( product: Product ): Observable<Product[]> {
    return this.http.post<Product[]>( `${this.apiUrl}/productos`, product )
  }
}
