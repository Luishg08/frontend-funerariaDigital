import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitarServicioFunerarioComponent } from './solicitar-servicio-funerario/solicitar-servicio-funerario.component';

const routes: Routes = [{
  path: 'solicitar-servicio-funerario',
  component: SolicitarServicioFunerarioComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }
