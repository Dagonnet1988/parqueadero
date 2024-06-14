import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VehiculoService } from '../service/vehiculo.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registrar-salida',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registrar-salida.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrarSalidaComponent {
  codigoBarras: string = '';

  constructor(
    private vehiculoService: VehiculoService,
    private router: Router
  ) {}
  vehiculo: any = {};
  async registrarSalida() {
    this.vehiculo = await this.vehiculoService.obtenerVehiculo(
      this.codigoBarras
    );
    if (this.vehiculo.status === true) {
      this.vehiculo = await this.vehiculoService.registrarSalida(
        this.codigoBarras
      );
      this.router.navigate(['/salida-recibo', this.codigoBarras]);
    } else if (!this.vehiculo) {
      alert(
        `Codigo de barras ${this.codigoBarras.toUpperCase()} no registrado`
      );
    } else {
      alert(
        `El vehículo con placa ${this.vehiculo.placa.toUpperCase()}
        no se encuentra en el parqueadero, ya registró salida`
      );
    }
  }
}
