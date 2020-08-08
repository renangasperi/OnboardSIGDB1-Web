import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})
export class EmployeeRegisterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setTitleByRegisterType();
  }

  title: string = '';

  setTitleByRegisterType() {
    const { url } = this.router;
    if (url === '/employee/new') {
      this.title = 'Cadastro de Funcionários';
    }
    if (url === '/employee/edit') {
      this.title = 'Editar Funcionário';
    }
  }
}
