import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
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
    ReactiveFormsModule
  ],
  exports: [
    PositionListComponent,
    PositionRegisterComponent
  ],
})
export class PositionModule { }
