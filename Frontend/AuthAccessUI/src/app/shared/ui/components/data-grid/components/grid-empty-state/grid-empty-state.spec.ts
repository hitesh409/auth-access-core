import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridEmptyState } from './grid-empty-state';

describe('GridEmptyState', () => {
  let component: GridEmptyState;
  let fixture: ComponentFixture<GridEmptyState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridEmptyState],
    }).compileComponents();

    fixture = TestBed.createComponent(GridEmptyState);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
