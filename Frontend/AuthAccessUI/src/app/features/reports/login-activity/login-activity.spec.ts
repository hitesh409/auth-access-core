import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginActivity } from './login-activity';

describe('LoginActivity', () => {
  let component: LoginActivity;
  let fixture: ComponentFixture<LoginActivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginActivity],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginActivity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
