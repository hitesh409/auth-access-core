import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenActivity } from './token-activity';

describe('TokenActivity', () => {
  let component: TokenActivity;
  let fixture: ComponentFixture<TokenActivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenActivity],
    }).compileComponents();

    fixture = TestBed.createComponent(TokenActivity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
