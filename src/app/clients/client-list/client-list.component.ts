import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../model/Client';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { ClientEditComponent } from '../client-edit/client-edit.component';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  dataSource = new MatTableDataSource<Client>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor( 
    public dialog: MatDialog,
    public clientService: ClientService
    ) { }

  ngOnInit(): void {

    this.clientService.getClientes().subscribe((clientes)=>{
      this.dataSource.data = clientes;
    });
   

    
  }
  editarCliente(cliente: Client) {
    const dialogRef = this.dialog.open(ClientEditComponent, {
      data: {cliente}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    }); 
  }

  nuevoCliente() {    
    const dialogRef = this.dialog.open(ClientEditComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    }); 
  }  

  eliminarCliente(cliente: Client) {    
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar categoría", description: "Atención si borra la categoría se perderán sus datos.<br> ¿Desea eliminar la categoría?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.deleteClient(cliente.id).subscribe(result => {
          this.ngOnInit();
        }); 
      }
    });
  }  

}
