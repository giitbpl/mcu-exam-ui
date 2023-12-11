import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrcsemisterComponent } from './trcsemister.component';

describe('TrcsemisterComponent', () => {
  let component: TrcsemisterComponent;
  let fixture: ComponentFixture<TrcsemisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrcsemisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrcsemisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
