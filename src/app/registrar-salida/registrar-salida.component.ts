import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VehiculoService } from '../service/vehiculo.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-salida',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-salida.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrarSalidaComponent {
  codigoBarras: string = '';

  constructor(private vehiculoService: VehiculoService, private router: Router) {}
  salida: boolean = false;
  vehiculo: any = {};
  async registrarSalida() {

    this.vehiculo = await this.vehiculoService.registrarSalida(this.codigoBarras);
    this.router.navigate(['/salida-recibo', this.codigoBarras]);
  }
}
