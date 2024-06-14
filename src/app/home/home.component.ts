import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VehiculoService } from '../service/vehiculo.service';
import { ListboxModule } from 'primeng/listbox';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListboxModule, CardModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HomeComponent {
  constructor(private vehiculoService: VehiculoService, private router: Router) {}

  searchTerm: string = '';
  filteredVehicles: any[] = [];
  vehiculos: any = [];
  vehiculo: any = {};

  trackById(index: number, vehiculo: any): string {
    return vehiculo.id;
  }

  search() {
    if (this.searchTerm) {
      this.filteredVehicles = this.vehiculos.filter((vehiculos: any) =>
        vehiculos.placa.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredVehicles = this.vehiculos;
    }
  }

  async registrarSalida(codigoBarras: string) {
    this.vehiculo = await this.vehiculoService.registrarSalida(
      codigoBarras
    );
    this.router.navigate(['/salida-recibo', codigoBarras]);
  }

  async ngOnInit() {
    const vehiculos = await this.vehiculoService.obtenerVehiculos();
  this.vehiculos = vehiculos.filter((vehiculo: any) => vehiculo.status === true);
  this.filteredVehicles = this.vehiculos;

  }
}
