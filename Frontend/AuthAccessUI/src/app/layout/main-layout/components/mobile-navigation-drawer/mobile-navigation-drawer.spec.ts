import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNavigationDrawer } from './mobile-navigation-drawer';

describe('MobileNavigationDrawer', () => {
  let component: MobileNavigationDrawer;
  let fixture: ComponentFixture<MobileNavigationDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileNavigationDrawer],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileNavigationDrawer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
