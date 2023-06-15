import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prestamo } from './prestamo/Prestamo';
import { Observable } from 'rxjs';
import { Pageable } from '../core/model/Pageable';
import { PrestamosPage } from './prestamo/PrestamosPage';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  constructor(private http: HttpClient) { }

  getAllPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>('http://localhost:8080/prestamo');
  }

  getPrestamosPageable(pageable: Pageable): Observable<PrestamosPage> {
    return this.http.post<PrestamosPage>('http://localhost:8080/prestamo', {pageable:pageable});
}
}
