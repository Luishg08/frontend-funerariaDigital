import { Routes } from '@angular/router';
import { InicioComponent } from './publico/inicio/inicio.component';
import { RutanoencontradaComponent } from './publico/errores/rutanoencontrada/rutanoencontrada.component';
import { NosotrosComponent } from './publico/nosotros/nosotros.component';

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
        path: 'logica-negocio',
        loadChildren: ()=> import("./modulos/seguridad/seguridad.module").then(modulo => modulo.SeguridadModule)
    },
    {
        path: 'atencion',
        loadChildren: ()=> import("./modulos/atencion/atencion.module").then(modulo => modulo.AtencionModule)
    },
    {
        path: 'parametros',
        loadChildren: ()=> import("./modulos/parametros/parametros.module").then(modulo => modulo.ParametrosModule)
    },
    {
        path: 'nosotros',
        component: NosotrosComponent
    },
    {
        path: '**',
        component: RutanoencontradaComponent
    }
    
];
