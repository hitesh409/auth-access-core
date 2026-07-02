import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridBulkActions } from './grid-bulk-actions';

describe('GridBulkActions', () => {
  let component: GridBulkActions;
  let fixture: ComponentFixture<GridBulkActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridBulkActions],
    }).compileComponents();

    fixture = TestBed.createComponent(GridBulkActions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
