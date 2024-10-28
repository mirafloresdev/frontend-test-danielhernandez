import { Component, Input } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { ClienteEntity } from 'src/app/models/cliente.entity';
import {ActividadEconomica} from "../../../models/actividad_economica.entity";
import {EstadoCivil} from "../../../models/estado_civil.entity";
import {EstadosCivilService} from "../../../services/estados-civil.service";
import {ActividadesEconomicasService} from "../../../services/actividades-economicas.service";
import {ClienteService} from "../../../services/cliente.service";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  form!: FormGroup;
  @Input() data!: ClienteEntity;
  actividades_economicas: ActividadEconomica[] = [];
  estados_civil: EstadoCivil[] = [];
  spin = false;
  alertasuccess = false;

  constructor( private fb: FormBuilder, private modalService: NzModalService,
               private clienteService:ClienteService,
               private actividadesEconomicasService: ActividadesEconomicasService,
               private estadoCivilService: EstadosCivilService){

  }

  ngOnInit(){
    console.log(this.data);
    this.getActividadesEconomicas();
    this.getEstadosCivil();
    this.form = this.fb.group({
      'dui': new FormControl('',[Validators.required]),
      'nit': new FormControl('',[Validators.required]),
      'nombres': new FormControl('',[Validators.required]),
      'apellidos': new FormControl('',[Validators.required]),
      'sexo': new FormControl(this.data.sexo,[Validators.required]),
      'id_actividad_economica': new FormControl(this.data.actividadEconomica, [Validators.required]),
      'id_estado_civil': new FormControl(this.data.estadoCivil,[Validators.required]),
    });
    this.form.patchValue(this.data)
  }

  ngAfterViewInit() {
   // this.form.get('id_actividad_economica')?.setValue(this.data.actividadEconomica.idActividadEconomica);
  }

  save(){
    this.spin = true;

    let estadoCivil = new EstadoCivil();
    estadoCivil.idEstadoCivil = this.form.get('id_estado_civil')?.value;
    let actividad_economica = new ActividadEconomica();
    actividad_economica.idActividadEconomica = this.form.get('id_actividad_economica')?.value;

    //llenamos datos de formulario para update en el objeto correspondiente
    let cliente = new ClienteEntity();
    cliente = this.form.value;
    cliente.estadoCivil = estadoCivil;
    cliente.actividadEconomica = actividad_economica;
    cliente.idPersona = this.data.idPersona;

    this.clienteService.update(cliente).subscribe({
      next:(data)=>{
        if(data){
          this.alertasuccess = true;
        }
      },
      error:()=>{
        this.spin = false;
      },
      complete:()=>{

        setTimeout(()=>{
          this.spin = false;
          this.alertasuccess = false;
          this.modalService.closeAll()
          this.form.reset();
        },3000)
      }
    })
  }

  getEstadosCivil(){
    this.estadoCivilService.getEstadosCivil().subscribe({
      next:(data)=>{
        this.estados_civil = data
        this.form.patchValue({
          id_estado_civil: this.data.estadoCivil.idEstadoCivil
        });
      },
      complete:()=>{},
      error:()=>{}
    })
  }

  getActividadesEconomicas(){
    this.actividadesEconomicasService.getActividades().subscribe({
      next:(data)=>{
        this.actividades_economicas = data
        this.form.patchValue({
          id_actividad_economica: this.data.actividadEconomica.idActividadEconomica,
        });
      },
      complete:()=>{
        this.form.patchValue({
          id_actividad_economica: this.data.actividadEconomica.idActividadEconomica,
        });
      },
      error:()=>{}
    })
  }

}
