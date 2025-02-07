import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Supplier } from '../interfaces/index';
import { Observable } from 'rxjs';

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

}