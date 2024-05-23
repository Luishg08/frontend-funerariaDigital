import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css'
})
export class EncabezadoComponent {

  sesionActiva:boolean = false


  constructor() {
  }

  ngOnInit(): void {
    // initFlowbite();
  }

  
}
