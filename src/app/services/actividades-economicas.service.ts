import { Injectable } from '@angular/core';
import {enviroment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ClienteEntity} from "../models/cliente.entity";
import {ActividadEconomica} from "../models/actividad_economica.entity";

@Injectable({
  providedIn: 'root'
})
export class ActividadesEconomicasService {

  apiUrl = enviroment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getActividades(): Observable<ActividadEconomica[]> {
    return this.http.get(`${this.apiUrl}/actividades-economicas`).pipe(
      map(response => response as ActividadEconomica[]),
    );
  }
}
