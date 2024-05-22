import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { IdentificacionUsuarioComponent } from './identificacion-usuario/identificacion-usuario.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [IdentificacionUsuarioComponent],
  imports: [
    CommonModule,
    SeguridadRoutingModule, 
    RouterOutlet, 
    RouterLink, 
    ReactiveFormsModule, 
    FormsModule
  ]
})
export class SeguridadModule { }
