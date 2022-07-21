import { CarrinhoService } from 'src/app/services/carrinho.service';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from './../../services/produto.service';
import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/common/produto';
import { ItemCarrinho } from 'src/app/common/item-carrinho';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.scss']
})
export class ProdutoDetalheComponent implements OnInit {

  produto: Produto = new Produto();

  constructor(private produtoService: ProdutoService, private route: ActivatedRoute, private carrinhoService: CarrinhoService) { }

  produtoDetalhe(){
    const produtoId: number = +this.route.snapshot.paramMap.get('id')!;

    this.produtoService.getProdutoDetails(produtoId).subscribe(
      data => {
        this.produto = data;
      });
  }

  addToCart(){

    console.log(`Add cart item: ${this.produto.name}, ${this.produto.preco_unidade}`);
    const theCartItem = new ItemCarrinho(this.produto);
    this.carrinhoService.addToCart(theCartItem);
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(()=> {
      this.produtoDetalhe();
    })

  }

}
