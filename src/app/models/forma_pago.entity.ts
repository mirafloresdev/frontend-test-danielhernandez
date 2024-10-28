import {SolicitudEntity} from "./solicitud.entity";

export class FormaPagoEntity {
  idFormaPago!: number;
  descripcion!: string;
  solicitudes!: SolicitudEntity[];
}
