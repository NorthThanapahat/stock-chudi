import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogwaitcloseComponent } from './dialogwaitclose.component';

describe('DialogwaitcloseComponent', () => {
  let component: DialogwaitcloseComponent;
  let fixture: ComponentFixture<DialogwaitcloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogwaitcloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogwaitcloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
