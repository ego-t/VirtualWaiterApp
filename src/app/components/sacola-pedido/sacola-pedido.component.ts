import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sacola-pedido',
  templateUrl: './sacola-pedido.component.html',
  styleUrls: ['./sacola-pedido.component.scss'],
})
export class SacolaPedidoComponent implements OnInit {

  constructor(private router: Router) { }

  abrirPaginaPedido(){
    this.router.navigate(['/pedido'])
  }

  ngOnInit() {}

}
