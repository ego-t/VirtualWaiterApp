import { DatabaseService ,Produto } from './../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  public produtos: Produto[] = [];

  constructor(private router: Router, private db: DatabaseService) { 

    db.getProdutos().then((produtosdb: Produto[]) => {
        for (const produto of produtosdb) {
            produto.nome = "X-Salada";
            produto.foto = "https://pm1.narvii.com/6397/3f28d6c6977ee9268e7534da29cd54fce702d929_128.jpg";
            produto.preco = 10.2;
            produto.descricao = "Pão, tomate, queijo, ovo, queijo, tomate, alface, milho, batata palha. (Favor inserir o numero nas observações.)"
            this.produtos.push(produto);
          }
      }).catch(() => {
        console.log('Erro ao carregar lista');
      });
  }

  ngOnInit() {
  }

  goTo(idItem: string){
    this.router.navigate(['/estabelecimento/' + idItem])
  }

}
