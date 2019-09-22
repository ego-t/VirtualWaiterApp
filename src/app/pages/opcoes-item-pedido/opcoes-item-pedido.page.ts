import { DatabaseService } from './../../services/database.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-opcoes-item-pedido',
  templateUrl: './opcoes-item-pedido.page.html',
  styleUrls: ['./opcoes-item-pedido.page.scss'],
})
export class OpcoesItemPedidoPage implements OnInit {

  fechouPopover = new EventEmitter();
  idItemProduct = 0;
  constructor(public db: DatabaseService, private popoverCtrl: PopoverController) { }

  ngOnInit() {
  }

  removerItem() {
    this.db.deleteItemProduct(this.idItemProduct);
    this.popoverCtrl.dismiss();
    this.fechouPopover.emit();
  }

}
