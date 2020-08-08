import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';
import { Company } from 'src/models/company/company.model';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.scss'],
})
export class CompanyRegisterComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: CompanyService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [''],
      cnpj: ['', Validators.compose([CompanyService.cnpjValidate])],
      foundationDate: [''],
    });
  }

  ngOnInit(): void {
    this.setTitleByRegisterType();
    this.getCompanyById();
  }

  title: string = '';

  setTitleByRegisterType() {
    const { url } = this.router;
    if (url === '/company/new') {
      this.title = 'Cadastro de Empresas';
    }
    if (url === '/company/edit') {
      this.title = 'Editar Empresa';
    }
  }

  getIdFromRoute(): string {
    let id = '';
    this.activatedRoute.params.subscribe((params) => {
      id = params['id'];
    });
    return id;
  }

  getCompanyById() {
    const id = this.getIdFromRoute();
    if (!id) return;
    this.service.getCompanyById(id).toPromise().then((resp) => {
      console.log(resp[0]);
    });
  }
}
