import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.scss']
})
export class PesquisarComponent implements OnInit {

  constructor(private router: Router) { }

  pesquisar(value: string){
    console.log(`value:${value}`);
    this.router.navigateByUrl(`/pesquisar/${value}`);
  }

  ngOnInit(): void {
  }

}
