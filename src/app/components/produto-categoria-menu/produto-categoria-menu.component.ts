import { ProdutoService } from './../../services/produto.service';
import { Component, OnInit } from '@angular/core';
import { ProdutoCategoria } from 'src/app/common/produto-categoria';

@Component({
  selector: 'app-produto-categoria-menu',
  templateUrl: './produto-categoria-menu.component.html',
  styleUrls: ['./produto-categoria-menu.component.scss']
})
export class ProdutoCategoriaMenuComponent implements OnInit {


  produtoCatogorias?: ProdutoCategoria[];



  constructor(private produtoService: ProdutoService) { }

  ListaProdutoCatogorias() {
    this.produtoService.getProdutosCategorias().subscribe(
      data => {
        // update when click route link
          
        this.produtoCatogorias = data;
          }
    );
  }


  ngOnInit(): void {
    this.ListaProdutoCatogorias();

  }

}
