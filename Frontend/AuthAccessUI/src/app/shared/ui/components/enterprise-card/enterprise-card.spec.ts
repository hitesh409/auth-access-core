import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseCard } from './enterprise-card';

describe('EnterpriseCard', () => {
  let component: EnterpriseCard;
  let fixture: ComponentFixture<EnterpriseCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterpriseCard],
    }).compileComponents();

    fixture = TestBed.createComponent(EnterpriseCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
