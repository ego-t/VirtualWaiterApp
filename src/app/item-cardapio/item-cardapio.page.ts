import { Alerta } from './../Utils/Alerta';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

import { DatabaseService } from './../../app/services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ItemProduct } from '../models/ItemProduct';
import { Product } from '../models/Product';

@Component({
  selector: 'app-item-cardapio',
  templateUrl: './item-cardapio.page.html',
  styleUrls: ['./item-cardapio.page.scss', './../style/EstiloPadrao.scss'],
})
export class ItemCardapioPage implements OnInit {
  id: number;

  arrayPos = 0;
  product: Product = new Product();
  qtdItem = 1;
  observacao = '';
  pedido = {};

  mudouPedido = new EventEmitter();

  constructor(private activatedRoute: ActivatedRoute, public db: DatabaseService, private alerta: Alerta,
     private router: Router, private location: Location,
     private productApi: ProductService) { }

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.qtdItem = 1;
  }

  addQtd() {
    this.qtdItem += 1;
    this.mudouPedido.emit();
  }

  removerQtd() {
    if (this.qtdItem > 1) {
      this.qtdItem -= 1;
    }
    this.mudouPedido.emit();
  }


  adicionarItem() {
      if (this.qtdItem < 1) {
        this.alerta.showAlert('', 'Informa a quantidade');
        return;
      }
      this.product.id = this.id;

      const itemProduct = new ItemProduct();
      itemProduct.entregue = false;
      itemProduct.observacoes = this.observacao;
      itemProduct.preco = this.product.preco * this.qtdItem;
      itemProduct.produto = this.product;
      itemProduct.quantidade = this.qtdItem;

      this.db.addItemProduct(itemProduct).then(() => {
        this.location.back();
      }).catch( (err) => {
        this.alerta.showAlert('Erro', err.message);
      });
  }

  ionViewDidEnter() {
    console.log('Entrou na tela Item-pedido');
    this.loadInfoProduct();
  }

  async loadInfoProduct() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    await this.productApi.getById(this.id).subscribe((data) => {
      console.log(data[this.arrayPos]);
      if (data[this.arrayPos] != null) {
        this.product = data[this.arrayPos];
        console.log(this.product);
      }
    });
  }
}
