import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcChangeComponent } from './pc-change.component';

describe('PcChangeComponent', () => {
  let component: PcChangeComponent;
  let fixture: ComponentFixture<PcChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PcChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
