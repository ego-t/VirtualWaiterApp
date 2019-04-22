import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-estabelecimento',
  templateUrl: './lista-estabelecimento.component.html',
  styleUrls: ['./lista-estabelecimento.component.scss'],
})
export class ListaEstabelecimentoComponent implements OnInit {

  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];

  public items: Array<{ title: string; note: string; icon: string }> = [];
  
  constructor() {
    for (let i = 1; i < 21; i++) {
      this.items.push({
        title: 'Restaurante ' + i,
        note: 'Aberto',
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
   }

  ngOnInit() {}

}
