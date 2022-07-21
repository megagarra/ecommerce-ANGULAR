import { TestBed } from '@angular/core/testing';

import { CarrinhoDetalheService } from './carrinho-detalhe.service';

describe('CarrinhoDetalheService', () => {
  let service: CarrinhoDetalheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrinhoDetalheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
