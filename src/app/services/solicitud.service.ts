import {Injectable} from '@angular/core';
import {enviroment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {SolicitudEntity} from "../models/solicitud.entity";
import {ClienteEntity} from "../models/cliente.entity";

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  apiUrl = enviroment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getSolicitudes(): Observable<SolicitudEntity[]> {
    return this.http.get(`${this.apiUrl}/solicitudes`).pipe(
      map(response => response as SolicitudEntity[]),
    );
  }

  getSolicitudesByCliente(clienteId: number):Observable<SolicitudEntity[]> {
    return this.http.get(`${this.apiUrl}/solicitudes/byPersona/` + clienteId).pipe(
      map(response => response as SolicitudEntity[]),
    );
  }

  save(solicitud: SolicitudEntity): Observable<SolicitudEntity> {
    return this.http.post(`${this.apiUrl}/solicitudes`, solicitud).pipe(
      map(response => response as SolicitudEntity),
    );
  }

  update(solicitud: SolicitudEntity): Observable<SolicitudEntity> {
    return this.http.put(`${this.apiUrl}/solicitudes/`+solicitud.idSolicitud, solicitud).pipe(
      map(response => response as SolicitudEntity),
    );
  }

}
