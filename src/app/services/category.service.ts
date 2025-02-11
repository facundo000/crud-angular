import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Category } from '../interfaces/index';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
    private apiUrl: string = 'http://localhost:3000'

    constructor(private http: HttpClient) {}

    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.apiUrl}/rubros`);
    }

    addCategory(category: Category): Observable<Category[]> {
      return this.http.post<Category[]>(`${this.apiUrl}/rubros`, category)
    }

    getCategoryById(id: string): Observable<Category> {
      return this.http.get<Category>(`${this.apiUrl}/rubros/${id}`)
    }

    updateCategory(id: string, category: Category): Observable<Category> {
      return this.http.patch<Category>(`${this.apiUrl}/rubros/${id}`, category)
    }
}