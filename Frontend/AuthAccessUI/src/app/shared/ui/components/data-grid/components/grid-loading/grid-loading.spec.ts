import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridLoading } from './grid-loading';

describe('GridLoading', () => {
  let component: GridLoading;
  let fixture: ComponentFixture<GridLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridLoading],
    }).compileComponents();

    fixture = TestBed.createComponent(GridLoading);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
