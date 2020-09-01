import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';
import { Company } from 'src/models/company/company.model';
import { Location } from '@angular/common';

@Component({
  selector: 'company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.scss'],
})
export class CompanyRegisterComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: CompanyService,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.form = this.fb.group({
      nome: [
        '',
        Validators.compose([Validators.maxLength(150), Validators.required]),
      ],
      cnpj: [
        '',
        Validators.compose([CompanyService.cnpjValidate, Validators.required]),
      ],
      dataFundacao: [''],
    });
  }

  public company: Company;
  public title: string = '';
  public registerType: string = '';
  public alertFlag: boolean = false;

  ngOnInit(): void {
    this.getRegisterType();
    this.setTitle();
    this.getCompanyById();
  }

  setTitle() {
    const titleByType = {
      new: 'Cadastro de Empresas',
      edit: 'Editar Empresa',
    };
    this.title = titleByType[this.registerType];
  }

  getRegisterType() {
    const { url } = this.router;
    const id = this.getIdFromRoute();
    if (url === '/company/new') {
      this.registerType = 'new';
    }
    if (url === `/company/edit/${id}`) {
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

  getCompanyById() {
    const id = this.getIdFromRoute();
    if (!id) return;
    this.service
      .getCompanyById(id)
      .toPromise()
      .then((resp) => {
        this.company = resp;
        this.form.get('nome').setValue(this.company.nome);
        this.form.get('cnpj').setValue(this.company.cnpj);
        this.form.get('dataFundacao').setValue(this.company.dataFundacao);
      });
  }

  createNewCompany() {
    const { value } = this.form;
    this.service.createNewCompany(value).subscribe();
    this.showAlert();
  }

  editCompany() {
    const body = { ...this.form.value, id: this.company.id };
    this.service.editCompany(body).subscribe();
    this.showAlert();
  }

  handleSubmit() {
    if (this.registerType == 'new') this.createNewCompany();
    if (this.registerType == 'edit') this.editCompany();
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
