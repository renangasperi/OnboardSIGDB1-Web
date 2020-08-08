import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Company } from 'src/models/company/company.model';
import { Observable } from 'rxjs/internal/Observable';
import { CompanyFilter } from 'src/models/company/company-filter.model';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private readonly API = 'http://localhost:3000/company';

  constructor(private http: HttpClient) {}

  getAllCompany(filter?: CompanyFilter): Observable<Company[]> {
    const params: HttpParams = this.paramsBuilder(filter);
    return this.http.get<Company[]>(this.API, { params: params });
  }

  getCompanyById(id: string): Observable<Company> {
    return this.http.get<Company>(`${this.API}?id=${id}`)
  }

  deleteCompany(companyId: string) {
    console.log('aaaaaaaaaaaau');
    return this.http.delete(`${this.API}/${companyId}`);
  }

  paramsBuilder(filter: CompanyFilter) {
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

  static cnpjValidate(control: AbstractControl) {
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
