import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '', component: ViewComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: ()=> import('./../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'clientes',
        loadChildren: ()=> import('./../clientes/clientes.module').then(m => m.ClientesModule)
      },
      {
        path: 'solicitudes',
        loadChildren: ()=> import('./../solicitudes/solicitudes.module').then(m => m.SolicitudesModule)
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
