import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ViewComponent } from './view/view.component';
import { ZorroModule } from 'src/app/zorro.module';


@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ZorroModule
  ]
})
export class DashboardModule { }
