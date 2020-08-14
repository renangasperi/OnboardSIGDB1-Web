import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PositionService } from '../position.service';
import { Position } from '../../../models/position/position.model';
import { Location } from '@angular/common';

@Component({
  selector: 'position-register',
  templateUrl: './position-register.component.html',
  styleUrls: ['./position-register.component.scss'],
})
export class PositionRegisterComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: PositionService,
    private fb: FormBuilder,
    private location: Location,
  ) {
    this.form = this.fb.group({
      description: ['', Validators.compose([Validators.required])],
    });
  }

  public position: Position;
  public title: string = '';
  public registerType: string = '';
  public alertFlag: boolean = false;

  ngOnInit(): void {
    this.getRegisterType();
    this.setTitle();
    this.getPositionById();
  }

  setTitle() {
    const titleByType = {
      new: 'Cadastro de Cargos',
      edit: 'Editar Cargo',
    };
    this.title = titleByType[this.registerType];
  }

  getRegisterType() {
    const { url } = this.router;
    const id = this.getIdFromRoute();
    if (url === '/position/new') {
      this.registerType = 'new';
    }
    if (url === `/position/edit/${id}`) {
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

  getPositionById() {
    const id = this.getIdFromRoute();
    if (!id) return;
    this.service
      .getPositionById(id)
      .toPromise()
      .then((resp) => {
        this.position = resp[0];
        this.form.get('description').setValue(this.position.description);
      });
  }

  createNewPosition() {
    this.service
      .getAllPosition()
      .toPromise()
      .then((resp) => {
        const positionBody = { ...this.form.value, id: resp.length + 1 };
        this.service.createNewPosition(positionBody).subscribe();
        this.showAlert();
      });
  }

  editPosition() {
    const body = { ...this.form.value, id: this.position.id };
    this.service.editPosition(body).subscribe();
    this.showAlert();
  }

  handleSubmit() {
    if (this.registerType == 'new') this.createNewPosition();
    if (this.registerType == 'edit') this.editPosition();
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
