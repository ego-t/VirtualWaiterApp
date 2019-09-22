import { NavController } from '@ionic/angular';
import { CurrentOrder } from './../services/order.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Alerta } from 'src/app/Utils/Alerta';
import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Router } from '@angular/router';
import { TableService } from '../services/table.service';
import { Table, EnumEstadoMesa } from '../models/Table';
import { Establishment } from '../models/Establishment';
import { OrderService } from '../services/order.service';
import { asTextData } from '@angular/core/src/view';

@Component({
  selector: 'app-buscar-mesa',
  templateUrl: './buscar-mesa.page.html',
  styleUrls: ['./buscar-mesa.page.scss'],
})
export class BuscarMesaPage {
  processando = false;
  codigoDigitado = '';
  encodeData: any;
  scannedData: {};
  scanSub: any;

  constructor(public barcodeScanner: QRScanner, public router: Router, public tableService: TableService,
    public alerta: Alerta, public databaseService: DatabaseService, public orderService: OrderService, ) {
  }

  ionViewDidEnter() {
    this.readQRCode();
  }

  readQRCode() {

    // const rootElement = <HTMLElement>document.getElementsByTagName('html')[0];
    // rootElement.classList.add('qr-scanner-open');
    // Optionally request the permission early
    this.barcodeScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          // start scanning
          this.barcodeScanner.useBackCamera();
          this.barcodeScanner.show();

          this.scanSub = this.barcodeScanner.scan().subscribe((text: string) => {
            this.definirMesa(text);
            this.barcodeScanner.hide(); // hide camera preview
            this.scanSub.unsubscribe(); // stop scanning
            this.barcodeScanner.destroy();

            // const ionAppAux = <HTMLElement>document.getElementsByTagName('ion-app')[0];
            // ionAppAux.classList.remove('qr-scanner-open');
          });
        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => {
        console.log('Error is', e);
        // const rootElement = <HTMLElement>document.getElementsByTagName('html')[0];
        // rootElement.classList.remove('qr-scanner-open');
      });
  }

  confirmarManual() {
    return this.definirMesa(this.codigoDigitado);
  }

  definirMesa(codigoMesa: string) {
    try {
      this.processando = true;

      let estabelecimentoAtual: Establishment = this.databaseService.getEstablishmentPage();

      const currentOrder = this.orderService.getCurrentOrderWithValorTotal().then((currentOrder: CurrentOrder) => {

        if (currentOrder && currentOrder.establishment) {
          estabelecimentoAtual = currentOrder.establishment;
        }

        this.tableService.getByEstablishmentId(estabelecimentoAtual.id).toPromise().then((tables: Table[]) => {

          if (tables.length > 0) {
            for (const table of tables) {
              if (table.codigo === codigoMesa) {
                if (table.enumestadomesa === EnumEstadoMesa.Ocupada) {
                  this.alerta.showAlert('Mesa ocupada', 'Aguarde o estabelecimento liberar');
                  this.readQRCode();
                  return;
                }

                this.databaseService.setTableScaned(table);
                //this.alerta.showAlert('', 'Mesa definida com sucesso!');
                this.processando = false;
                //this.navControler.back();

                this.barcodeScanner.hide(); // hide camera preview
                if(this.scanSub){
                  this.scanSub.unsubscribe(); // stop scanning
                }
                this.barcodeScanner.destroy();
                this.router.navigate(['/confirmar-estabelecimento']);
                return;
              }
            }

            this.alerta.showAlert(':/', 'Mesa não encontrada neste estabelecimento');
            this.readQRCode();
            // const tableAux: Table = tables[0];
            // const estabelecimentoAux: Establishment = tableAux.estabelecimento;
            // if (currentOrder.establishment.id > 0 && currentOrder.establishment.id !== estabelecimentoAux.id) {
            //   this.alerta.showAlert('Atenção', 'Existe um pedido aberto para outro estabelecimento');
            //   return;
            // }
          }

          this.processando = false;
        }).catch((error: Error) => {
          this.alerta.showAlert('Não foi possível localizar o estabelecimento :/', error.message);
          this.processando = false;
        });
        //this.processando = false;
      }).catch((error: Error) => {
        this.alerta.showAlert('Erro ao buscar Ordem', error.message);
        this.readQRCode();
      });
    } catch (erro) {
      console.log(erro);
      this.readQRCode();
    }
  }
}
