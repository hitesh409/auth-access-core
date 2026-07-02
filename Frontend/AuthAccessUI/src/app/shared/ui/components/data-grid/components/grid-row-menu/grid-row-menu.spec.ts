import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridRowMenu } from './grid-row-menu';

describe('GridRowMenu', () => {
  let component: GridRowMenu;
  let fixture: ComponentFixture<GridRowMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridRowMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(GridRowMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
