import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QoeCreateComponent } from './qoe-create.component';

describe('QoeCreateComponent', () => {
  let component: QoeCreateComponent;
  let fixture: ComponentFixture<QoeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QoeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QoeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
