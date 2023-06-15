import { Component, Inject, OnInit } from '@angular/core';
import { Client } from '../model/Client';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../client.service';


@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {

  cliente : Client;
  nombreYaExistente: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ClientEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public clientService: ClientService
  ) { }

  ngOnInit(): void {
    if (this.data.cliente != null) {
      this.cliente = Object.assign({}, this.data.cliente);
    }
    else {
      this.cliente = new Client();
    }
  }

  onSave() {
    this.clientService.guardarCliente(this.cliente).subscribe(result => {
      this.dialogRef.close();
    },(error)=>{
      this.nombreYaExistente = true;
    }); 
  }  

  onClose() {
    this.dialogRef.close();
  }

}
