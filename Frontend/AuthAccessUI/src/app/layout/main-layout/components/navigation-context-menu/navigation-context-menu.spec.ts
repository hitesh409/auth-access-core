import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationContextMenu } from './navigation-context-menu';

describe('NavigationContextMenu', () => {
  let component: NavigationContextMenu;
  let fixture: ComponentFixture<NavigationContextMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationContextMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationContextMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
