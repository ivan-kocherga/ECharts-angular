import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private indicators:indicator[] = [
    {
      indicatorNgxGauge: false,
      title: 'Скорость движения',
      unit: 'м/с',
      minValue: 0,
      maxValue: 2.5,
      value: this.genFakeData(0, 2.5),
      titleColor: 'black',
      scaleBackground: 'rgba(0, 255, 0, 0.5)',
      indicatorBackground: 'rgba(0, 255, 0, 0.1)',
      valueColor: 'rgb(79,180,129)',
      indicatorColor: 'rgba(212, 212, 212, 0.2)',
      chartColor: 'blue'
    },
    {
      indicatorNgxGauge: false,
      title: 'Время движения',
      unit: 'мин',
      minValue: 0,
      maxValue: 0,
      value: this.genFakeData(0, 60),
      titleColor: 'black',
      scaleBackground: 'rgba(0, 255, 0, 0.5)',
      indicatorBackground: 'rgba(0, 255, 0, 0.1)',
      valueColor: 'black',
      indicatorColor: 'rgba(212, 212, 212, 0.2)',
      chartColor: 'green'
    },
    {
      indicatorNgxGauge: false,
      title: 'Обороты двигателя',
      unit: 'об/мин',
      minValue: 0,
      maxValue: 3100,
      value: this.genFakeData(0, 3100),
      titleColor: 'black',
      scaleBackground: 'rgba(0, 255, 0, 0.5)',
      indicatorBackground: 'rgba(0, 255, 0, 0.1)',
      valueColor: 'rgb(79,180,129)',
      indicatorColor: 'rgba(212, 212, 212, 0.2)',
      chartColor: 'yellow'
    },
    {
      indicatorNgxGauge: false,
      title: 'Продолжительность работы двигателя',
      unit: 'Мч',
      minValue: 0,
      maxValue: 0,
      value: this.genFakeData(0, 1300),
      titleColor: 'black',
      scaleBackground: 'rgba(0, 255, 0, 0.5)',
      indicatorBackground: 'rgba(0, 255, 0, 0.1)',
      valueColor: 'black',
      indicatorColor: 'rgba(212, 212, 212, 0.2)',
      chartColor: 'red'
    },
    {
      indicatorNgxGauge: false,
      title: 'Температура моторного масла',
      unit: 'C',
      minValue: 0,
      maxValue: 200,
      value: this.genFakeData(0, 200),
      titleColor: 'rgb(108,193,255)',
      scaleBackground: 'rgba(0, 255, 0, 0.5)',
      indicatorBackground: 'rgba(0, 255, 0, 0.1)',
      valueColor: 'rgb(79,180,129)',
      indicatorColor: 'rgb(229,244,255)',
      chartColor: 'violet'
    },
    {
      indicatorNgxGauge: false,
      title: 'Температура отработанных газов',
      unit: 'C',
      minValue: 0,
      maxValue: 200,
      value: this.genFakeData(0, 200),
      titleColor: 'rgb(108,193,255)',
      scaleBackground: 'rgba(0, 255, 0, 0.5)',
      indicatorBackground: 'rgba(0, 255, 0, 0.1)',
      valueColor: 'rgb(79,180,129)',
      indicatorColor: 'rgb(229,244,255)',
      chartColor: 'brown'
    },
    {
      indicatorNgxGauge: false,
      title: 'Температура охлаждающей жидкости',
      unit: 'C',
      minValue: 0,
      maxValue: 200,
      value: this.genFakeData(0, 200),
      titleColor: 'rgb(108,193,255)',
      scaleBackground: 'rgba(0, 255, 0, 0.5)',
      indicatorBackground: 'rgba(0, 255, 0, 0.1)',
      valueColor: 'rgb(234,188,81)',
      indicatorColor: 'rgb(229,244,255)',
      chartColor: 'aqua'
    },
    {
      indicatorNgxGauge: false,
      title: 'Температура гидравл. жидкости',
      unit: 'C',
      minValue: 0,
      maxValue: 200,
      value: this.genFakeData(0, 200),
      titleColor: 'rgb(108,193,255)',
      scaleBackground: 'rgba(0, 255, 0, 0.5)',
      indicatorBackground: 'rgba(0, 255, 0, 0.1)',
      valueColor: 'rgb(79,180,129)',
      indicatorColor: 'rgba(212, 212, 212)',
      chartColor: 'chartreuse'
    },
    {
      indicatorNgxGauge: true,
      title: 'Рабочее давление',
      unit: 'бар',
      minValue: 0,
      maxValue: 20,
      value: this.genFakeData(0, 20),
      titleColor: 'black',
      scaleBackground: 'rgb(64,191,106)',
      indicatorBackground: 'rgb(229,242,237)',
      valueColor: 'black',
      indicatorColor: 'rgba(212, 212, 212, 0.2)',
      chartColor: 'rgba(212,212,212)'
    },
    {
      indicatorNgxGauge: true,
      title: 'Давление прижима',
      unit: 'бар',
      minValue: 0,
      maxValue: 20,
      value: this.genFakeData(0, 20),
      titleColor: 'black',
      scaleBackground: 'rgb(64,191,106)',
      indicatorBackground: 'rgb(229,242,237)',
      valueColor: 'black',
      indicatorColor: 'rgba(212, 212, 212, 0.2)',
      chartColor: 'rgba(255,153,0)'
    },
    {
      indicatorNgxGauge: true,
      title: 'Системное давление',
      unit: 'бар',
      minValue: 1.5,
      maxValue: 20,
      value: this.genFakeData(0, 20),
      titleColor: 'rgb(108,193,255)',
      scaleBackground: 'rgb(243,129,7)',
      indicatorBackground: 'rgb(244,231,202)',
      valueColor: 'black',
      indicatorColor: 'rgb(229,244,255)',
      chartColor: 'rgba(255,0,221)'
    },
    {
      indicatorNgxGauge: true,
      title: 'Тормозное давление',
      unit: 'бар',
      minValue: 1.5,
      maxValue: 20,
      value: this.genFakeData(0, 20),
      titleColor: 'rgb(108,193,255)',
      scaleBackground: 'rgb(235,72,73)',
      indicatorBackground: 'rgb(251,233,233)',
      valueColor: 'rgb(235,72,73)',
      indicatorColor: 'rgb(229,244,255)',
      chartColor: 'rgba(26,255,0)'
    },
    {
      indicatorNgxGauge: true,
      title: 'Системное давление',
      unit: 'бар',
      minValue: 0,
      maxValue: 20,
      value: this.genFakeData(0, 20),
      titleColor: 'black',
      scaleBackground: 'rgb(64,191,106)',
      indicatorBackground: 'rgb(229,242,237)',
      valueColor: 'black',
      indicatorColor: 'rgba(212, 212, 212, 0.2)',
      chartColor: 'rgba(78,172,101)'
    },
    {
      indicatorNgxGauge: true,
      title: 'Давление прижима',
      unit: 'бар',
      minValue: 0,
      maxValue: 20,
      value: this.genFakeData(0, 20),
      titleColor: 'black',
      scaleBackground: 'rgb(246,199,46)',
      indicatorBackground: 'rgb(246,241,232)',
      valueColor: 'black',
      indicatorColor: 'rgba(212, 212, 212, 0.2)',
      chartColor: 'rgba(255,162,162)'
    },
    {
      indicatorNgxGauge: true,
      title: 'Тормозное давление',
      unit: 'бар',
      minValue: 0,
      maxValue: 20,
      value: this.genFakeData(0, 20),
      titleColor: 'black',
      scaleBackground: 'rgb(64,191,106)',
      indicatorBackground: 'rgb(229,242,237)',
      valueColor: 'black',
      indicatorColor: 'rgba(212, 212, 212, 0.2)',
      chartColor: 'rgba(187,255,0)'
    },
    {
      indicatorNgxGauge: true,
      title: 'Рабочее давление',
      unit: 'бар',
      minValue: 0,
      maxValue: 20,
      value:  this.genFakeData(0, 20),
      titleColor: 'black',
      scaleBackground: 'rgb(64,191,106)',
      indicatorBackground: 'rgb(229,242,237)',
      valueColor: 'black',
      indicatorColor: 'rgba(212, 212, 212, 0.2)',
      chartColor: 'rgba(121,98,72)'
    }
  ]

  private activeChartIndicator$: BehaviorSubject<indicator[]> = new BehaviorSubject<indicator[]>([])

  constructor() {
    this.activeChartIndicator$.next(this.indicators.filter((elem, index) => elem.maxValue !== 0 && index < 5))
  }

  private genFakeData(min: number, max: number): number[] {
    const fakeArr = []
    for(let i = 0; i < 6; i++){
      fakeArr.push(this.getRandomNumber(min, max))
    }
    return fakeArr
  }

  getRandomNumber(min:number, max:number): any {
    if(this.getCountFloat(min) === 0 && this.getCountFloat(max) === 0) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
      return ((Math.random() * (max - min)) + min).toFixed(Math.max(this.getCountFloat(min), this.getCountFloat(max)));
    }
  }

  getCountFloat(value:any): number {
    return (value.toString().includes('.')) ? (value.toString().split('.').pop().length) : 0;
  }

  get indicatorData(): indicator[] {
    return this.indicators
  }

  getChartIndicator$(): Observable<indicator[]> {
    return this.activeChartIndicator$.asObservable().pipe(distinctUntilChanged())
  }

  addActiveChartIndicator(index: number): void {
    let check = this.activeChartIndicator$.value.filter(elem => this.indicators[index].title === elem.title)
    if(check.length === 0) {
      let newData = this.activeChartIndicator$.value.concat([this.indicators[index]])
      this.activeChartIndicator$.next(newData)
    }
  }

  removeElem(index: number): void {
    let newData = this.activeChartIndicator$.value.filter((elem, indexFilter) => indexFilter !== index)
    this.activeChartIndicator$.next(newData)
  }
}

export interface indicator {
  indicatorNgxGauge: boolean,
  title: string,
  unit: string,
  value: number[],
  minValue: number,
  maxValue: number,
  titleColor: string,
  scaleBackground: string,
  indicatorBackground: string,
  valueColor: string,
  indicatorColor: string;
  chartColor: string;
}
