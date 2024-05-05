import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepthSelectorComponent } from './depth-selector.component';

describe('DepthSelectorComponent', () => {
  let component: DepthSelectorComponent;
  let fixture: ComponentFixture<DepthSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepthSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepthSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
