import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { NavigationEnd, NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { EncabezadoComponent } from './publico/pagina-maestra/encabezado/encabezado.component';
import { PieDePaginaComponent } from './publico/pagina-maestra/pie-de-pagina/pie-de-pagina.component';
import { InicioComponent } from './publico/inicio/inicio.component';
import { RutanoencontradaComponent } from './publico/errores/rutanoencontrada/rutanoencontrada.component';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from './publico/pagina-maestra/menu-lateral/menu-lateral.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PieDePaginaComponent, RouterLink, EncabezadoComponent, InicioComponent, RutanoencontradaComponent, MenuLateralComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'funerariaDigital';
  rutaActual: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.rutaActual = event.url;
      }
    });
  }

  ngOnInit(): void {
    initFlowbite();
    
  }
}
