import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Employee } from 'src/models/employee/employee.model';
import { Observable } from 'rxjs/internal/Observable';
import { EmployeeFilter } from 'src/models/employee/employee-filter.model';
import { AbstractControl } from '@angular/forms';

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
    return this.http.get<Employee>(`${this.API}?id=${id}`)
  }

  deleteEmployee(employeeId: string) {
    console.log('aaaaaaaaaaaau');
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
    console.log('aaaaaaaaaaaa')
    const { value } = control;

    let cnpj = value.replace(/[^\d]+/g, '');

    let t = cnpj.length - 2,
      d = cnpj.substring(t),
      d1 = parseInt(d.charAt(0)),
      d2 = parseInt(d.charAt(1)),
      calc = (x) => {
        let n = cnpj.substring(0, x),
          y = x - 7,
          value = 0,
          r = 0;

        for (let i = x; i >= 1; i--) {
          value += n.charAt(x - i) * y--;
          if (y < 2) y = 9;
        }

        r = 11 - (value % 11);
        return r > 9 ? 0 : r;
      };

    const result = calc(t) === d1 && calc(t + 1) === d2;

    return result ? null : { invalidCnpj: true };
  }
}
