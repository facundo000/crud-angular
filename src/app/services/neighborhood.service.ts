import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Neighborhood } from '../interfaces/index';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NeighborhoodService {

    private apiUrl:string = 'http://localhost:3000'

    constructor(private http: HttpClient) {}

    getAllNeighborhood(): Observable<Neighborhood[]> {
        return this.http.get<Neighborhood[]>(`${ this.apiUrl }/barrios`)
    }

    addNeighborhood(neighborhood: Neighborhood): Observable<Neighborhood[]> {
      return this.http.post<Neighborhood[]>(`${ this.apiUrl }/barrios`, neighborhood)
    }

    getNeighborhoodById(id:string): Observable<Neighborhood> {
      return this.http.get<Neighborhood>(`${ this.apiUrl }/barrios/${id}`)
    }

    updateNeighborhood(id: string, neighborhood: Neighborhood): Observable<Neighborhood> {
      return this.http.patch<Neighborhood>(`${ this.apiUrl }/barrios/${id}`, neighborhood)
    }

    deleteNeighborhoodById(id: string): Observable<boolean>{
      return this.http.delete(`${ this.apiUrl }/barrios/${id}`).pipe(
        map( response => true),
        catchError(err => of(false))
      )
    }

}