import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { PositionListComponent } from './position/position-list/position-list.component';
import { CompanyRegisterComponent } from './company/company-register/company-register.component';
import { EmployeeRegisterComponent } from './employee/employee-register/employee-register.component';
import { PositionRegisterComponent } from './position/position-register/position-register.component';
import { EditEmployeeCompanyComponent } from './employee/edit-employee-company/edit-employee-company.component';
import { EditEmployeePositionComponent } from './employee/edit-employee-position/edit-employee-position.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyListComponent,
  },
  {
    path: 'company',
    component: CompanyListComponent,
  },
  {
    path: 'company/new',
    component: CompanyRegisterComponent,
  },
  {
    path: 'company/edit/:id',
    component: CompanyRegisterComponent,
  },
  {
    path: 'employee',
    component: EmployeeListComponent,
  },
  {
    path: 'employee/new',
    component: EmployeeRegisterComponent,
  },
  {
    path: 'employee/edit/:id',
    component: EmployeeRegisterComponent,
  },
  {
    path: 'employee/edit-company/:id',
    component: EditEmployeeCompanyComponent,
  },
  {
    path: 'employee/edit-position/:id',
    component: EditEmployeePositionComponent,
  },
  {
    path: 'position',
    component: PositionListComponent,
  },
  {
    path: 'position/new',
    component: PositionRegisterComponent,
  },
  {
    path: 'position/edit/:id',
    component: PositionRegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
