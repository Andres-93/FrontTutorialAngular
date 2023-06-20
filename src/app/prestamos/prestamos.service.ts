import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prestamo } from './prestamo/Prestamo';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Pageable } from '../core/model/Pageable';
import { PrestamosPage } from './prestamo/PrestamosPage';
import { GameService } from '../game/game.service';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  constructor(private http: HttpClient,
    public datepipe: DatePipe) { }

  getPrestamosPageable(pageable): Observable<PrestamosPage> {
    return this.http.post<PrestamosPage>('http://localhost:8080/prestamo',pageable);
} 

savePrestamo(prestamo: Prestamo){
  prestamo.startdate = this.datepipe.transform(prestamo.startdate, 'yyyy-MM-dd');
  prestamo.enddate = this.datepipe.transform(prestamo.enddate, 'yyyy-MM-dd');
  let url = 'http://localhost:8080/prestamo';
  return this.http.put<Prestamo>(url, prestamo);
}

getPrestamosFiltrados(title?: string, clientId?: number,fecha?: Date): Observable<Prestamo[]> {
 
  return this.http.get<Prestamo[]>(this.composeFindUrl(title, clientId,fecha));
}

private composeFindUrl(title?: string, clientId?: number,fecha?: Date) : string {
  let params = '';

  if (title != null) {
      params += 'title='+title;
  }

  if (clientId != null) {
      if (params != '') params += "&";
      params += "idClient="+clientId;
  }

  if(fecha != null){
    let fechaFormat =this.datepipe.transform(fecha, 'dd/MM/yyyy');
    if(params != '') params += "&";
    params += "fecha=" + fechaFormat;
  }

  let url = 'http://localhost:8080/prestamo'

  if (params == '') return url;
  else return url + '?'+params;
  
}

eliminarPrestamo(idPrestamo){
  return this.http.delete('http://localhost:8080/prestamo/'+idPrestamo);
}
}
