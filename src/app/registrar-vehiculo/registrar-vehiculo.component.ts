import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { VehiculoService } from '../service/vehiculo.service';
import JsBarcode from 'jsbarcode';

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
    }
  }
}
