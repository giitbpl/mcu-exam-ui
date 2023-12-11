import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrcAllSemisterReportComponent } from './trc-all-semister-report.component';

describe('TrcAllSemisterReportComponent', () => {
  let component: TrcAllSemisterReportComponent;
  let fixture: ComponentFixture<TrcAllSemisterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrcAllSemisterReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrcAllSemisterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
