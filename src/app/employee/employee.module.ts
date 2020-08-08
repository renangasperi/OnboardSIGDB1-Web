import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { EditEmployeeCompanyComponent } from './edit-employee-company/edit-employee-company.component';
import { EditEmployeePositionComponent } from './edit-employee-position/edit-employee-position.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeRegisterComponent,
    EditEmployeeCompanyComponent,
    EditEmployeePositionComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  exports: [
    EmployeeListComponent,
  ]
})
export class EmployeeModule { }
