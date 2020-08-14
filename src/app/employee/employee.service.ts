import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { EmployeeFilter } from 'src/models/employee/employee-filter.model';
import { AbstractControl } from '@angular/forms';
import { Employee } from 'src/models/employee/employee.model';
import { Company } from 'src/models/company/company.model';
import { Position } from 'src/models/position/position.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly API = 'http://localhost:3000/employee';

  constructor(private http: HttpClient) {}

  getAllEmployee(filter?: EmployeeFilter): Observable<Employee[]> {
    const params: HttpParams = this.paramsBuilder(filter);
    return this.http.get<Employee[]>(this.API, { params: params });
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.API}?id=${id}`);
  }

  createNewEmployee(employee: Employee) {
    const body = {
      ...employee,
      company: { id: '', name: '' },
      position: { id: '', description: ''}
    }
    return this.http.post(this.API, body);
  }

  editEmployee(employee: Employee) {
    return this.http.put(`${this.API}/${employee.id}`, employee);
  }

  editCompany(employee: Employee, company: Company) {
    const body = {
      ...employee,
      company: { id: company.id, name: company.name },
    }
    return this.http.put(`${this.API}/${employee.id}`, body);
  }

  editPosition(employee: Employee, position: Position) {
    const body = {
      ...employee,
      position: { id: position.id, description: position.description },
    }
    return this.http.put(`${this.API}/${employee.id}`, body);
  }

  deleteEmployee(employeeId: string) {
    return this.http.delete(`${this.API}/${employeeId}`);
  }

  paramsBuilder(filter: EmployeeFilter) {
    if (filter) {
      let params = new HttpParams();
      Object.keys(filter).map((key) => {
        if (!!filter[key]) {
          params = params.append(key, filter[key]);
        }
      });
      return params;
    }
    return new HttpParams();
  }

  static cpfValidate(control: AbstractControl) {
    const { value } = control;

    if (!value) return null;

    let cpf = value.replace(/[\s.-]*/gim, '');
    if (
      !cpf ||
      cpf.length != 11 ||
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    ) {
      return { invalidCnpj: true };
    }
    var soma = 0;
    var resto;
    for (var i = 1; i <= 9; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) return { invalidCnpj: true };
    soma = 0;
    for (var i = 1; i <= 10; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) return { invalidCnpj: true };

    return null;
  }
}
