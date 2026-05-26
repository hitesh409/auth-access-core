import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceActivity } from './device-activity';

describe('DeviceActivity', () => {
  let component: DeviceActivity;
  let fixture: ComponentFixture<DeviceActivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceActivity],
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceActivity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
