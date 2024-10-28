import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { ZorroModule } from 'src/app/zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ViewComponent,
    EditComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ZorroModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClientesModule { }
