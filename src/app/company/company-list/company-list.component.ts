import { Component, OnInit } from '@angular/core';
import { Company } from '../../../models/company/company.model';
import { CompanyFilter } from '../../../models/company/company-filter.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private service: CompanyService) {
    this.form = this.fb.group({
      name: [''],
      cnpj: ['', Validators.compose([CompanyService.cnpjValidate])],
      foundationDate: [''],
    });
  }

  ngOnInit(): void {
    this.getCompany();
  }

  public companyData: Company[] = [];

  async getCompany(filter?: CompanyFilter) {
    await this.service
      .getAllCompany(filter)
      .toPromise()
      .then((resp) => (this.companyData = resp));
  }

  deleteCompanyData(company: Company): void {
    this.service.deleteCompany(company.id);
    this.getCompany();
  }
}
