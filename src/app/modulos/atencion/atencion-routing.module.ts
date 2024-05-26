import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PqrsComponent } from './pqrs/pqrs.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { DetallesCondolenciaComponent } from './detalles-condolencia/detalles-condolencia.component';

const routes: Routes = [
  {
    path: 'pqrs',
    component: PqrsComponent
  },
  {
    path: 'ayuda',
    component: AyudaComponent
  },
  {
    path: 'detalles-condolencia',
    component: DetallesCondolenciaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtencionRoutingModule { }
