import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFieldList } from './detail-field-list';

describe('DetailFieldList', () => {
  let component: DetailFieldList;
  let fixture: ComponentFixture<DetailFieldList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailFieldList],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailFieldList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
