import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/models/employee/employee.model';
import { CompanyService } from 'src/app/company/company.service';
import { Company } from 'src/models/company/company.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-employee-company',
  templateUrl: './edit-employee-company.component.html',
  styleUrls: ['./edit-employee-company.component.scss'],
})
export class EditEmployeeCompanyComponent implements OnInit {
  public form: FormGroup;
  public employee: Employee;
  public companyData: Company[];
  public alertFlag: boolean = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.form = this.fb.group({
      nome: [''],
      companyId: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.getEmployeeById();
    this.getCompanyData();
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
    this.employeeService
      .getEmployeeById(id)
      .toPromise()
      .then((resp) => {
        this.employee = resp;
        this.form.get('nome').setValue(this.employee.nome);
      });
  }

  async getCompanyData() {
    await this.companyService
      .getAllCompany()
      .toPromise()
      .then((resp) => {
        this.companyData = resp;
      });
  }

  findCompanyById(id: string) {
    return this.companyData.find((company) => id == company.id);
  }

  editCompany() {
    const { companyId } = this.form.value;
    const company = this.findCompanyById(companyId);
    this.employeeService.editCompany(this.employee, company).subscribe();
    this.showAlert();
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
