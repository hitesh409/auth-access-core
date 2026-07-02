import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSection } from './detail-section';

describe('DetailSection', () => {
  let component: DetailSection;
  let fixture: ComponentFixture<DetailSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailSection],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
