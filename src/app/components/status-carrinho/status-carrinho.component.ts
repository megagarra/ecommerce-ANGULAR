import { CarrinhoService } from 'src/app/services/carrinho.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-carrinho',
  templateUrl: './status-carrinho.component.html',
  styleUrls: ['./status-carrinho.component.scss']
})
export class StatusCarrinhoComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {

    this.updateCartStatus();
  }
  updateCartStatus() {

    this.carrinhoService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.carrinhoService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

}
