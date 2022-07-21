import { Produto } from './produto';
export class ItemCarrinho {
  id?: number;
  name?: string;
  preco_unidade?: number;
  imagem?: string;
  quantidade: number;


  constructor(produto: Produto){
    this.id = produto.id;
    this.name = produto.name;
    this.preco_unidade = produto.preco_unidade;
    this.imagem = produto.imagem;
    this.quantidade = 1;
  }

  
}
