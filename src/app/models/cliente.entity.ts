import {ActividadEconomica} from "./actividad_economica.entity";
import {EstadoCivil} from "./estado_civil.entity";

export class ClienteEntity {
    idPersona!:number;
    dui!:string;
    nit!:string;
    nombres!:string;
    apellidos!:string;
    sexo!:string;
    actividadEconomica!:ActividadEconomica;
    estadoCivil!:EstadoCivil;
}
