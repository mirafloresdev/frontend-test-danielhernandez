import {ClienteEntity} from "./cliente.entity";

export class ActividadEconomica {
  idActividadEconomica!: number;
  descripcion!: string;
  personas!: ClienteEntity[];
}
