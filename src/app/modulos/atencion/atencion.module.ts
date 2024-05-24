import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtencionRoutingModule } from './atencion-routing.module';
import { PqrsComponent } from './pqrs/pqrs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PqrsComponent,
  ],
  imports: [
    CommonModule,
    AtencionRoutingModule, 
    ReactiveFormsModule, 
    FormsModule
  ]
})
export class AtencionModule { }
