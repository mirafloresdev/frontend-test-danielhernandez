import {ClienteEntity} from "./cliente.entity";
import {FormaPagoEntity} from "./forma_pago.entity";

export class SolicitudEntity {
  idSolicitud!: number;
  persona!: ClienteEntity;
  fechaCreacion!: string;
  monto!: number;
  plazo!: number;
  formaPago!: FormaPagoEntity;
}
