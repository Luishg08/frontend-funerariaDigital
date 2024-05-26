import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificacionUsuarioComponent } from './identificacion-usuario/identificacion-usuario.component';
import { IdentificacionTwofaComponent } from './identificacion-twofa/identificacion-twofa.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';
import { RegistroPublicoUsuariosComponent } from './registro-publico-usuarios/registro-publico-usuarios.component';
import { ValidarHashUsuarioPublicoComponent } from './validar-hash-usuario-publico/validar-hash-usuario-publico.component';

const routes: Routes = [
  {
    path:'identificar-usuario',
    component: IdentificacionUsuarioComponent
  },
  {
    path: 'identificacion-twofa',
    component: IdentificacionTwofaComponent
  },
  {
    path: 'crear-usuario',
    component: CrearUsuarioComponent
  },
  {
    path: 'recuperar-clave',
    component: RecuperarClaveComponent
  },
  {
    path: 'cerrar-sesion',
    component: CerrarSesionComponent
  },
  {
    path: 'cambiar-clave',
    component: CambiarClaveComponent
  },
  {
    path: 'registro-publico-usuarios',
    component: RegistroPublicoUsuariosComponent
  },
  {
    path: 'validar-hash-usuario-publico/:hash',
    component: ValidarHashUsuarioPublicoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
