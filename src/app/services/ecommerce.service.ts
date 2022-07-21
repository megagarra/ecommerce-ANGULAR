import { Estado } from './../common/estado';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Pais } from '../common/pais';

@Injectable({
  providedIn: 'root',
})
export class EcommerceService {
  private paisUrl = `${API_CONFIG.baseUrl.prod}/pais`;
  private estadoUrl = `${API_CONFIG.baseUrl.prod}/estadoes`;

  constructor(private httpClient: HttpClient) {}

  getEstados(code: string): Observable<Estado[]> {
    const estadoUrl = `${this.estadoUrl}/search/findByPaisCode?code=${code}`;
    return this.httpClient.get<GetResponseEstado>(estadoUrl).pipe(
      map(response => response._embedded.estadoes)
    );
  }

  getEstado(): Observable<Estado[]> {
    return this.httpClient.get<GetResponseEstado>(this.estadoUrl).pipe(
      map(response => response._embedded.estadoes)
    );
  }

  getPaises(): Observable<Pais[]> {
    return this.httpClient
      .get<GetResponsePais>(this.paisUrl)
      .pipe(
        map(response => response._embedded.pais));
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    const data: number[] = [];
    for (let i = startMonth; i <= 12; i++) {
      data.push(i);
    }
    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    const data: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    for (let i = startYear; i <= endYear; i++) {
      data.push(i);
    }
    return of(data);
  }
}

interface GetResponsePais {
  _embedded: {
    pais: Pais[];
  };
}

interface GetResponseEstado {
  _embedded: {
    estadoes: Estado[];
  };
}

