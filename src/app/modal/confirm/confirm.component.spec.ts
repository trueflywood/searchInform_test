import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmModal } from './confirm.component';

describe('ConfirmModal', () => {
  let component: ConfirmModal;
  let fixture: ComponentFixture<ConfirmModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
