import { Component, OnInit, Inject } from '@angular/core';
import { Prestamo } from '../prestamo/Prestamo';
import { Client } from 'src/app/clients/model/Client';
import { Game } from 'src/app/game/model/Game';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from 'src/app/clients/client.service';
import { GameService } from 'src/app/game/game.service';
import { PrestamosService } from '../prestamos.service';

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
    private prestamosService: PrestamosService)
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
        this.dialogRef.close();
}  

onClose() {
    this.dialogRef.close();
}

}
