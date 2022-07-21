import { CarrinhoService } from './../../services/carrinho.service';
import { Estado } from './../../common/estado';
import { Pais } from './../../common/pais';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EcommerceService } from 'src/app/services/ecommerce.service';
import { EcommerceValidadores } from 'src/app/validadores/ecommerce-validadores';

@Component({
  selector: 'app-chekout',
  templateUrl: './chekout.component.html',
  styleUrls: ['./chekout.component.scss'],
})
export class ChekoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardyears: number[] = [];
  creditCardMonths: number[] = [];

  paises: Pais[] = [];
  estado: Estado[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private ecommerceService: EcommerceService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    this.verDeltalheDoCarrinho();

    this.checkoutFormGroup = this.formBuilder.group({
      cliente: this.formBuilder.group({
        nome: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        telefone: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ]),
      }),
      enderecoDeEntrega: this.formBuilder.group({
        rua: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        cidade: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        estado: new FormControl('', [Validators.required]),
        pais: new FormControl('', [Validators.required]),
        cep: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
      }),
      enderecoDeCobranca: this.formBuilder.group({
        rua: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        cidade: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        estado: new FormControl('', [Validators.required]),
        pais: new FormControl('', [Validators.required]),
        cep: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{16}'),
        ]),
        securityCode: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{3}'),
        ]),
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    const startMonth: number = new Date().getMonth() + 1;
    console.log(startMonth);
    this.ecommerceService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Credit Card Months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });

    this.ecommerceService.getCreditCardYears().subscribe((data) => {
      console.log('Credit Card Years: ' + JSON.stringify(data));
      this.creditCardyears = data;
    });

    this.ecommerceService.getPaises().subscribe((data) => {
      this.paises = data;
    });

    this.ecommerceService.getEstado().subscribe((data) => {
      this.estado = data;
    });
  }
  verDeltalheDoCarrinho() {
    this.carrinhoService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    this.carrinhoService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }

  //form cliente
  get nome() {
    return this.checkoutFormGroup.get('cliente.nome')!;
  }
  get telefone() {
    return this.checkoutFormGroup.get('cliente.telefone')!;
  }
  get email() {
    return this.checkoutFormGroup.get('cliente.email')!;
  }

  //form endereco de entrega
  get rua() {
    return this.checkoutFormGroup.get('enderecoDeEntrega.rua')!;
  }
  get cidade() {
    return this.checkoutFormGroup.get('enderecoDeEntrega.cidade')!;
  }
  get estados() {
    return this.checkoutFormGroup.get('enderecoDeEntrega.estado')!;
  }
  get pais() {
    return this.checkoutFormGroup.get('enderecoDeEntrega.pais')!;
  }

  get cep() {
    return this.checkoutFormGroup.get('enderecoDeEntrega.cep')!;
  }

  //form endeco de cobranca
  get ruaCobranca() {
    return this.checkoutFormGroup.get('enderecoDeCobranca.rua')!;
  }
  get cidadeCobranca() {
    return this.checkoutFormGroup.get('enderecoDeCobranca.cidade')!;
  }
  get estadoCobranca() {
    return this.checkoutFormGroup.get('enderecoDeCobranca.estado')!;
  }
  get paisCobranca() {
    return this.checkoutFormGroup.get('enderecoDeCobranca.pais')!;
  }
  get cepCobranca() {
    return this.checkoutFormGroup.get('enderecoDeCobranca.cep')!;
  }

  //form credit card

  get cardType() {
    return this.checkoutFormGroup.get('creditCard.cardType')!;
  }
  get nameOnCard() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard')!;
  }
  get cardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber')!;
  }
  get securityCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode')!;
  }

  get expirationMonth() {
    return this.checkoutFormGroup.get('creditCard.expirationMonth')!;
  }

  get expirationYear() {
    return this.checkoutFormGroup.get('creditCard.expirationYear')!;
  }

  // getEstados(formGroupName: string){
  //   const formGroup = this.checkoutFormGroup.get(formGroupName);
  //   const paisCode = formGroup!.value.pais.code;
  //   const paisNome = formGroup!.value.pais.nome;

  //   this.ecommerceService.getEstados(paisCode).subscribe(  data => {

  //     if(formGroupName === 'enderecoDeEntrega'){
  //       this.enderecoDeEntrega = data;
  //     }
  //     else{
  //       this.enderecoDeCobranca = data;
  //     }
  //     formGroup!.get('estado')!.setValue(data[0]);
  //   }
  //   );
  // }

  copyShippingToBillingAddress(event: Event) {
    const ischecked = (<HTMLInputElement>event.target).checked;
    if (ischecked) {
      this.checkoutFormGroup.controls['enderecoDeCobranca'].setValue(
        this.checkoutFormGroup.controls['enderecoDeEntrega'].value
      );
    } else {
      this.checkoutFormGroup.controls['enderecoDeCobranca'].reset();
    }
  }

  onSubmit() {
    console.log('Teste');
    console.log(this.checkoutFormGroup.get('cliente')!.value);
    console.log(
      'The email address is ' +
        this.checkoutFormGroup.get('enderecoDeEntrega')!.value
    );
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard')!;
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup.value.expirationYear
    );

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.ecommerceService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Credit Card Months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });
  }
}
