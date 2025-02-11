import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../interfaces/index';
import { catchError, map, Observable, of } from 'rxjs';

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

  addProduct( product: Product ): Observable<Product> {
    return this.http.post<Product>( `${this.apiUrl}/productos`, product )
  }

  getProductByid(id: string): Observable<Product | undefined> {
    return this.http.get<Product[]>(`${this.apiUrl}/productos/${id}`)
    .pipe(
      map(products => products[0]), 
      catchError( error => of(undefined))
    )
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/productos/${id}`, product)
  }

  deleteProductById(id: string): Observable<boolean>{
    return this.http.delete(`${this.apiUrl}/productos/${id}`)
    .pipe(
      map( resp => true),
      catchError( err => of(false))
    )
  }
}
