import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {FormaPagoService} from "../../../services/forma-pago.service";
import {FormaPagoEntity} from "../../../models/forma_pago.entity";
import {SolicitudEntity} from "../../../models/solicitud.entity";
import {SolicitudService} from "../../../services/solicitud.service";
import {ClienteEntity} from "../../../models/cliente.entity";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit{
  form!: FormGroup;
  @Input() id_persona!: any;
  formasPago: FormaPagoEntity[] = [];
  spin = false;
  alertsuccess = false;

  constructor(private formaPagoService: FormaPagoService, private modalService: NzModalService,
              private solicitudService: SolicitudService,
              private fb: FormBuilder) {

  }

  ngOnInit(){
    this.obtenerFormasPago();
    this.form = this.fb.group({
      'fechaCreacion': new FormControl(''),
      'monto': new FormControl(null,[Validators.required]),
      'plazo': new FormControl(null,[Validators.required]),
      'id_forma_pago': new FormControl(null,[Validators.required]),
    });
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
    persona.idPersona = this.id_persona;


    let solicitud: SolicitudEntity = new SolicitudEntity();
    solicitud = this.form.value;
    solicitud.formaPago = formaPago;
    solicitud.persona = persona;

    this.solicitudService.save(solicitud).subscribe({
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
