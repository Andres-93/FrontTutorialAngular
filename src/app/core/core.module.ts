import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DialogErrorComponent } from './dialog-error/dialog-error.component';


@NgModule({
  declarations: [
    HeaderComponent,
    DialogConfirmationComponent,
    DialogErrorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule, 
    MatToolbarModule,
    MatDialogModule,
  MatButtonModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    },
  ],
})
export class CoreModule { }
