import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RegistrarSalidaComponent } from "./registrar-salida/registrar-salida.component";
import { RegistrarVehiculoComponent } from './registrar-vehiculo/registrar-vehiculo.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, RegistrarSalidaComponent, RegistrarVehiculoComponent]
})
export class AppComponent {
  title = 'parqueadero-app';
}
