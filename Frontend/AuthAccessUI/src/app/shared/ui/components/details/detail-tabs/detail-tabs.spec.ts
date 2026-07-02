import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTabs } from './detail-tabs';

describe('DetailTabs', () => {
  let component: DetailTabs;
  let fixture: ComponentFixture<DetailTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailTabs],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailTabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
