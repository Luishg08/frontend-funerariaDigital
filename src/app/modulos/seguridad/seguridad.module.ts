import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { IdentificacionUsuarioComponent } from './identificacion-usuario/identificacion-usuario.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdentificacionTwofaComponent } from './identificacion-twofa/identificacion-twofa.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';


@NgModule({
  declarations: [
    IdentificacionUsuarioComponent,
    IdentificacionTwofaComponent,
    RecuperarClaveComponent, 
    CrearUsuarioComponent,
    CambiarClaveComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule, 
    RouterOutlet, 
    RouterLink, 
    ReactiveFormsModule, 
    FormsModule
  ]
})
export class SeguridadModule { }
