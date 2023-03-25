import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenInterestComponent } from './open-interest.component';

describe('OpenInterestComponent', () => {
  let component: OpenInterestComponent;
  let fixture: ComponentFixture<OpenInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenInterestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
