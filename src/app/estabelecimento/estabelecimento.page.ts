import { Alerta } from 'src/app/Utils/Alerta';
import { Session } from './../models/Session';
import { Menu } from './../models/Menu';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, LoadingController } from '@ionic/angular';
import { InfoEstabelecimentoPage } from '../info-estabelecimento/info-estabelecimento.page';
import { DatabaseService } from '../services/database.service';
import { EstablishmentService } from '../services/Establishment.service';
import { Establishment } from '../models/Establishment';
import { OrderService, CurrentOrder } from '../services/order.service';

@Component({
  selector: 'app-estabelecimento',
  templateUrl: './estabelecimento.page.html',
  styleUrls: ['./estabelecimento.page.scss'],
})
export class EstabelecimentoPage implements OnInit {
  private loading;
  private emCarregamento;
  arrayPos = 0;
  valorPedido = 0;
  textoPesquisa = '';
  codigoMesa = '';
  numComanda = '';
  permiteVizualizarCarrinho = false;
  permiteAdicionar = false;
  avaliacaoMedia = '';
  currentOrder: CurrentOrder;
  estabelecimento: Establishment;
  menu: Menu;
  secoesEstabelecimento: Array<Session> = [];
  secoesApi: Array<Session> = [];

  public produtosMock: Array<{ id: number; nome: string; descricao: string; preco: string; imageURL: string }> = [];
  public produtos: Array<{ id: number; nome: string; descricao: string; preco: string; imageURL: string }> = [];
  idEstabelecimento = 0;
  private nomeEstabelecimento = '';
  private urlLogoEstabelecimento = './../../assets/icon/logoApp.png';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public modalController: ModalController,
    public dataBaseService: DatabaseService, private establishmentApi: EstablishmentService,
    public loadingController: LoadingController, private orderService: OrderService,
    private alerta: Alerta) {
      this.emCarregamento = true;
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadInfoEstablishment();
    this.atualizarTotalPedido();
    this.atualizarVisibilidadeCarrinho();
    this.atualizarInfoComandaMesa();
  }
  atualizarInfoComandaMesa() {
    const currentOrder = this.orderService.getCurrentOrder();
    if (currentOrder.table) {
      this.codigoMesa = currentOrder.table.numero.toString();
    }
    if (currentOrder.control) {
      this.numComanda = currentOrder.control.id.toString();
    }
  }
  atualizarVisibilidadeCarrinho() {
    this.currentOrder = this.orderService.getCurrentOrder();
    if (this.currentOrder) {
      this.permiteVizualizarCarrinho = (this.currentOrder.establishment.id === this.idEstabelecimento);

      if (this.permiteVizualizarCarrinho) {
        this.dataBaseService.getTotalPedido().then( (valor) => {
          this.permiteVizualizarCarrinho = (valor > 0);
        });
      }
    } else {
      this.permiteVizualizarCarrinho = false;
    }
  }

  async loadInfoEstablishment() {
  //    this.presentLoading();

    this.orderService.updateOrder();

    this.idEstabelecimento = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    await this.establishmentApi.getById(this.idEstabelecimento).subscribe((data) => {
      if (data[this.arrayPos] != null) {
        this.estabelecimento = data[this.arrayPos];
        this.menu = data[this.arrayPos].cardapio;
        this.secoesApi = this.menu.secoes;
        this.nomeEstabelecimento = this.estabelecimento.nome;
        this.urlLogoEstabelecimento = this.estabelecimento.logo;
        this.avaliacaoMedia = this.estabelecimento.avaliacaomedia.toString();
        this.dataBaseService.setEstablishmentPage(this.estabelecimento);
        this.filtrarPesquisa();
        //this.loading.dismiss();
        this.emCarregamento = false;
      }
    });
  }

  goTo(idProduto: string) {
    this.permiteAdicionar = true;
    const currentOrder = this.orderService.getCurrentOrder();
    this.idEstabelecimento = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (currentOrder) {
      if (currentOrder.establishment.id !== this.idEstabelecimento) {
        this.permiteAdicionar = false;
      }
    }

    if (this.permiteAdicionar) {
      this.router.navigate(['/item-cardapio/' + idProduto]);
    } else {
      this.alerta.showAlert('Ação não permitida', 'Existe uma comanda aberta em outro estabelecimento');
    }
  }

  async abrirInfoEstabelecimento() {
    const modal = await this.modalController.create({
      component: InfoEstabelecimentoPage,
      componentProps: {

      }
    });
    modal.present();
  }

  atualizarTotalPedido() {
    this.dataBaseService.getTotalPedido().then(valorRetorno => {
      console.log('Valor pedido atualizado ' + valorRetorno);
      this.valorPedido = valorRetorno;
    });
  }

  filtrarPesquisa() {
    // Cria uma copia sem referencia de objeto
    this.secoesEstabelecimento = JSON.parse(JSON.stringify(this.secoesApi));

    this.secoesEstabelecimento.forEach(element => {
      element.produtos = element.produtos.filter(produto => produto.nome.toLowerCase().indexOf(this.textoPesquisa.toLowerCase()) !== -1);
    });
  }

  changeSearchBar(sender: { detail: { value: string; }; }) {
    this.textoPesquisa = sender.detail.value;
    this.filtrarPesquisa();
  }

  presentLoading() {
    this.loadingController.create({
      message: 'Carregando',
    }).then( (overlay) => {
      this.loading = overlay;
      this.loading.present();
    });

    setTimeout(() => {
      this.emCarregamento = false;
      this.loading.dismiss();
    }, 4000);
  }
}
