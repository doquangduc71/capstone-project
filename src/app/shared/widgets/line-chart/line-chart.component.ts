import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { Dashboard } from 'src/app/model/dashboard';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor() { }
  chartOptions:{};
  currentYear:number;
  dashboard:Dashboard;
  Highcharts = Highcharts;
  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.dashboard=JSON.parse(localStorage.getItem('dashboard') || '{}');
    
    
    this.chartOptions = {
        
      title: {
          text: `Số Tiền Thu Được Trong Năm ${this.currentYear}`
      },
      
     
  
      yAxis: {
          title: {
              text: 'Số Tiền'
          }
      },
  
      xAxis: {
        //   accessibility: {
        //     rangeDescription: 'Range: 2010 to 2017'
        //   },
          categories: ['Thg1', 'Thg2', 'Thg3', 'Thg4', 'Thg5', 'Thg6', 'Thg7', 'Thg8', 'Thg9', 'Thg10', 'Thg11', 'Thg12'],
      },
  
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
      },
  
    //   plotOptions: {
    //       series: {
    //           label: {
    //               connectorAllowed: false
    //           },
    //           pointStart: 2010
    //       }
    //   },
      credits:{
        enable:false
      },
      exporting:{
        enable:true
      },
      series: [{
          name: this.currentYear,
          data: [this.dashboard.totalAmountJan, this.dashboard.totalAmountFeb, this.dashboard.totalAmountMar, this.dashboard.totalAmountApr, this.dashboard.totalAmountMay, this.dashboard.totalAmountJune, this.dashboard.totalAmountJuly, this.dashboard.totalAmountAug,this.dashboard.totalAmountSep,this.dashboard.totalAmountOct,this.dashboard.totalAmountNov,this.dashboard.totalAmountDec]
      }],
      
      responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              },
              chartOptions: {
                  legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom'
                  }
              }
          }]
      }
  
  }
  HC_exporting(Highcharts);
  setTimeout(()=>{
      window.dispatchEvent(new Event('resize'));
  },100);
  }

}
