import { Alerta } from './../Utils/Alerta';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IonLabel } from '@ionic/angular';

import { DatabaseService, Produto } from './../../app/services/database.service';

@Component({
  selector: 'app-item-cardapio',
  templateUrl: './item-cardapio.page.html',
  styleUrls: ['./item-cardapio.page.scss', './../style/EstiloPadrao.scss'],
})
export class ItemCardapioPage implements OnInit {

  newItem: Produto;

  qtdItem = 0;
  observacao = '';

  pedido = {};

  mudouPedido = new EventEmitter();

  constructor(private router: Router, public db: DatabaseService, private alerta: Alerta) { }

  ngOnInit() {
    this.qtdItem = 0;
  }

  addQtd() {
    this.qtdItem += 1;
    this.mudouPedido.emit();
  }

  removerQtd() {
    if (this.qtdItem > 0) {
      this.qtdItem -= 1;
    }
    this.mudouPedido.emit();
  }


  adicionarItem() {

      this.newItem = new Produto();
      console.log(this.newItem);
      this.newItem.id = 1;
      this.newItem.nome = 'Wiki Mac';
      this.newItem.descricao = 'testeteste';
      this.newItem.preco = 10;
      this.db.addProduto(this.newItem).then(() => {
        this.router.navigate(['/estabelecimento/1']);
      }).catch( (err) => {
        this.alerta.showAlert('Erro', err.message);
      });
      // this.db.addProduto(this.newItem);
      // this.newItem.id = 2;
      // this.newItem.nome = 'teste2';
      // this.db.addProduto(this.newItem);
  }
}
