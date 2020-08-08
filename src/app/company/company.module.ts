import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { CompanyListComponent } from './company-list/company-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { CompanyRegisterComponent } from './company-register/company-register.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    CompanyListComponent,
    CompanyRegisterComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  exports: [
    CompanyListComponent,
    CompanyRegisterComponent,
  ],
})
export class CompanyModule { }
