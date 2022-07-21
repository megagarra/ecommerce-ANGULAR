import { Consumidores } from './../../common/consumidores';
import { ProdutoService } from './../../services/produto.service';
import { Component, OnInit } from '@angular/core';

import { Produto } from 'src/app/common/produto';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { ItemCarrinho } from 'src/app/common/item-carrinho';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.scss'],
})
export class ListaProdutoComponent implements OnInit {
  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private carrinhoService: CarrinhoService
  ) {}


  produtos?: Produto[];
  categoriaId?: number;
  pesquisarItem?: boolean;
  consumidores?: Consumidores[];


 listAll() {
    this.produtoService.listAll().subscribe(
      data => {
        this.produtos = data;
      }

    );
  }

  handleListProdutos() {
    const getCategoriaId: boolean = this.route.snapshot.paramMap.has('id');
    if (getCategoriaId) {

      this.categoriaId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.categoriaId = 1;
      this.produtoService.listAll().subscribe((data) => {
        this.produtos = data;
      });
    }
    this.produtoService.listar(this.categoriaId).subscribe((data) => {
      this.produtos = data;
    });
  }

  handleProcuraProdutos() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    this.produtoService.procuraProdutos(theKeyword).subscribe((data) => {
      this.produtos = data;
    });
  }


  listaProdutos() {
    this.pesquisarItem = this.route.snapshot.paramMap.has('keyword');
    this.categoriaId = +this.route.snapshot.paramMap.get('id')!;

    if (this.pesquisarItem) {
      this.handleProcuraProdutos();
    }
    if (this.categoriaId) {
      this.handleListProdutos();
    }

    else  {
      this.produtoService.listAll().subscribe((data) => {
        this.produtos = data;
      });
    }
  }




  addToCart(produto: Produto) {

    const itemCarrinho = new ItemCarrinho(produto);
    this.carrinhoService.addToCart(itemCarrinho);
  }

  ngOnInit(): void {


    this.route.paramMap.subscribe(() => {
      this.listaProdutos();
    });








  }
}
