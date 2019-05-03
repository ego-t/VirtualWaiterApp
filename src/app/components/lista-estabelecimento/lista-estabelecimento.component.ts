import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-estabelecimento',
  templateUrl: './lista-estabelecimento.component.html',
  styleUrls: ['./lista-estabelecimento.component.scss'],
})
export class ListaEstabelecimentoComponent implements OnInit {

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

  public items: Array<{ id:number;  title: string; note: string; icon: string }> = [];

  constructor(private http: HttpClient, public navCtrl: NavController, private router: Router) {
    for (let i = 1; i < 21; i++) {
      this.items.push({
        id: i,
        title: 'Restaurante ' + i,
        note: 'Aberto',
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  btnEstabelecimentoClicked(item: JSON) {

    console.log(item);
    //this.navCtrl.navigateForward("ad",{});
  }

  btnTesteAPI(){
    var web_hook_url = 'https://hooks.slack.com/services/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';
    var slack_msg = {'text':'teste'};

    this.http.post(web_hook_url, slack_msg).subscribe((response) => {
      console.log(response.toString());
  });
  }

  goTo(idItem: string){
    this.router.navigate(['/estabelecimento/' + idItem])
  }

  ngOnInit() { }

}
