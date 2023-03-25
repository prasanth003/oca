import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {
    if (!value || typeof value !== 'number') return '0';
    
    const options = { 
        style: 'decimal', 
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        useGrouping: true,
        currency: 'INR' 
    };

    return value.toLocaleString('en-IN', options);
  }

}
