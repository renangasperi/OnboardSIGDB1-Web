import { Component, OnInit } from '@angular/core';
import { Position } from '../../../models/position/position.model';

@Component({
  selector: 'position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss']
})
export class PositionListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public mock: Position[] = [
    {
      id: '1',
      description: 'dev',
    },
    {
      id: '2',
      description: 'quase dev',
    },
    {
      id: '3',
      description: 'dev de celular',
    },
    {
      id: '4',
      description: 'tonto',
    },
  ];
}
