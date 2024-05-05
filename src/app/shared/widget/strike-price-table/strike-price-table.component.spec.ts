import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrikePriceTableComponent } from './strike-price-table.component';

describe('StrikePriceTableComponent', () => {
  let component: StrikePriceTableComponent;
  let fixture: ComponentFixture<StrikePriceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrikePriceTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrikePriceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
