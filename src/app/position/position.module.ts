import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionListComponent } from './position-list/position-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { PositionRegisterComponent } from './position-register/position-register.component';



@NgModule({
  declarations: [
    PositionListComponent,
    PositionRegisterComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports: [
    PositionListComponent,
  ],
})
export class PositionModule { }
