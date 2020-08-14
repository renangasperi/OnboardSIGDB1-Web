import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from 'src/models/employee/employee.model';
import { Position } from 'src/models/position/position.model';
import { EmployeeService } from '../employee.service';
import { PositionService } from 'src/app/position/position.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'edit-employee-position',
  templateUrl: './edit-employee-position.component.html',
  styleUrls: ['./edit-employee-position.component.scss'],
})
export class EditEmployeePositionComponent implements OnInit {
  public form: FormGroup;
  public employee: Employee;
  public positionData: Position[];
  public alertFlag: boolean = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private positionService: PositionService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.form = this.fb.group({
      name: [''],
      positionId: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.getEmployeeById();
    this.getPositionData();
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
        this.employee = resp[0];
        this.form.get('name').setValue(this.employee.name);
      });
  }

  async getPositionData() {
    await this.positionService
      .getAllPosition()
      .toPromise()
      .then((resp) => {
        this.positionData = resp;
      });
  }

  findPositionById(id: string) {
    return this.positionData.find((position) => id == position.id);
  }

  editPosition() {
    const { positionId } = this.form.value;
    const position = this.findPositionById(positionId);
    this.employeeService.editPosition(this.employee, position).subscribe();
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
