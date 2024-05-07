import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LibraryModule } from './library/library.module';
import { RouterModule } from '@angular/router';
import { IndicesComponent } from './components/indices/indices.component';
import { TimeSliderComponent } from './components/time-slider/time-slider.component';
import { IntervalSelectorComponent } from './components/interval-selector/interval-selector.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CompactDatePipe } from './pipe/compact-date.pipe';
import { NumberFormatPipe } from './pipe/number-format.pipe';
import { NoDataComponent } from './components/no-data/no-data.component';
import { DepthSelectorComponent } from './components/depth-selector/depth-selector.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { GaugeChartComponent } from './components/gauge-chart/gauge-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';

const component = [
  SidebarComponent,
  IndicesComponent,
  TimeSliderComponent,
  IntervalSelectorComponent,
  DatePickerComponent,
  NavbarComponent,
  NoDataComponent,
  DepthSelectorComponent,
  ProgressBarComponent,
  GaugeChartComponent
]

const pipe = [
  CompactDatePipe,
  NumberFormatPipe
]

@NgModule({
  declarations: [
    ...component,
    ...pipe
  ],
  imports: [
    CommonModule,
    LibraryModule,
    RouterModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  exports: [
    ...component,
    ...pipe
  ]
})
export class SharedModule { }
