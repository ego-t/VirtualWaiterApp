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

  constructor(private http: HttpClient, private router: Router, private alerta: Alerta) {
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
