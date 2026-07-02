import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridColumnPicker } from './grid-column-picker';

describe('GridColumnPicker', () => {
  let component: GridColumnPicker;
  let fixture: ComponentFixture<GridColumnPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridColumnPicker],
    }).compileComponents();

    fixture = TestBed.createComponent(GridColumnPicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
