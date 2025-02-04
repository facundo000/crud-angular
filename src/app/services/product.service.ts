import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from './interfaces/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private url:string = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${ this.url }/productos`)
  }
}
