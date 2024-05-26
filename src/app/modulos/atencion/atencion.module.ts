import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtencionRoutingModule } from './atencion-routing.module';
import { PqrsComponent } from './pqrs/pqrs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AyudaComponent } from './ayuda/ayuda.component';
import { DetallesCondolenciaComponent } from './detalles-condolencia/detalles-condolencia.component';


@NgModule({
  declarations: [
    PqrsComponent,
    AyudaComponent,
    DetallesCondolenciaComponent
  ],
  imports: [
    CommonModule,
    AtencionRoutingModule, 
    ReactiveFormsModule, 
    FormsModule
  ]
})
export class AtencionModule { }
