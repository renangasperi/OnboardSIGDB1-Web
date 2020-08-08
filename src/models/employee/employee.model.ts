import { Company } from '../company/company.model';
import { Position } from '../position/position.model';

export class Employee {
  constructor(
    public id: string,
    public name: string,
    public cpf: string,
    public company: Company,
    public position: Position,
  ) {}
}
