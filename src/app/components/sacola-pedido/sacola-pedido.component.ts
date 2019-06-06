import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sacola-pedido',
  templateUrl: './sacola-pedido.component.html',
  styleUrls: ['./sacola-pedido.component.scss'],
})
export class SacolaPedidoComponent implements OnInit {

  @Input() ValorTotalPedido: number;

  constructor(private router: Router) { }

  abrirPaginaPedido() {
    this.router.navigate(['/pedido']);
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    alert('OnInit chamdo');
  }

  eventoAtualizarSacola() {
    alert('eita lele');
  }

}
