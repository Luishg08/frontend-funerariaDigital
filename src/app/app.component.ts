import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterOutlet } from '@angular/router';
import { EncabezadoComponent } from './publico/pagina-maestra/encabezado/encabezado.component';
import { PieDePaginaComponent } from './publico/pagina-maestra/pie-de-pagina/pie-de-pagina.component';
import { InicioComponent } from './publico/inicio/inicio.component';
import { RutanoencontradaComponent } from './publico/errores/rutanoencontrada/rutanoencontrada.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, PieDePaginaComponent, RouterLink, EncabezadoComponent, InicioComponent, RutanoencontradaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'funerariaDigital';

  ngOnInit(): void {
    initFlowbite();
  }
}
