import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolicitudEntity } from 'src/app/models/solicitud.entity';
import { CreateComponent } from '../create/create.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EditComponent } from '../edit/edit.component';
import {SolicitudService} from "../../../services/solicitud.service";
import {ClienteEntity} from "../../../models/cliente.entity";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  id_persona: any;
  clienteId: any
  clienteNombre: any;
  list_data!: ReadonlyArray<SolicitudEntity>;
  data_solicitud: SolicitudEntity[] = [];

  constructor(private route: ActivatedRoute,
              private modal: NzModalService,
              private solicitudService: SolicitudService){

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.clienteId = params['id_persona']
      this.clienteNombre = params['cliente']

    })
    this.getSolicitudByCliente();
  }

  getSolicitudes(){
    this.solicitudService.getSolicitudes().subscribe({
      next:(data)=>{
        this.data_solicitud = data;
      },
      error:()=>{},
      complete:()=>{}
    })
  }

  getSolicitudByCliente(){
    this.solicitudService.getSolicitudesByCliente(this.clienteId).subscribe({
      next:(data)=>{
        this.data_solicitud = data;
      },
      error:()=>{},
      complete:()=>{}
    })
  }

  create(){
    const modal = this.modal.create({
      nzTitle: 'Crear Nueva Solicitud para cliente: '+this.clienteNombre,
      nzContent: CreateComponent,
      nzStyle: {width: '60%'},
      nzBodyStyle:{
        maxHeight: '500px',
        overflowY: 'auto',
      },
      nzFooter: null
    });
    if (modal.componentInstance) {
      modal.componentInstance.id_persona = this.clienteId;
    }

    modal.afterClose.subscribe(()=>{
      this.solicitudService.getSolicitudesByCliente(this.clienteId).subscribe({
        next: (data: SolicitudEntity[]) => {
          this.data_solicitud = data.sort((a, b) => a.idSolicitud - b.idSolicitud);
        },
        error: error => console.error('Error fetching personas', error)
      });
    });
  }

  edit(data: SolicitudEntity) {
    const modal = this.modal.create({
      nzTitle: 'Editar Solicitud ' ,
      nzContent: EditComponent,
      nzStyle: { width: '60%' },
      nzBodyStyle: {
        maxHeight: '500px',
        overflowY: 'auto',
      },
      nzFooter: null
    });
    if (modal.componentInstance) {
      modal.componentInstance.data = data;
    }

    modal.afterClose.subscribe(()=>{
      this.solicitudService.getSolicitudesByCliente(this.clienteId).subscribe({
        next: (data: SolicitudEntity[]) => {
          this.data_solicitud = data.sort((a, b) => a.idSolicitud - b.idSolicitud);
        },
        error: error => console.error('Error fetching solicitudes', error)
      });
    })
  }
  onCurrentPageDataChange(list_data: ReadonlyArray<SolicitudEntity>){
    this.list_data = list_data;
  }
}
