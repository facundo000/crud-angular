import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Neighborhood } from '../interfaces/index';
import { Observable } from 'rxjs';

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

}