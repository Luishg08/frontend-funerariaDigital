import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitarServicioFunerarioComponent } from './solicitar-servicio-funerario/solicitar-servicio-funerario.component';
import { AdquirirPlanComponent } from './adquirir-plan/adquirir-plan.component';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { MisBeneficiariosComponent } from './cliente/mis-beneficiarios/mis-beneficiarios.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { CrearMetodoPagoComponent } from './cliente/metodos-de-pago/crear-metodo-pago/crear-metodo-pago.component';
import { ListarMetodoPagoComponent } from './cliente/metodos-de-pago/listar-metodo-pago/listar-metodo-pago.component';

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
    component: ListarMetodoPagoComponent
  },
  {
    path: 'crear-metodo-pago',
    component: CrearMetodoPagoComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }
