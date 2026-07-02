import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridToolbar } from './grid-toolbar';

describe('GridToolbar', () => {
  let component: GridToolbar;
  let fixture: ComponentFixture<GridToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridToolbar],
    }).compileComponents();

    fixture = TestBed.createComponent(GridToolbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
