import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWidgetShell } from './dashboard-widget-shell';

describe('DashboardWidgetShell', () => {
  let component: DashboardWidgetShell;
  let fixture: ComponentFixture<DashboardWidgetShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardWidgetShell],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardWidgetShell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
