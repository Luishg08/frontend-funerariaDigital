import { Routes } from '@angular/router';
import { InicioComponent } from './publico/inicio/inicio.component';
import { RutanoencontradaComponent } from './publico/errores/rutanoencontrada/rutanoencontrada.component';

export const routes: Routes = [ 
    {
        path: 'inicio',
        component: InicioComponent
    },
    {
        path:'',
        pathMatch: 'full',
        redirectTo: '/inicio'
    },
    {
        path: 'seguridad',
        loadChildren: ()=> import("./modulos/seguridad/seguridad.module").then(modulo => modulo.SeguridadModule)
    },
    {
        path: '**',
        component: RutanoencontradaComponent
    },
];
