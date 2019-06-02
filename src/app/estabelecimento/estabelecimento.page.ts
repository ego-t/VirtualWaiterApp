import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { InfoEstabelecimentoPage } from '../info-estabelecimento/info-estabelecimento.page';
import { database } from 'firebase';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-estabelecimento',
  templateUrl: './estabelecimento.page.html',
  styleUrls: ['./estabelecimento.page.scss'],
})
export class EstabelecimentoPage implements OnInit {

  valorPedido = 0;
  
  public produtos: Array<{ id: number;  nome: string; descricao: string; preco: string; imageURL: string }> = [];
  private nomeEstabelecimento: String;

  constructor(private route: ActivatedRoute, private router: Router, public modalController: ModalController,
    public db: DatabaseService) {
    for (let i = 1; i < 21; i++) {
      this.produtos.push({
        id: i,
        nome: 'Wiki Mac ' + i,
        descricao: 'Pão, hamburguer, Alface, Ketchup, Frango e Tomate',
        preco : '12,00',
        imageURL: 'https://pm1.narvii.com/6397/3f28d6c6977ee9268e7534da29cd54fce702d929_128.jpg'
      });
    }
  }

  ngOnInit() {
    this.nomeEstabelecimento = this.route.snapshot.paramMap.get('id');
  }

  ionViewDidEnter() {
    this.atualizarTotalPedido();
  }

  goTo(idProduto: string) {
    this.router.navigate(['/item-cardapio/' + idProduto]);
  }

  async abrirInfoEstabelecimento() {
    const modal = await this.modalController.create({
      component: InfoEstabelecimentoPage
    });
    modal.present();
  }

  atualizarTotalPedido() {
      this.db.getTotalPedido().then( valorRetorno => {
        console.log('Valor pedido atualizado ' + valorRetorno);
        this.valorPedido = valorRetorno;
      });
  }
}
