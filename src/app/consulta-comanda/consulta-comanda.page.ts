import { Control } from 'src/app/models/Control';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlService } from 'src/app/services/control.service';
import { Component, OnInit } from '@angular/core';
import { ItemProduct } from '../models/ItemProduct';
import { OrderService } from '../services/order.service';
import { Order } from '../models/Order';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-consulta-comanda',
  templateUrl: './consulta-comanda.page.html',
  styleUrls: ['./consulta-comanda.page.scss','./../style/EstiloPadrao.scss'],
})
export class ConsultaComandaPage implements OnInit {
  control: Control;
  orderSource: Order[] = [];
  arrayPos = 0;
  totalPedido = 0;
  nomeEstabelecimento = '';
  urlEstabelecimento = './../../assets/icon/logoApp.png';
  numComanda = '';
  codigoMesa = '';
  idComanda = 0;

  constructor(private orderService: OrderService,
    private controlService: ControlService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController, ) {
      this.control = {id: 0,
        enumsituacaocomanda: 1,
        horarioinicio: null,
        horariofim: null,
        consumidores: null,
        mesa: null,
        pedidos: null,
        contas: null,
        avaliacoes: null,
        responsavel: null};
     }

  ionViewDidEnter() {
    const currentOrder = this.orderService.getCurrentOrder();
    if (currentOrder) {
      if (currentOrder.table) {
        this.codigoMesa = currentOrder.table.numero.toString();
      }
      if (currentOrder.control) {
        this.numComanda = currentOrder.control.id.toString();
      }
    }
    this.atualizarlistagemProdutos();
  }

  atualizarlistagemProdutos() {

    this.orderService.updateOrder();

    const currentOrder = this.orderService.getCurrentOrder();
    this.nomeEstabelecimento = currentOrder.establishment.nome;
    this.urlEstabelecimento = currentOrder.establishment.logo;

    this.idComanda = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.idComanda === 0) {
      this.idComanda = currentOrder.control.id;
    }

    this.controlService.getById(this.idComanda).subscribe((data: Control[]) => {
      if (data[this.arrayPos] != null) {
        console.log(data[this.arrayPos]);
        this.control = data[this.arrayPos];
        this.orderSource = this.control.pedidos;

        let valorTotal = 0;
        this.control.pedidos.forEach(orders => {
          orders.itens.forEach(item => {
            valorTotal += item.preco;
          });
        });
        this.totalPedido = valorTotal;
      }
    });

    // this.db.getItensProducts().then((itensProductdb: ItemProduct[]) => {
    //   this.totalPedido = 0;
    //   for (const itemProduct of itensProductdb) {
    //       this.itensProductSource.push(itemProduct);
    //       this.totalPedido += Number(itemProduct.preco);
    //     }
    //   if (this.itensProductSource.length === 0) {
    //     this.cancelarClick();
    //   }
    // }).catch(() => {
    //   console.log('Erro ao carregar lista');
    // });
  }

  cancelarClick() {
    const currentOrder = this.orderService.getCurrentOrder();
    if (currentOrder) {
      if (currentOrder.establishment) {
        this.router.navigate(['/estabelecimento/' + currentOrder.establishment.id]);
      } else {
        this.navCtrl.back();
      }
    } else {
      this.navCtrl.back();
    }
  }

  fecharComanda() {
    const currentOrder = this.orderService.getCurrentOrder();
    this.orderService.fecharComanda(this.control, currentOrder.table);
  }

  ngOnInit() {
  }
}
