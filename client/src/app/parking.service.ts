import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private apiUrl = 'http://localhost:3000/parking-spots';  // Replace with your API URL

  constructor(private http: HttpClient) { }

  getParkingSpots(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
