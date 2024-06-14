// src/app/services/vehiculo.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  private apiUrl = 'http://localhost:3000/vehiculos';

  async registrarVehiculo(placa: string, valorHora: number, cascos: number, puestoCascos: number) {
    const response = await axios.post(this.apiUrl, { placa, valorHora, cascos, puestoCascos});
    return response.data;
  }

  async obtenerVehiculos() {
    const response = await axios.get(`${this.apiUrl}?status=true`);
    return response.data;
  }

  async obtenerVehiculo(codigoBarras: string) {
    const response = await axios.get(`${this.apiUrl}/${codigoBarras}`);
    return response.data;
  }

  async registrarSalida(codigoBarras: string) {
    const response = await axios.post(`${this.apiUrl}/salida`, { codigoBarras });
    return response.data;


  }
}
