import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationOverlay } from './navigation-overlay';

describe('NavigationOverlay', () => {
  let component: NavigationOverlay;
  let fixture: ComponentFixture<NavigationOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationOverlay],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationOverlay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
