import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {enviroment} from '../../enviroments/enviroment';
import {map, Observable} from "rxjs";
import {ClienteEntity} from "../models/cliente.entity";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiUrl = enviroment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getPersonas(): Observable<ClienteEntity[]> {
    return this.http.get(`${this.apiUrl}/personas`).pipe(
      map(response => response as ClienteEntity[]),
    );
  }

  save(cliente: ClienteEntity): Observable<ClienteEntity> {
    return this.http.post(`${this.apiUrl}/personas`, cliente).pipe(
      map(response => response as ClienteEntity),
    );
  }

  update(cliente:ClienteEntity):Observable<ClienteEntity>{
    return this.http.put(`${this.apiUrl}/personas/` + cliente.idPersona,cliente).pipe(map(response => response as ClienteEntity),);
  }
}
