import { Component, OnInit, Inject } from '@angular/core';
import { Prestamo } from '../prestamo/Prestamo';
import { Client } from 'src/app/clients/model/Client';
import { Game } from 'src/app/game/model/Game';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from 'src/app/clients/client.service';
import { GameService } from 'src/app/game/game.service';
import { PrestamosService } from '../prestamos.service';
import { DialogErrorComponent } from 'src/app/core/dialog-error/dialog-error.component';

@Component({
  selector: 'app-prestamos-add',
  templateUrl: './prestamos-add.component.html',
  styleUrls: ['./prestamos-add.component.scss']
})
export class PrestamosAddComponent implements OnInit {

  prestamo: Prestamo; 
  clients: Client[];
  games: Game[];


  constructor( public dialogRef: MatDialogRef<PrestamosAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientService: ClientService,
    private gamesService: GameService,
    private prestamosService: PrestamosService,
    public dialog: MatDialog)
     { }

  ngOnInit(): void {

    this.prestamo = new Prestamo();

    this.clientService.getClientes().subscribe(
      clients => {
          this.clients = clients;

      }
  );

  this.gamesService.getGames().subscribe(
      games => {
          this.games = games;

      }
  );
  }

  onSave() {
    this.prestamosService.savePrestamo(this.prestamo).subscribe(() =>{
      this.dialogRef.close();
    },(error)=>{
      this.dialog.open(DialogErrorComponent, {
        data: {error}
      });
    });
      
}  

onClose() {
    this.dialogRef.close();
}

}
