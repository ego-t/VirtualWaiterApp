import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',           redirectTo: 'login', pathMatch: 'full'},
  { path: 'home',       loadChildren: './home/home.module#HomePageModule' },
  { path: 'list',       loadChildren: './list/list.module#ListPageModule' },
  { path: 'login',      loadChildren: './login/login.module#LoginPageModule' },
  { path: 'cadastro',   loadChildren: './cadastro/cadastro.module#CadastroPageModule' },
  { path: 'estabelecimento/:id', loadChildren: './estabelecimento/estabelecimento.module#EstabelecimentoPageModule' },
  { path: 'item-cardapio/:id', loadChildren: './item-cardapio/item-cardapio.module#ItemCardapioPageModule' },
  { path: 'pedido', loadChildren: './pedido/pedido.module#PedidoPageModule' },
  { path: 'info-estabelecimento', loadChildren: './info-estabelecimento/info-estabelecimento.module#InfoEstabelecimentoPageModule' },
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' },
  { path: 'privacidade', loadChildren: './privacidade/privacidade.module#PrivacidadePageModule' },
  { path: 'termos-de-uso', loadChildren: './termos-de-uso/termos-de-uso.module#TermosDeUsoPageModule' },
  { path: 'login-externo', loadChildren: './login-externo/login-externo.module#LoginExternoPageModule' },
  { path: 'buscar-mesa', loadChildren: './buscar-mesa/buscar-mesa.module#BuscarMesaPageModule' },
  { path: 'lista-comanda', loadChildren: './lista-comanda/lista-comanda.module#ListaComandaPageModule' },
  { path: 'confirmar-estabelecimento',
  loadChildren: './confirmar-estabelecimento/confirmar-estabelecimento.module#ConfirmarEstabelecimentoPageModule' },
  { path: 'consulta-comanda/:id', loadChildren: './consulta-comanda/consulta-comanda.module#ConsultaComandaPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
