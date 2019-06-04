import { DatabaseService , Produto } from './../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, NavController } from '@ionic/angular';
import { OpcoesItemPedidoPage } from '../pages/opcoes-item-pedido/opcoes-item-pedido.page';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss', './../style/EstiloPadrao.scss'],
})
export class PedidoPage implements OnInit {

  public produtos: Produto[] = [];
  totalPedido = 0;

  constructor(private navCtrl: NavController , private db: DatabaseService, public popoverController: PopoverController) {
    this.atualizarlistagemProdutos();
  }

  ionViewDidEnter() {
    this.atualizarlistagemProdutos();
  }

  atualizarlistagemProdutos() {
    this.produtos = [];
    this.totalPedido = 0;

    this.db.getProdutos().then((produtosdb: Produto[]) => {
      for (const produto of produtosdb) {
          produto.foto = 'https://pm1.narvii.com/6397/3f28d6c6977ee9268e7534da29cd54fce702d929_128.jpg';
          this.produtos.push(produto);
          this.totalPedido += produto.preco;
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
        idProduto: idItem
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
}
