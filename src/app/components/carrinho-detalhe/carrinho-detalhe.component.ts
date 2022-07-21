import { CarrinhoService } from 'src/app/services/carrinho.service';
import { ItemCarrinho } from 'src/app/common/item-carrinho';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrinho-detalhe',
  templateUrl: './carrinho-detalhe.component.html',
  styleUrls: ['./carrinho-detalhe.component.scss']
})
export class CarrinhoDetalheComponent implements OnInit {

  cartitems: ItemCarrinho[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private carrinhoService: CarrinhoService ) { }

  ngOnInit(): void {

    this.listCartDetails();
  }


  listCartDetails() {

    this.cartitems = this.carrinhoService.cartItems;
    this.carrinhoService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.carrinhoService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.carrinhoService.computeCartTotals();

  }

  incrementQuantity(item: ItemCarrinho) {

      this.carrinhoService.addToCart(item);

    }

    decrementQuantity(item: ItemCarrinho) {
        this.carrinhoService.decrementQuantity(item);
      }

    remove(item: ItemCarrinho) {
        this.carrinhoService.removeItem(item);
      }

}
