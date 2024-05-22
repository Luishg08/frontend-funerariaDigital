import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificacionUsuarioComponent } from './identificacion-usuario/identificacion-usuario.component';

const routes: Routes = [
  {
    path:'identificar-usuario',
    component: IdentificacionUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
