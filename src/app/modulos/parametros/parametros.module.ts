import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrosRoutingModule } from './parametros-routing.module';
import { SolicitarServicioFunerarioComponent } from './solicitar-servicio-funerario/solicitar-servicio-funerario.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdquirirPlanComponent } from './adquirir-plan/adquirir-plan.component';

@NgModule({
  declarations: [
    AdquirirPlanComponent,
    SolicitarServicioFunerarioComponent
  ],
  imports: [
    CommonModule,
    ParametrosRoutingModule,
    RouterOutlet, 
    RouterLink, 
    ReactiveFormsModule, 
    FormsModule
  ]
})
export class ParametrosModule { }
