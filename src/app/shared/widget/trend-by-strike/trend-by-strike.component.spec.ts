import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendByStrikeComponent } from './trend-by-strike.component';

describe('TrendByStrikeComponent', () => {
  let component: TrendByStrikeComponent;
  let fixture: ComponentFixture<TrendByStrikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendByStrikeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendByStrikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
