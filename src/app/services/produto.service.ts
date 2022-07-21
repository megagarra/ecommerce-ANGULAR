import { Consumidores } from './../common/consumidores';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Produto } from '../common/produto';
import { ProdutoCategoria } from '../common/produto-categoria';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {

  private baseUrl = `${API_CONFIG.baseUrl.prod}/produtoes`;
  private categoriaUrl = `${API_CONFIG.baseUrl.prod}/produto-categoria`;
  private consumidor = `${API_CONFIG.baseUrl.prod}/service/consumidores`;

  constructor(private httpClient: HttpClient) {}

  getProdutoDetails(produtoId: number): Observable<Produto> {
    const produtoUrl = `${this.baseUrl}/${produtoId}`;
    return this.httpClient.get<Produto>(produtoUrl);

  }

  procuraProdutos(Keyword: string): Observable<Produto[]> {
    let searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${Keyword}`;

    return this.getProdutos(searchUrl);
  }

  findAll(): Observable<Consumidores[]> {
    return this.httpClient.get<Consumidores[]>(this.consumidor);
   }


  listConsumidores(): Observable<Consumidores[]> {
    return this.httpClient.get<GetResponseConsumidores>(this.consumidor)
      .pipe(map((response) => response._embedded.consumidores));
  }


  private getProdutos(searchUrl: string): Observable<Produto[]> {
    return this.httpClient
      .get<GetResponseProdutos>(searchUrl)
      .pipe(map((response) => response._embedded.produtoes));
  }

  listAll(): Observable<Produto[]> {
    return this.httpClient.get<GetResponseProdutos>(this.baseUrl)
      .pipe(map((response) => response._embedded.produtoes));

  }

  getProdutosCategorias(): Observable<ProdutoCategoria[]> {
    return this.httpClient
      .get<GetResponseProdutoCategoria>(this.categoriaUrl)
      .pipe(map((response) => response.produtoCategoria));
  }

  listar(aCategoriaId: number): Observable<Produto[]> {
    let searchUrl = `${this.baseUrl}/search/findByCategoriaId?id=${aCategoriaId}`;

    return this.getProdutos(searchUrl);
  }
}

interface GetResponseProdutos {
  _embedded: {
    produtoes: Produto[];
  };
}

interface GetResponseProdutoCategoria {

    produtoCategoria: ProdutoCategoria[];

}

interface GetResponseConsumidores {
  _embedded: {
    consumidores: Consumidores[];
  };
}
