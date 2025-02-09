import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Brand } from '../interfaces/index';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BrandService {

    private apiUrl:string = 'http://localhost:3000'

    constructor(private http: HttpClient) {}

    getAllBrand(): Observable<Brand[]> {
        return this.http.get<Brand[]>(`${ this.apiUrl }/marcas`)
    }

    addBrand(brand: Brand): Observable<Brand[]> {
      return this.http.post<Brand[]>(`${ this.apiUrl }/marcas`, brand)
    }

    getBrandById(id: string): Observable<Brand | undefined> {
      return this.http.get<Brand>(`${ this.apiUrl }/marcas/${id}`)
      .pipe(
        catchError( error => of(undefined))
      )
    }

    updateBrand(id: string, brand: Brand): Observable<Brand> {
      return this.http.patch<Brand>(`${ this.apiUrl }/marcas/${id}`, brand)
    }

}