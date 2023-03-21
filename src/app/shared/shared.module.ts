import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './components/chart/chart.component';
import { BearBullChartComponent } from './components/bear-bull-chart/bear-bull-chart.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LibraryModule } from './library/library.module';
import { RouterModule } from '@angular/router';
import { IndicesComponent } from './components/indices/indices.component';
import { TimeSliderComponent } from './components/time-slider/time-slider.component';
import { IntervalSelectorComponent } from './components/interval-selector/interval-selector.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { ReactiveFormsModule } from '@angular/forms';

const component = [
  ChartComponent,
  BearBullChartComponent,
  SidebarComponent,
  IndicesComponent,
  TimeSliderComponent,
  IntervalSelectorComponent,
  DatePickerComponent
]

@NgModule({
  declarations: [
    ...component
  ],
  imports: [
    CommonModule,
    LibraryModule,
    RouterModule
  ],
  exports: [
    ...component
  ]
})
export class SharedModule { }
