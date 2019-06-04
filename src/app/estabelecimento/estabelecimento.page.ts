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
  textoPesquisa = '';

  public produtosMock: Array<{ id: number; nome: string; descricao: string; preco: string; imageURL: string }> = [];
  public produtos: Array<{ id: number; nome: string; descricao: string; preco: string; imageURL: string }> = [];
  idEstabelecimento: string;
  nomeEstabelecimento: string;

  constructor(private route: ActivatedRoute, private router: Router, public modalController: ModalController,
    public db: DatabaseService) {
    this.addProdutosMock();
    this.filtrarPesquisa();
    this.nomeEstabelecimento = 'Wiki Donalds';
  }

  addProdutosMock() {
    this.produtosMock.push({
      id: 1,
      nome: 'Wiki Mac ',
      descricao: 'Pão, hamburguer, Alface, Ketchup, Frango e Tomate',
      preco: '12,00',
      imageURL: 'https://pm1.narvii.com/6397/3f28d6c6977ee9268e7534da29cd54fce702d929_128.jpg'
    });
    this.produtosMock.push({
      id: 2,
      nome: 'Wiki Quart ',
      descricao: 'Pão, hamburguer, Ketchup, Frango e Tomate',
      preco: '14,00',
      imageURL: 'https://pm1.narvii.com/6397/3f28d6c6977ee9268e7534da29cd54fce702d929_128.jpg'
    });
    this.produtosMock.push({
      id: 3,
      nome: 'Wiki Lanche',
      descricao: 'Pão, 2 x hamburguer, Alface, Ketchup, Frango e Tomate',
      preco: '16,00',
      imageURL: 'https://pm1.narvii.com/6397/3f28d6c6977ee9268e7534da29cd54fce702d929_128.jpg'
    });
    this.produtosMock.push({
      id: 4,
      nome: 'Wiki Fish',
      descricao: 'Pão, peixe, Alface, Ketchup, Frango e Tomate',
      preco: '21,00',
      imageURL: 'https://pm1.narvii.com/6397/3f28d6c6977ee9268e7534da29cd54fce702d929_128.jpg'
    });
  }

  ngOnInit() {
    this.idEstabelecimento = this.route.snapshot.paramMap.get('id');
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
    this.db.getTotalPedido().then(valorRetorno => {
      console.log('Valor pedido atualizado ' + valorRetorno);
      this.valorPedido = valorRetorno;
    });
  }

  filtrarPesquisa() {
    this.produtos = [];

    this.produtosMock.forEach(element => {
      if (element.nome.toLowerCase().indexOf(this.textoPesquisa.toLowerCase()) >= 0 || this.textoPesquisa === '') {
        this.produtos.push(element);
      }
    });
  }

  changeSearchBar(sender: { detail: { value: string; }; }) {
    this.textoPesquisa = sender.detail.value;
    this.filtrarPesquisa();
  }
}
