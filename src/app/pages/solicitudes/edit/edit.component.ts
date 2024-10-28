import { Component, Input } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { SolicitudEntity } from 'src/app/models/solicitud.entity';
import {FormaPagoEntity} from "../../../models/forma_pago.entity";
import {FormaPagoService} from "../../../services/forma-pago.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {ClienteEntity} from "../../../models/cliente.entity";
import {SolicitudService} from "../../../services/solicitud.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  form!: FormGroup;
  @Input() data!: SolicitudEntity;
  formasPago: FormaPagoEntity[] = [];
  spin = false;
  alertsuccess = false;

  constructor(private fb: FormBuilder,
              private formaPagoService:
                FormaPagoService, private modalService: NzModalService, private solicitudService: SolicitudService,) {

  }

  ngOnInit(){
    console.log(this.data);
    this.obtenerFormasPago();
    this.form = new FormGroup({
      'fechaCreacion': new FormControl(this.data.fechaCreacion),
      'monto': new FormControl('' ,[Validators.required]),
      'plazo': new FormControl('' ,[Validators.required]),
      'id_forma_pago': new FormControl(this.data.formaPago.idFormaPago, [Validators.required]),
    });
    this.form.patchValue(this.data)
  }

  obtenerFormasPago(){
    this.formaPagoService.getFormasPago().subscribe({
      next:(data)=>{
        this.formasPago = data;
      }
    })
  }

  save(){
    this.spin = true;
    let formaPago: FormaPagoEntity = new FormaPagoEntity()
    formaPago.idFormaPago  = this.form.get('id_forma_pago')?.value;

    let persona: ClienteEntity = new ClienteEntity();
    persona.idPersona = this.data.persona.idPersona;


    let solicitud: SolicitudEntity = new SolicitudEntity();
    solicitud = this.form.value;
    solicitud.formaPago = formaPago;
    solicitud.persona = persona;
    solicitud.idSolicitud = this.data.idSolicitud;

    this.solicitudService.update(solicitud).subscribe({
      next:(data)=>{
        if(data){
          this.alertsuccess = true;
        }
      },
      complete:()=>{
        setTimeout(()=>{
          this.spin =false;
          this.alertsuccess = false;
          this.form.reset();
          this.modalService.closeAll();
        },3000)
      },
      error:()=>{}
    })
  }
}
