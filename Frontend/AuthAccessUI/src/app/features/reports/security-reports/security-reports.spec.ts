import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityReports } from './security-reports';

describe('SecurityReports', () => {
  let component: SecurityReports;
  let fixture: ComponentFixture<SecurityReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityReports],
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityReports);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
