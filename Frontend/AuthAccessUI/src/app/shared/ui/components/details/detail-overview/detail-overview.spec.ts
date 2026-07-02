import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOverview } from './detail-overview';

describe('DetailOverview', () => {
  let component: DetailOverview;
  let fixture: ComponentFixture<DetailOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
