import { Alerta } from './../Utils/Alerta';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { IonLabel } from '@ionic/angular';

import { DatabaseService, Produto } from './../../app/services/database.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-cardapio',
  templateUrl: './item-cardapio.page.html',
  styleUrls: ['./item-cardapio.page.scss', './../style/EstiloPadrao.scss'],
})
export class ItemCardapioPage implements OnInit {
  id: number;
  private sub: any;
  
  newItem: Produto;

  qtdItem = 0;
  observacao = '';

  pedido = {};

  mudouPedido = new EventEmitter();

  constructor(private activatedRoute: ActivatedRoute, public db: DatabaseService, private alerta: Alerta, private router: Router) { }

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
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
      this.newItem.id = this.id;
      this.newItem.nome = 'Wiki Mac';
      this.newItem.descricao = 'testeteste';
      this.newItem.preco = 9.99;
      this.db.addProduto(this.newItem).then(() => {
        this.router.navigate(['/estabelecimento/1']);
      }).catch( (err) => {
        this.alerta.showAlert('Erro', err.message);
      });
  }
}
