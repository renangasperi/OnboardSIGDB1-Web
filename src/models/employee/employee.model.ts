import { Position } from '../position/position.model';

export class Employee {
  constructor(
    public id: string,
    public nome: string,
    public cpf: string,
    public empresa: string,
    public cargo: string,
    public dataContratacao: string,
  ) {}
}
