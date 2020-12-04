import { DataModel } from '../model/data.model';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data: DataModel;
  globalData = [];
  chartData: any[] = [];
  lineChartData: any[] = [
    {
      data: [65, 64, 33, 44],
      label: 'Temp label',
    },
  ];
  lineChartType = 'line';
  lineChartLabels: any[] = ['Label01', 'Label01', 'Label03'];
  constructor(private dataService: DataService) {
    this.data = new DataModel();
  }

  ngOnInit(): void {
    console.log('oninit');
    this.fetchData();
    this.fetchDailyData();
  }

  fetchData() {
    this.dataService.fetchData().subscribe((res: any[]) => {
      this.data.confirmed = res['confirmed']['value'];
      this.data.recovered = res['recovered']['value'];
      this.data.deaths = res['deaths']['value'];
      this.data.lastupdate = res['lastUpdate'];
    });
  }

  fetchDailyData() {
    this.dataService.fetchDailyData().subscribe((res: any[]) => {
      this.lineChartLabels = res.map((date) => date['reportDate']);
      var TotalData = res.map((confirmed) => confirmed['totalConfirmed']);
      var deaths = res.map((deaths) => deaths['deaths']['total']);

      this.lineChartData = [
        {
          data: TotalData,
          label: 'Confirmed Cases',
        },
        {
          data: deaths,
          label: 'Deaths',
        },
      ];
    });
  }
}
