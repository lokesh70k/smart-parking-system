import { Component, OnInit } from '@angular/core';
import { ParkingService } from './parking.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  parkingSpots: any[] = [];

  constructor(private parkingService: ParkingService) {}

  ngOnInit() {
    this.parkingService.getParkingSpots().subscribe(data => {
      this.parkingSpots = data;
    });
  }
}
