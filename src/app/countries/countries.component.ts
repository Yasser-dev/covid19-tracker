import { Component, OnInit } from '@angular/core';
import { DataModel } from '../model/data.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  data: DataModel;
  country: string;
  countryiso2: string;
  countries: any[];

  barChartType = 'bar';
  barChartLabels: any[] = ['Confirmed', 'Recovered', 'Active', 'Deaths'];
  barChartData: any[] = [{ data: [0, 0, 0], label: 'Cases' }];

  constructor(private dataService: DataService) {
    this.data = new DataModel();
  }
  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries() {
    this.dataService.fetchCountries().subscribe((res: any[]) => {
      var countries = res['countries'];

      this.countries = countries.map((country) => [
        country['name'],
        country['iso2'],
      ]);
      console.log(this.countries);
    });
  }

  fetchDataByCountry(country: string) {
    this.dataService.fetchDataByCountry(country).subscribe((res: any[]) => {
      this.data.confirmed = res['confirmed']['value'];
      this.data.recovered = res['recovered']['value'];
      this.data.deaths = res['deaths']['value'];
      this.data.lastupdate = res['lastUpdate'];

      this.barChartData = [
        {
          data: [
            this.data.confirmed,
            this.data.recovered,
            this.data.confirmed - this.data.recovered,
            this.data.deaths,
          ],
          backgroundColor: [
            'rgba(33, 150, 243, 0.5)',
            'rgba(76, 175, 80, 0.5)',
            'rgba(255, 152, 0, 0.5)',
            'rgba(244, 67, 54, 0.5)',
          ],
          hoverBackgroundColor: [
            'rgba(33, 150, 243, 1)',
            'rgba(76, 175, 80, 1)',
            'rgba(255, 152, 0, 1)',
            'rgba(244, 67, 54,1)',
          ],
          label: `Data for ${this.country} on ${
            this.data.lastupdate.split('T')[0]
          }`,
        },
      ];
    });
  }
  countryChanged(value: string) {
    this.country = value[0];
    this.countryiso2 = value[1].toLowerCase();
    this.fetchDataByCountry(value[0]);
  }
}
