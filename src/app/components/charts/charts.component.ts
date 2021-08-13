import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { DataService, indicator } from '../../services/data.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  watchDetailIndicator: boolean = false
  indicators: indicator[] = []
  chartOption: EChartsOption = {}

  constructor(
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.dataService.getChartIndicator$().subscribe(res => {
      this.indicators = res
      this.updateChartData()
    })
  }

  updateChartData() {
    let newOption: any = {
      xAxis: {
        data: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00'],
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: number)  => `${value}%`
        },
      },
      parallel: {
        left: '5%',
        right: '18%',
        bottom: 100,
        parallelAxisDefault: {
          type: 'value',
          name: 'AQI指数',
          nameLocation: 'end',
          nameGap: 20,
          nameTextStyle: {
            color: '#fff',
            fontSize: 12
          },
          axisLine: {
            lineStyle: {
              color: '#aaa'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#777'
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            color: '#fff'
          }
        }
      },
      series: [
        {
          type: 'line',
          smooth: 1,
          symbol: 'none',
          lineStyle: 'none',
          markLine: {
            symbol: ['none', 'none'],
            label: {
              normal: {
                show: false
              }
            },
            data: [
              {xAxis: 0},
              {xAxis: 1},
              {xAxis: 2},
              {xAxis: 3},
              {xAxis: 4},
              {xAxis: 5}
            ]
          },
          areaStyle: {},
          data: []
        },
      ],
      tooltip: {
        trigger: 'axis'
      },
    }

    for(let indicator of this.indicators){
      let seriesElem = {
        data: indicator.value.map(elem => Math.floor(elem * 100 / (indicator.maxValue - indicator.minValue))),
        type: 'line',
        smooth: true,
        color: indicator.chartColor,
        lineStyle: {
          normal: {
            width: 1,
            opacity: 1
          }
        },
      }
      newOption.series.push(seriesElem)
    }

    this.chartOption = newOption
  }

  deleteItem(i: number) {
    this.dataService.removeElem(i)
  }
}
