import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitarServicioFunerarioComponent } from './solicitar-servicio-funerario/solicitar-servicio-funerario.component';
import { AdquirirPlanComponent } from './adquirir-plan/adquirir-plan.component';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { MisBeneficiariosComponent } from './cliente/mis-beneficiarios/mis-beneficiarios.component';
import { MetodosPagoComponent } from './cliente/metodos-pago/metodos-pago.component';

const routes: Routes = [
  {
    path: 'adquirir-plan',
    component: AdquirirPlanComponent
  },
  {
    path: 'solicitar-servicio-funerario',
    component: SolicitarServicioFunerarioComponent
  },
  {
    path: 'crear-cliente',
    component: CrearClienteComponent
  },
  {
    path: 'mis-beneficiarios',
    component: MisBeneficiariosComponent
  },
  {
    path:'mis-metodos-de-pago',
    component: MetodosPagoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }
