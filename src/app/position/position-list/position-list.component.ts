import { Component, OnInit } from '@angular/core';
import { Position } from '../../../models/position/position.model';
import { PositionService } from '../position.service';

@Component({
  selector: 'position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss']
})
export class PositionListComponent implements OnInit {

  constructor(private service: PositionService) { }

  ngOnInit(): void {
    this.getPosition();
  }

  public positionData: Position[] = [];
  public alertFlag: boolean = false;

  async getPosition() {
    await this.service
      .getAllPosition()
      .toPromise()
      .then((resp) => (this.positionData = resp));
  }

  deletePositionData(position: Position): void {
    this.service.deletePosition(position.id).subscribe(() => {
      this.showAlert();
      this.getPosition();
    });
  }
  showAlert() {
    this.alertFlag = true;
    setTimeout(() => {
      this.alertFlag = false;
    }, 2000);
  }
}
