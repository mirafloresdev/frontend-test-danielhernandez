import { Injectable } from '@angular/core';
import {enviroment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {EstadoCivil} from "../models/estado_civil.entity";

@Injectable({
  providedIn: 'root'
})
export class EstadosCivilService {

  apiUrl = enviroment.apiUrl;

  constructor(private http: HttpClient) { }

  getEstadosCivil():Observable<EstadoCivil[]> {
    return this.http.get(`${this.apiUrl}/estadoCivil`).pipe(map(response => response as EstadoCivil[]),);
  }
}
