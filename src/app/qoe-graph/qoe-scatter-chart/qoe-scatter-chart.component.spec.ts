import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QoeScatterChartComponent } from './qoe-scatter-chart.component';

describe('QoeScatterChartComponent', () => {
  let component: QoeScatterChartComponent;
  let fixture: ComponentFixture<QoeScatterChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QoeScatterChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QoeScatterChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
