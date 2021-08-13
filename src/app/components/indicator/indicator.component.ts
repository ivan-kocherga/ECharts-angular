import { Component, OnInit, Input } from '@angular/core';
import { DataService, indicator } from '../../services/data.service';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.css']
})
export class IndicatorComponent implements OnInit {
  @Input() indicator: any;
  @Input() indexIndicator: any;

  constructor(
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
  }

  getCorrectValue(data: indicator): string|number {
    if(data.unit === 'C') return data.value[data.value.length - 1] + '°'
    return data.value[data.value.length - 1]
  }

  addChartItem(): void {
    if(this.indicator.maxValue !== 0) this.dataService.addActiveChartIndicator(this.indexIndicator)
  }
}
