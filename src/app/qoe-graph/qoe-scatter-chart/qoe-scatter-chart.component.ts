import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { ChartDataSets, ChartType, ChartOptions, ChartPoint} from 'chart.js';
import { Label } from 'ng2-charts';

let posData = [];
@Component({
  selector: 'app-qoe-scatter-chart',
  templateUrl: './qoe-scatter-chart.component.html',
  styleUrls: ['./qoe-scatter-chart.component.css']
})

export class QoeScatterChartComponent implements OnInit {

  Qoes:any = [];

// scatter
  public qoeScatterChartOptions: ChartOptions = {
    responsive: true,
  };
  public qoeScatterChartLabels: Label[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public qoeScatterChartData: ChartDataSets[] = [  
    {
      data: [],
      label: 'Series A',
      pointRadius: 5,
    },
  ];
  public qoeScatterChartType: ChartType = 'scatter';

constructor(private apiService: ApiService) { }

	ngOnInit() {
		this.apiService.refreshNeeded$
			.subscribe(() => {
				this.getAllQoes();
			}); 
		this.getAllQoes();
	}

  private getAllQoes(){
    this.apiService.getLatLonQoes().subscribe((data) => {
  	 	this.Qoes = data;
  	 	this.qoeScatterChartData[0].data = this.Qoes.map(function(element){
			return {x: parseInt(element['viewLon']), y: parseInt(element['viewLat'])}
		});
	});  
  }






  // events
  /*public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }*/
}
