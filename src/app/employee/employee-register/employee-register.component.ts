import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from 'src/models/employee/employee.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss'],
})
export class EmployeeRegisterComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: EmployeeService,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(150)]],
      cpf: ['', [Validators.required, EmployeeService.cpfValidate]],
      dataContratacao: [''],
    });
  }

  public employee: Employee;
  public title: string = '';
  public registerType: string = '';
  public alertFlag: boolean = false;

  ngOnInit(): void {
    this.getRegisterType();
    this.setTitle();
    this.getEmployeeById();
  }

  setTitle() {
    const titleByType = {
      new: 'Cadastro de Funcionários',
      edit: 'Editar Funcionário',
    };
    this.title = titleByType[this.registerType];
  }

  getRegisterType() {
    const { url } = this.router;
    const id = this.getIdFromRoute();
    if (url === '/employee/new') {
      this.registerType = 'new';
    }
    if (url === `/employee/edit/${id}`) {
      this.registerType = 'edit';
    }
  }

  getIdFromRoute(): string {
    let id = '';
    this.activatedRoute.params.subscribe((params) => {
      id = params['id'];
    });
    return id;
  }

  getEmployeeById() {
    const id = this.getIdFromRoute();
    if (!id) return;
    this.service
      .getEmployeeById(id)
      .toPromise()
      .then((resp) => {
        this.employee = resp;
        this.form.get('nome').setValue(this.employee.nome);
        this.form.get('cpf').setValue(this.employee.cpf);
        this.form
          .get('dataContratacao')
          .setValue(this.employee.dataContratacao);
      });
  }

  createNewEmployee() {
    const { value } = this.form;
    this.service.createNewEmployee(value).subscribe();
    this.showAlert();
  }

  editEmployee() {
    const body = { ...this.employee, ...this.form.value };
    this.service.editEmployee(body).subscribe();
    this.showAlert();
  }

  handleSubmit() {
    if (this.registerType == 'new') this.createNewEmployee();
    if (this.registerType == 'edit') this.editEmployee();
  }

  backRoute() {
    this.location.back();
  }

  showAlert() {
    this.alertFlag = true;
    setTimeout(() => {
      this.alertFlag = false;
      this.backRoute();
    }, 1500);
  }
}
