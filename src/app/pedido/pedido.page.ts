import { DatabaseService , Produto } from './../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from '../pages/popover/popover.page';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss', './../style/EstiloPadrao.scss'],
})
export class PedidoPage implements OnInit {

  public produtos: Produto[] = [];

  constructor(private router: Router, private db: DatabaseService, public popoverController: PopoverController) {

    db.getProdutos().then((produtosdb: Produto[]) => {
        for (const produto of produtosdb) {
            produto.foto = 'https://pm1.narvii.com/6397/3f28d6c6977ee9268e7534da29cd54fce702d929_128.jpg';
            this.produtos.push(produto);
          }
      }).catch(() => {
        console.log('Erro ao carregar lista');
      });
  }

  ngOnInit() {
  }

  async abrirPopover(idItem: string) {
    const modal = await this.popoverController.create({
      component: PopoverPage
    });
    this.router.navigate(['/estabelecimento/' + idItem]);
  }
}
