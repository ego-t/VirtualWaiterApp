import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Alerta } from 'src/app/Utils/Alerta';
import { Establishment } from 'src/app/models/Establishment';

@Component({
  selector: 'app-lista-estabelecimento',
  templateUrl: './lista-estabelecimento.component.html',
  styleUrls: ['./lista-estabelecimento.component.scss'],
})
export class ListaEstabelecimentoComponent implements OnInit {

  @Input() public estabelecimentos: Establishment[];

  private icons = [
    'https://images.vexels.com/media/users/3/128437/isolated/preview/2dd809b7c15968cb7cc577b2cb49c84f-logotipo-de-restaurante-de-comida-de-pizza-by-vexels.png',
    'http://restaurantemarcos.hospedagemdesites.ws/site/wp-content/uploads/2019/04/logo2.fw_.png',
    'http://store.atendup.com.br/icones/mini/APP_ICON_2.png',
    'http://store.atendup.com.br/icones/mini/APP_ICON_3.png',
    'http://store.atendup.com.br/icones/mini/APP_ICON_4.png',
    'http://store.atendup.com.br/icones/mini/APP_ICON_5.png',
    'http://store.atendup.com.br/icones/mini/APP_ICON_6.png',
    'http://store.atendup.com.br/icones/mini/APP_ICON_7.png',
    'http://store.atendup.com.br/icones/mini/APP_ICON_8.png'
  ];

  public items: Array<{ id: number;  title: string; note: string; icon: string }> = [];

  constructor(private http: HttpClient, private router: Router, private alerta: Alerta) {
    for (let i = 1; i < 21; i++) {
      this.items.push({
        id: i,
        title: 'Restaurante ' + i,
        note: 'Aberto',
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  goTo(idItem: string) {
    try {
      this.router.navigate(['/estabelecimento/' + idItem]);
    } catch (e) {
      this.alerta.showAlert('Ops', e);
    }
  }

  ngOnInit() {
    console.log('entrou na lista estabelecimento');
   }

}
