import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee/employee.model';
import { EmployeeFilter } from '../../../models/employee/employee-filter.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private service: EmployeeService) {
    this.form = this.fb.group({
      nome: [''],
      cpf: ['', Validators.compose([EmployeeService.cpfValidate])],
      dataContratacao: [''],
    });
  }

  ngOnInit(): void {
    this.getEmployee();
  }

  public employeeData: Employee[] = [];
  public alertFlag: boolean = false;

  async getEmployee(filter?: EmployeeFilter) {
    await this.service
      .getAllEmployee(filter)
      .toPromise()
      .then((resp) => (this.employeeData = resp));
  }

  deleteEmployeeData(employee: Employee): void {
    this.service.deleteEmployee(employee.id).subscribe(() => {
      this.showAlert();
      this.getEmployee();
    });
  }

  showAlert() {
    this.alertFlag = true;
    setTimeout(() => {
      this.alertFlag = false;
    }, 2000);
  }
}
