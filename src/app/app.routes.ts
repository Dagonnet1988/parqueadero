import { Routes } from '@angular/router';
import { RegistrarVehiculoComponent } from './registrar-vehiculo/registrar-vehiculo.component';
import { RegistrarSalidaComponent } from './registrar-salida/registrar-salida.component';
import { ReciboComponent } from './recibo/recibo.component';
import { ReciboSalidaComponent } from './recibo-salida/recibo-salida.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'registrar-vehiculo', component: RegistrarVehiculoComponent },
  { path: 'registrar-salida', component: RegistrarSalidaComponent},
  { path: 'imprimir-recibo/:codigoBarras', component: ReciboComponent},
  { path: 'salida-recibo/:codigoBarras', component: ReciboSalidaComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: 'home'}
];
