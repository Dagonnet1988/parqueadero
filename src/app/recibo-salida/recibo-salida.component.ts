import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VehiculoService } from '../service/vehiculo.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-recibo-salida',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recibo-salida.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ReciboSalidaComponent {
  constructor(
    private vehiculoService: VehiculoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  vehiculo: any = {};

  async ngOnInit() {
    const codigoBarras = this.route.snapshot.paramMap.get('codigoBarras');
    if (codigoBarras !== null) {
      this.vehiculo = await this.vehiculoService.obtenerVehiculo(codigoBarras);
    }
  }

  convertMinutesToHoursAndMinutes(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} horas y ${mins} minutos`;
  }
}
