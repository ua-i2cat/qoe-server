import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QoeLineChartComponent } from './qoe-line-chart.component';

describe('QoeLineChartComponent', () => {
  let component: QoeLineChartComponent;
  let fixture: ComponentFixture<QoeLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QoeLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QoeLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
