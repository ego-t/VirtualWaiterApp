import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estabelecimento',
  templateUrl: './estabelecimento.page.html',
  styleUrls: ['./estabelecimento.page.scss'],
})
export class EstabelecimentoPage implements OnInit {
  public produtos: Array<{ id:number;  nome: string; descricao: string; preco: string; imageURL: string }> = [];
  private nomeEstabelecimento: String;

  constructor(private route: ActivatedRoute) {
    for (let i = 1; i < 21; i++) {
      this.produtos.push({
        id: i,
        nome: 'Wiki Mac ' + i,
        descricao: 'Pão, hamburguer, Alface, Ketchup, Frango e Tomate',
        preco : '12,00',
        imageURL: "https://pm1.narvii.com/6397/3f28d6c6977ee9268e7534da29cd54fce702d929_128.jpg"
      });
    }
  }

  ngOnInit() {
    this.nomeEstabelecimento = this.route.snapshot.paramMap.get('id');
  }

}
