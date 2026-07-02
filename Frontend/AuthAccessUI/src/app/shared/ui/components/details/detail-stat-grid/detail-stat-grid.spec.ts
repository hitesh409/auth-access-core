import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStatGrid } from './detail-stat-grid';

describe('DetailStatGrid', () => {
  let component: DetailStatGrid;
  let fixture: ComponentFixture<DetailStatGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailStatGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailStatGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
