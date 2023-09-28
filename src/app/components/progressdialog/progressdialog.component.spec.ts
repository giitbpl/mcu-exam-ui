import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressdialogComponent } from './progressdialog.component';

describe('ProgressdialogComponent', () => {
  let component: ProgressdialogComponent;
  let fixture: ComponentFixture<ProgressdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
