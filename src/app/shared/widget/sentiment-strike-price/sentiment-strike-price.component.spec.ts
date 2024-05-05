import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentStrikePriceComponent } from './sentiment-strike-price.component';

describe('SentimentStrikePriceComponent', () => {
  let component: SentimentStrikePriceComponent;
  let fixture: ComponentFixture<SentimentStrikePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentimentStrikePriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentimentStrikePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
