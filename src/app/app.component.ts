import { Component } from '@angular/core';
import { DataService, indicator } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  indicators: indicator[] = []

  constructor(
    private dataService: DataService
  ) {
    this.indicators = dataService.indicatorData
  }

}


