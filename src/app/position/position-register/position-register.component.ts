import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-position-register',
  templateUrl: './position-register.component.html',
  styleUrls: ['./position-register.component.scss']
})
export class PositionRegisterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setTitleByRegisterType();
  }

  title: string = '';

  setTitleByRegisterType() {
    const { url } = this.router;
    if (url === '/position/new') {
      this.title = 'Cadastro de Cargos';
    }
    if (url === '/position/edit') {
      this.title = 'Editar Cargo';
    }
  }
}
