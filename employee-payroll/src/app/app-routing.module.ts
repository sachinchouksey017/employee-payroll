import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PayrollFormComponent } from './components/payroll-form/payroll-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'payroll-form',
    component: PayrollFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
