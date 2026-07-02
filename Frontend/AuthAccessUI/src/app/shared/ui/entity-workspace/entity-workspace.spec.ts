import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityWorkspace } from './entity-workspace';

describe('EntityWorkspace', () => {
  let component: EntityWorkspace;
  let fixture: ComponentFixture<EntityWorkspace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityWorkspace],
    }).compileComponents();

    fixture = TestBed.createComponent(EntityWorkspace);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
