import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRemarksDialogComponent } from './update-remarks-dialog.component';

describe('UpdateRemarksDialogComponent', () => {
  let component: UpdateRemarksDialogComponent;
  let fixture: ComponentFixture<UpdateRemarksDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRemarksDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRemarksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
