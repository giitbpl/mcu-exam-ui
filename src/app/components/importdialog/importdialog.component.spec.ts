import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportdialogComponent } from './importdialog.component';

describe('ImportdialogComponent', () => {
  let component: ImportdialogComponent;
  let fixture: ComponentFixture<ImportdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
