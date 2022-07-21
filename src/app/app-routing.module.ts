import { CarrinhoDetalheComponent } from './components/carrinho-detalhe/carrinho-detalhe.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProdutoComponent } from './components/lista-produto/lista-produto.component';
import { ProdutoDetalheComponent } from './components/produto-detalhe/produto-detalhe.component';
import { ChekoutComponent } from './components/chekout/chekout.component';

const routes: Routes = [
  {path:'checkout', component: ChekoutComponent},
  {path: 'carrinho-detalhe', component: CarrinhoDetalheComponent},
  {path: 'produtos/:id', component: ProdutoDetalheComponent},
  {path: 'pesquisar/:keyword', component: ListaProdutoComponent},
  {path: 'categoria/:id', component: ListaProdutoComponent},
  {path: 'categoria', component: ListaProdutoComponent},
  {path: 'produtos', component: ListaProdutoComponent},
  {path: '', redirectTo: '/produtos', pathMatch: 'full'},
  {path: '**', redirectTo: '/produtos', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
