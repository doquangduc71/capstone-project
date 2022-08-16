import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { Dashboard } from 'src/app/model/dashboard';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() { }
  dashboard:Dashboard;
  chartOptions:{};
  Highcharts = Highcharts;
  ngOnInit(): void {
    this.dashboard=JSON.parse(sessionStorage.getItem('dashboard') || '{}');
    this.chartOptions={
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: 'Trạng Thái Các Ca Khám'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
          point: {
              valueSuffix: '%'
          },
         
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: false
              },
              showInLegend: true
          }
      },credits:{
        enable:false
      },
      exporting:{
        enable:true
      },
      
      series: [{
          name: 'Percent',
          colorByPoint: true,
          data: [{
              name: 'Đã hủy',
              y: this.dashboard.numberOfCancelAppointment,
              color:"#f50202"
              
          }, {
              name: 'Đã thanh toán',
              y: this.dashboard.numberOfPaidAppointment,
              color:"#23f20c"
          }, {
              name: 'Chưa thanh toán',
              y: this.dashboard.numberOfPaidAppointment,
              color:"#f2f20c"
          },]
      }],
      
  }
  HC_exporting(Highcharts);
  setTimeout(()=>{
      window.dispatchEvent(new Event('resize'));
  },100);
  }

}
