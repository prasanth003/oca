import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankRatioComponent } from './bank-ratio.component';

describe('BankRatioComponent', () => {
  let component: BankRatioComponent;
  let fixture: ComponentFixture<BankRatioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankRatioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
