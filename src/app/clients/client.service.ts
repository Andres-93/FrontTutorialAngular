import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from './model/Client';
import { Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Client[]> {
    return this.http.get<Client[]>('http://localhost:8080/client');
  }

  guardarCliente(cliente: Client): Observable<Client> {
    let url = 'http://localhost:8080/client';
    if (cliente.id != null) url += '/'+cliente.id;

    return this.http.put<Client>(url, cliente);
  }

  deleteClient(idCliente: number): Observable<any> {
    return this.http.delete('http://localhost:8080/client/'+idCliente);
  }  

}
