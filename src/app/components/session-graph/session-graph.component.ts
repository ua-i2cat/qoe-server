import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-session-graph',
  templateUrl: './session-graph.component.html',
  styleUrls: ['./session-graph.component.css']
})
export class SessionGraphComponent implements OnInit, OnDestroy {

  /**
 * Interval to update the chart
 * @var {any} intervalUpdate
 */
 private intervalUpdate: any = null;

  lastData: any [];
  lastLabels: any [];
	id: string;
  labelIndex: number;
  private socket;

	public qoeLineChartData: ChartDataSets[] = [{
    data: [], 
    pointRadius: 3, 
    label: 'x', 
    yAxisID: 'y-axis-1',
    fill: false
  }];

	public qoeLineChartLabels: Label[] = [];
 	public qoeLineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
  			ticks: {
  				autoSkip: true,
  				maxTicksLimit: 10
  			},
  			scaleLabel: {
          	display: true,
          	labelString: 'Time'
       	}
  		}],
      yAxes: [
      {
        id: 'y-axis-1',
        position: 'left',
          ticks: {
				    stepSize: 10000,
				    beginAtZero: true
			    },
			  scaleLabel: {
        	display: true,
        	labelString: 'Average Throughput [bps]'
       	}
      }/*,
      {
        id: 'y-axis-2',
        position: 'right',
        gridLines: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          stepSize: 5,
          fontColor: 'red',
          beginAtZero: true
        }
      }*/
    ]
  },
	elements: {
		point: {
			pointStyle: 'circle'
			/*
 				'circle',
				'triangle',
				'rect',
				'rectRounded',
				'rectRot',
				'cross',
				'crossRot',
				'star',
				'line',
				'dash'
			 */
		}
	},
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public qoeLineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public qoeLineChartLegend = true;
  public qoeLineChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;


  constructor(private route: ActivatedRoute, private apiService: ApiService) { 
    this.socket = io.connect('http://localhost:4000');
  }

  /**
 * On component initialization
 * @function ngOnInit
 * @return {void}
 */
  ngOnInit(): void {
    this.labelIndex = 0;
    /*this.intervalUpdate = setInterval(function(){
     
    }.bind(this), 500);*/
     this.route.queryParams.subscribe(params => {
        this.id = params.id;
        this.populateChart(this.id);      
        this.newSessionData(this.id);  
        this.chart.update();
      });
  }

  /**
 * On component destroy
 * @function ngOnDestroy
 * @return {void}
 */
  ngOnDestroy(): void {
    clearInterval(this.intervalUpdate);
  }


  private populateChart(id){
    this.apiService.getSession(id).subscribe((data) =>{
      for(let i = 0; i< data.length; i++){
        this.qoeLineChartData[0].data.push(data[i].averageThroughput);

        var date = new Date(data[i].date * 1000);
        // Hours part from the timestamp
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = minutes.substr(-2) + ':' + seconds.substr(-2);
        this.qoeLineChartLabels.push(formattedTime);
      }
    });
  }

	private newSessionData(id){
    this.socket.on(this.id, event => {
      let chartTime: any = new Date();
      //chartTime = chartTime.getHours() + ':' + ((chartTime.getMinutes() < 10) ? '0' + chartTime.getMinutes() : chartTime.getMinutes()) + ':' + ((chartTime.getSeconds() < 10) ? '0' + chartTime.getSeconds() : chartTime.getSeconds());
      chartTime = ((chartTime.getMinutes() < 10) ? '0' + chartTime.getMinutes() : chartTime.getMinutes()) + ':' + ((chartTime.getSeconds() < 10) ? '0' + chartTime.getSeconds() : chartTime.getSeconds());
      if(this.qoeLineChartLabels.length > 49) {
        this.qoeLineChartLabels.shift();
        this.qoeLineChartData[0].data.shift();
      } 
      if(this.labelIndex > 2){
        this.qoeLineChartLabels.push(chartTime);
        this.labelIndex = 0;
      }
      this.qoeLineChartData[0].data.push(event.averageThroughput);

      var date = new Date(event.date * 1000);
      // Hours part from the timestamp
      var hours = date.getHours();
      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();
      // Seconds part from the timestamp
      var seconds = "0" + date.getSeconds();

      // Will display time in 10:30:23 format
      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

      //console.log(formattedTime);
      //console.log(event.mediaTime);

      this.labelIndex++;
    });
	}
}