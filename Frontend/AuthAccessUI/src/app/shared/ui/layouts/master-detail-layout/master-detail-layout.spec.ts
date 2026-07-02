import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDetailLayout } from './master-detail-layout';

describe('MasterDetailLayout', () => {
  let component: MasterDetailLayout;
  let fixture: ComponentFixture<MasterDetailLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterDetailLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(MasterDetailLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
