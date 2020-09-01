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
      nome: ['',],
      cnpj: ['', Validators.compose([CompanyService.cnpjValidate])],
      dataFundacao: [''],
    });
  }

  ngOnInit(): void {
    this.getCompany();
  }

  public companyData: Company[] = [];
  public alertFlag: boolean = false;

  async getCompany(filter?: CompanyFilter) {
    await this.service
      .getAllCompany(filter)
      .toPromise()
      .then((resp) => (this.companyData = resp));
  }

  deleteCompanyData(company: Company): void {
    this.service.deleteCompany(company.id).subscribe(() => {
      this.showAlert();
      this.getCompany();
    });
  }

  showAlert() {
    this.alertFlag = true;
    setTimeout(() => {
      this.alertFlag = false;
    }, 2000);
  }
}
