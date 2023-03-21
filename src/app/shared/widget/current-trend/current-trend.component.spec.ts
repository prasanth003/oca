import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTrendComponent } from './current-trend.component';

describe('CurrentTrendComponent', () => {
  let component: CurrentTrendComponent;
  let fixture: ComponentFixture<CurrentTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentTrendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
