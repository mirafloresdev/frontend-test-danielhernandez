import {ClienteEntity} from "./cliente.entity";

export class EstadoCivil {
  idEstadoCivil!: number;
  descripcion!: string;
  personas!: ClienteEntity[];
}
