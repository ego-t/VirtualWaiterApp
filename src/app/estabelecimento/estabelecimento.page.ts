import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estabelecimento',
  templateUrl: './estabelecimento.page.html',
  styleUrls: ['./estabelecimento.page.scss'],
})
export class EstabelecimentoPage implements OnInit {
  private nomeEstabelecimento: String;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.nomeEstabelecimento = this.route.snapshot.paramMap.get('id');
  }

}
