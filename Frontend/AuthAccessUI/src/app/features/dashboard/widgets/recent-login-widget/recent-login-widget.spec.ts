import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentLoginWidget } from './recent-login-widget';

describe('RecentLoginWidget', () => {
  let component: RecentLoginWidget;
  let fixture: ComponentFixture<RecentLoginWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentLoginWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentLoginWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
