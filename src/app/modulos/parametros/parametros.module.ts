import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrosRoutingModule } from './parametros-routing.module';
import { SolicitarServicioFunerarioComponent } from './solicitar-servicio-funerario/solicitar-servicio-funerario.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdquirirPlanComponent } from './adquirir-plan/adquirir-plan.component';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { MisBeneficiariosComponent } from './cliente/mis-beneficiarios/mis-beneficiarios.component';
import { EncabezadoComponent } from '../../publico/pagina-maestra/encabezado/encabezado.component';

@NgModule({
  declarations: [
    AdquirirPlanComponent,
    SolicitarServicioFunerarioComponent,
    CrearClienteComponent, 
    MisBeneficiariosComponent
  ],
  imports: [
    CommonModule,
    ParametrosRoutingModule,
    RouterOutlet, 
    RouterLink, 
    ReactiveFormsModule, 
    FormsModule,
    EncabezadoComponent
  ]
})
export class ParametrosModule { }
