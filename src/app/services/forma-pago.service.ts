import { Injectable } from '@angular/core';
import {enviroment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {EstadoCivil} from "../models/estado_civil.entity";
import {FormaPagoEntity} from "../models/forma_pago.entity";

@Injectable({
  providedIn: 'root'
})
export class FormaPagoService {

  apiUrl = enviroment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getFormasPago():Observable<FormaPagoEntity[]> {
    return this.http.get(`${this.apiUrl}/formasPago`).pipe(map(response => response as FormaPagoEntity[]),);
  }
}
