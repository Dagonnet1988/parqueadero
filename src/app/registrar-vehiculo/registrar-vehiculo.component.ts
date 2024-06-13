import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VehiculoService } from '../service/vehiculo.service';
import { FormsModule } from '@angular/forms';
import JsBarcode from 'jsbarcode';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registrar-vehiculo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registrar-vehiculo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrarVehiculoComponent {
  placa: string = '';
  codigoBarras: string = '';
  valorHora: number = 0;
  cascos: number = 0;
  puestoCascos: number = 0;

  constructor(
    private vehiculoService: VehiculoService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    if (this.codigoBarras) {
      JsBarcode('#barcode', this.codigoBarras);
    }
  }

  async registrar() {
    if (this.placa === '') {
      alert('Por favor ingrese la placa del vehículo');
    } else {
      const vehiculo = await this.vehiculoService.registrarVehiculo(
        this.placa,
        this.valorHora,
        this.cascos,
        this.puestoCascos
      );
      this.ngAfterViewInit();
      this.codigoBarras = vehiculo.codigoBarras;
      await this.router.navigate(['/imprimir-recibo', vehiculo.codigoBarras]);

      this.placa = '';
      this.valorHora = 0;
      this.cascos = 0;
    }
  }
}
