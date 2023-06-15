import { Component, OnInit } from '@angular/core';
import { Prestamo } from '../prestamo/Prestamo'
import { MatTableDataSource } from '@angular/material/table';
import { PrestamosService } from '../prestamos.service';
import { PageEvent } from '@angular/material/paginator';
import { Pageable } from 'src/app/core/model/Pageable';
import { PrestamosAddComponent } from '../prestamos-add/prestamos-add.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(public prestamoService: PrestamosService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(event?: PageEvent) {

    let pageable : Pageable =  {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sort: [{
            property: 'id',
            direction: 'ASC'
        }]
    }

    if (event != null) {
        pageable.pageSize = event.pageSize
        pageable.pageNumber = event.pageIndex;
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

  eliminarPrestamo(element){

  }

}
