import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Supplier } from '../interfaces/index';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SupplierService {

    private apiUrl:string = 'http://localhost:3000'

    constructor(private http: HttpClient) {}

    getAllSuppliers(): Observable<Supplier[]> {
        return this.http.get<Supplier[]>(`${ this.apiUrl }/proveedores`)
    }

    addSupplier(supplier: Supplier): Observable<Supplier[]> {
      return this.http.post<Supplier[]>(`${ this.apiUrl }/proveedores`, supplier)
    }

    getSupplierById(id: string): Observable<Supplier | undefined> {
      return this.http.get<Supplier[]>(`${ this.apiUrl }/proveedores/${id}`)
      .pipe(
        map(supplier => supplier[0]),
        catchError(error => of(undefined))
      )
    }

    updateSupplier(id: string, supplier: Supplier): Observable<Supplier> {
      return this.http.patch<Supplier>(`${ this.apiUrl }/proveedores/${id}`, supplier)
    }

    deleteCategoryById(id: string): Observable<boolean> {
      return this.http.delete(`${this.apiUrl}/rubros/${id}`).pipe(
        map( response => true),
        catchError( err => of(false))
      )
    }

}