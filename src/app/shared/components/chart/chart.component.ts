import { Component } from '@angular/core';
import { createChart } from 'lightweight-charts';

// const chart = createChart('',
//   {
//     width: 900,
//     height: 500,
//     handleScale: {
//       mouseWheel: true,
//       pinch: true
//     },
//     timeScale: {
//       visible: true,
//       timeVisible: true,
//       secondsVisible: true
//     },
//     crosshair: {
//       horzLine: {
//         visible: true
//       },
//       vertLine: {
//         visible: true
//       }
//     }
//   }
// );

// const lineSeries = chart.addAreaSeries();
// lineSeries.setData([]);

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent { 
  constructor() {
    setInterval(() => {
      // lineSeries.update({ time: (Date.now() / 1000) as any, value: this.generateRandom() });
      // lineSeries2.update({ time: (Date.now() / 1000) as any, value: this.generateRandom() });
    }, 1);
  }

  generateRandom(maxLimit = 500){
    let rand = Math.random() * maxLimit;
    rand = Math.floor(rand); // 99
    return rand;
  }
}
