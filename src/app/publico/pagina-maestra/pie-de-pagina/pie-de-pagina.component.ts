import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pie-de-pagina',
  standalone: true,
  imports: [RouterModule, RouterLink ],
  templateUrl: './pie-de-pagina.component.html',
  styleUrl: './pie-de-pagina.component.css'
})
export class PieDePaginaComponent {

}
