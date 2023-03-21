import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BearBullChartComponent } from './bear-bull-chart.component';

describe('BearBullChartComponent', () => {
  let component: BearBullChartComponent;
  let fixture: ComponentFixture<BearBullChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BearBullChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BearBullChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
