import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActividadEconomica} from "../../../models/actividad_economica.entity";
import {EstadoCivil} from "../../../models/estado_civil.entity";
import {EstadosCivilService} from "../../../services/estados-civil.service";
import {ActividadesEconomicasService} from "../../../services/actividades-economicas.service";
import {ClienteEntity} from "../../../models/cliente.entity";
import {ClienteService} from "../../../services/cliente.service";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit{
  frm_cliente: FormGroup;
  actividades_economicas: ActividadEconomica[] = [];
  estados_civil: EstadoCivil[] = [];
  spin = false;
  alertsuccess = false;

  constructor(private estadoCivilService: EstadosCivilService,
              private actividadesEconomicasService: ActividadesEconomicasService,
              private clienteService: ClienteService, private mdalservice: NzModalService
  ){
    this.frm_cliente = new FormGroup({
      'dui': new FormControl('',[Validators.required]),
      'nit': new FormControl('',[Validators.required]),
      'nombres': new FormControl('',[Validators.required]),
      'apellidos': new FormControl('',[Validators.required]),
      'sexo': new FormControl(null,[Validators.required]),
      'id_actividad_economica': new FormControl(null, [Validators.required]),
      'id_estado_civil': new FormControl(null,[Validators.required]),
    });
  }

  ngOnInit() {
    this.getActividadesEconomicas();
    this.getEstadosCivil();
  }

  save(){
    this.spin = true;
    let estadoCivil = new EstadoCivil();
    estadoCivil.idEstadoCivil = this.frm_cliente.get('id_estado_civil')?.value;
    let actividad_economica = new ActividadEconomica();
    actividad_economica.idActividadEconomica = this.frm_cliente.get('id_actividad_economica')?.value;

    //llenamos datos de formulario para save en el objeto correspondiente
    let cliente = new ClienteEntity();
    cliente = this.frm_cliente.value;
    cliente.estadoCivil = estadoCivil;
    cliente.actividadEconomica = actividad_economica;

    this.clienteService.save(cliente).subscribe({
      next:(data)=>{

      },
      complete:()=>{
        this.frm_cliente.reset()
        this.spin = false;
        this.mdalservice.closeAll();
      },
      error:()=>{
        this.spin = false;
      }
    })
  }

  getEstadosCivil(){
    this.estadoCivilService.getEstadosCivil().subscribe({
      next:(data)=>{
        this.estados_civil = data
      },
      complete:()=>{},
      error:()=>{}
    })
  }

  getActividadesEconomicas(){
    this.actividadesEconomicasService.getActividades().subscribe({
      next:(data)=>{
        this.actividades_economicas = data
      },
      complete:()=>{},
      error:()=>{}
    })
  }
}
