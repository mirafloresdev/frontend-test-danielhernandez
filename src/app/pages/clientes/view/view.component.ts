import {Component, OnInit} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ClienteEntity } from 'src/app/models/cliente.entity';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';
import { Router } from '@angular/router';
import {ClienteService} from "../../../services/cliente.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  list_data!: ReadonlyArray<ClienteEntity>;
  data_clientes: ClienteEntity[] = [];

  constructor(private modal: NzModalService, private router: Router, private clienteService: ClienteService){}

  ngOnInit() {
    this.getClientes();
  }



  getClientes(){
    this.clienteService.getPersonas().subscribe({
      next:(data)=>{
        this.data_clientes = data;
      },
      complete:()=>{},
      error:()=>{}
    })
  }

  create(){
    this.modal.create({
      nzTitle: 'Crear Nuevo Cliente',
      nzContent: CreateComponent,
      nzStyle: {width: '60%'},
      nzBodyStyle:{
        maxHeight: '500px',
        overflowY: 'auto',
      },
      nzFooter: null
    });
  }

  edit(data: ClienteEntity) {
    const modal = this.modal.create({
      nzTitle: 'Editar Cliente ' + data.nombres + ' ' + data.apellidos,
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
      this.clienteService.getPersonas().subscribe({
        next: (data: ClienteEntity[]) => {
          this.data_clientes = data.sort((a, b) => a.idPersona - b.idPersona);
        },
        error: error => console.error('Error fetching personas', error)
      });
    })
  }


  ver_solicitudes(data: ClienteEntity){
    this.router.navigate(['dashboard/solicitudes'],{queryParams: {id_persona: data.idPersona, cliente: data.nombres+' '+data.apellidos}})
  }

  onCurrentPageDataChange(list_data: ReadonlyArray<ClienteEntity>){
    this.list_data = list_data;
  }
}
