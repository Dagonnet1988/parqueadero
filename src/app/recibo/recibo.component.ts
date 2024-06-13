import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VehiculoService } from '../service/vehiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-recibo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recibo.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ReciboComponent {
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
      JsBarcode('#barcode', codigoBarras);
      setTimeout(() => {
        this.imprimirElemento('recibo');
      }, 300); // Delay of 1 second (1000 milliseconds)
    }
  }

  async imprimirElemento(elementoId: string) {
    let contenido = document.getElementById(elementoId)?.innerHTML;
    let ventanaImpresion = window.open('', '_blank');
    ventanaImpresion?.document.open();
    this.router.navigate(['home']);

    ventanaImpresion?.document.write(`
      <html>
        <head>
          <style>
            body {
              font-size: 0.75em; /* Reduce el tamaño del texto */
              margin: 0.5in; /* Reduce los márgenes */
            }
            /* Añade más estilos según sea necesario */
          </style>
        </head>
        <body onload="window.print()">
          ${contenido}
        </body>
      </html>
    `);
    ventanaImpresion?.document.close();
    setTimeout(() => {
      ventanaImpresion?.close();
    }, 500); // Delay of 0.5 seconds (500 milliseconds)


  }

  // async imprimirElemento(elementoId: string) {
  //   let contenido = document.getElementById(elementoId)?.innerHTML;
  //   let ventanaImpresion = window.open('', '_blank');
  //   ventanaImpresion?.document.open();
  //   ventanaImpresion?.document.write(`
  //     <html>
  //       <head>
  //         <style>
  //           body {
  //             font-size: 0.75em; /* Reduce el tamaño del texto */
  //             margin: 0.5in; /* Reduce los márgenes */
  //           }
  //           /* Añade más estilos según sea necesario */
  //         </style>
  //       </head>
  //       <body onload="setTimeout(() => { window.print(); ventanaImpresion?.close(); }, 300)">
  //         ${contenido}
  //       </body>
  //     </html>
  //   `);
  //   ventanaImpresion?.document.close();
  //   this.router.navigate(['home']);
  // }
}
