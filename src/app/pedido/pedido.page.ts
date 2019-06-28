import { ItemProduct } from './../models/ItemProduct';
import { DatabaseService } from './../services/database.service';
import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { OpcoesItemPedidoPage } from '../pages/opcoes-item-pedido/opcoes-item-pedido.page';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss', './../style/EstiloPadrao.scss'],
})
export class PedidoPage implements OnInit {

  public itensProductSource: ItemProduct[] = [];
  totalPedido = 0;
  nomeEstabelecimento = '';
  urlEstabelecimento = '';
  numComanda = '';
  codigoMesa = '';

  constructor(private navCtrl: NavController,
    private db: DatabaseService,
    public popoverController: PopoverController,
    public orderService: OrderService) {
    this.atualizarlistagemProdutos();
  }

  ionViewDidEnter() {
    const currentOrder = this.orderService.getCurrentOrder();
    if (currentOrder.table) {
      this.codigoMesa = currentOrder.table.numero.toString();
    }
    if (currentOrder.control) {
      this.numComanda = currentOrder.control.id.toString();
    }
    this.atualizarlistagemProdutos();
  }

  atualizarlistagemProdutos() {
    const establishment = this.db.getEstablishmentPage();
    if (establishment) {
      this.nomeEstabelecimento = establishment.nome;
      this.urlEstabelecimento = establishment.logo;
    }
    this.itensProductSource = [];
    this.totalPedido = 0;

    this.db.getItensProducts().then((itensProductdb: ItemProduct[]) => {
      this.totalPedido = 0;
      for (const itemProduct of itensProductdb) {
          this.itensProductSource.push(itemProduct);
          this.totalPedido += Number(itemProduct.preco);
        }
      if (this.itensProductSource.length === 0) {
        this.cancelarClick();
      }
    }).catch(() => {
      console.log('Erro ao carregar lista');
    });
  }

  ngOnInit() {
  }

  async abrirPopover(idItem: string) {
    const modal = await this.popoverController.create({
      component: OpcoesItemPedidoPage,
      componentProps: {
        idItemProduct: idItem
      }
    });
    modal.onDidDismiss().finally( () => {
      this.atualizarlistagemProdutos();
    });
    modal.present();
  }

  cancelarClick() {
    this.navCtrl.back();
  }

  realizarPedido() {
    this.orderService.realizarPedido();
  }
}
