import { Position } from '../position/position.model';

export class Employee {
  constructor(
    public id: string,
    public name: string,
    public cpf: string,
    public company: {
      id: string;
      name: string;
    },
    public position: Position,
    public hiredate: string
  ) {}
}
