import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view.component';

const routes: Routes = [
  {
    path: '',
    component: ViewComponent,
    children: [
      {
        path: '',
        redirectTo: 'summary',
        pathMatch: 'full'
      },
      {
        path: 'summary',
        loadChildren: () => import('./summary/summary.module').then(m => m.SummaryModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
