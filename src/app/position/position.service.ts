import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Position } from 'src/models/position/position.model';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  private readonly API = 'http://localhost:3000/position';

  constructor(private http: HttpClient) {}

  getAllPosition(): Observable<Position[]> {
    return this.http.get<Position[]>(this.API);
  }

  getPositionById(id: string): Observable<Position> {
    return this.http.get<Position>(`${this.API}?id=${id}`);
  }

  createNewPosition(position: Position) {
    return this.http.post(this.API, position);
  }

  editPosition(position: Position) {
    return this.http.put(`${this.API}/${position.id}`, position);
  }

  deletePosition(positionId: string) {
    return this.http.delete(`${this.API}/${positionId}`);
  }
}
