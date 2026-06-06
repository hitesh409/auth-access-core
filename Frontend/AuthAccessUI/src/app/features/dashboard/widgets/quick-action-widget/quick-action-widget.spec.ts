import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickActionWidget } from './quick-action-widget';

describe('QuickActionWidget', () => {
  let component: QuickActionWidget;
  let fixture: ComponentFixture<QuickActionWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickActionWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(QuickActionWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
