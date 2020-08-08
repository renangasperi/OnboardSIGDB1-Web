import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionRegisterComponent } from './position-register.component';

describe('PositionRegisterComponent', () => {
  let component: PositionRegisterComponent;
  let fixture: ComponentFixture<PositionRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
