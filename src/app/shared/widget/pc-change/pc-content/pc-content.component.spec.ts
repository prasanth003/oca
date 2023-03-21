import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcContentComponent } from './pc-content.component';

describe('PcContentComponent', () => {
  let component: PcContentComponent;
  let fixture: ComponentFixture<PcContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PcContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
