import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentAuditWidget } from './recent-audit-widget';

describe('RecentAuditWidget', () => {
  let component: RecentAuditWidget;
  let fixture: ComponentFixture<RecentAuditWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentAuditWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentAuditWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
