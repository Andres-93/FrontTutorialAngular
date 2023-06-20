import { Component, OnInit } from '@angular/core';
import { Prestamo } from '../prestamo/Prestamo'
import { MatTableDataSource } from '@angular/material/table';
import { PrestamosService } from '../prestamos.service';
import { PageEvent } from '@angular/material/paginator';
import { Pageable } from 'src/app/core/model/Pageable';
import { PrestamosAddComponent } from '../prestamos-add/prestamos-add.component';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/clients/model/Client';
import { ClientService } from 'src/app/clients/client.service';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/game/model/Game';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-prestamos-list',
  templateUrl: './prestamos-list.component.html',
  styleUrls: ['./prestamos-list.component.scss']
})
export class PrestamosListComponent implements OnInit {

  dataSource = new MatTableDataSource<Prestamo>();
  displayedColumns: string[] = ['id', 'game', 'client','startDate','endDate','action'];

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  listaClientes: Client[];
  listaJuegos: Game[];
  filtroCliente: Client;
  filtroGame: Game;
  filtroFecha: Date;

  constructor(public prestamoService: PrestamosService,
    public clientService: ClientService,
    public gameService: GameService,
    public dialog: MatDialog,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.clientService.getClientes().subscribe(clientes=>{
      this.listaClientes = clientes;
    })
    this.gameService.getGames().subscribe(games=>{
      this.listaJuegos = games;
    })
    this.loadPage();
  }

  loadPage(event?: PageEvent) {

    let pageable  =  {
        idClient: this.filtroCliente?.id ? this.filtroCliente.id : null,
        idGame: this.filtroGame?.id ? this.filtroGame.id : null,
        fecha: this.filtroFecha ? this.datepipe.transform(this.filtroFecha, 'yyyy-MM-dd') : null,
        pageable: {pageNumber: this.pageNumber,
                  pageSize: this.pageSize,
                  sort: [{
                      property: 'id',
                      direction: 'ASC'
                  }]}
    }

    if (event != null) {
        pageable.pageable.pageSize = event.pageSize
        pageable.pageable.pageNumber = event.pageIndex;
    }

    this.prestamoService.getPrestamosPageable(pageable).subscribe(data => {
        this.dataSource.data = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
    });

} 

nuevoPrestamo(){
  const dialogRef = this.dialog.open(PrestamosAddComponent, {
    data: {}
});

dialogRef.afterClosed().subscribe(result => {
    this.ngOnInit();
});    

}

  eliminarPrestamo(prestamo: Prestamo){
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar prestamo", description: "Atención si borra el prestamo se perderán sus datos.<br> ¿Desea eliminar el prestamo?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.prestamoService.eliminarPrestamo(prestamo.id).subscribe(result => {
          this.ngOnInit();
        }); 
      }
    });
  }

  onCleanFilter(): void {
    this.filtroGame = null;
    this.filtroCliente = null;
    this.filtroFecha = null;

    this.onSearch();
}

onSearch(): void { 
    this.loadPage();
    
}

}
