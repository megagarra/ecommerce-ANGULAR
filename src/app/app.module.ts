import { ProdutoService } from './services/produto.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { ListaProdutoComponent } from './components/lista-produto/lista-produto.component';
import { LOCALE_ID } from '@angular/core';

import {Routes, RouterModule} from '@angular/router';
import { ProdutoCategoriaMenuComponent } from './components/produto-categoria-menu/produto-categoria-menu.component';
import { PesquisarComponent } from './components/pesquisar/pesquisar.component';
import { ProdutoDetalheComponent } from './components/produto-detalhe/produto-detalhe.component';
import { StatusCarrinhoComponent } from './components/status-carrinho/status-carrinho.component';
import { CarrinhoDetalheComponent } from './components/carrinho-detalhe/carrinho-detalhe.component';
import { ChekoutComponent } from './components/chekout/chekout.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    ListaProdutoComponent,
    ProdutoCategoriaMenuComponent,
    PesquisarComponent,
    ProdutoDetalheComponent,
    StatusCarrinhoComponent,
    CarrinhoDetalheComponent,
    ChekoutComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [ProdutoService, {provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
