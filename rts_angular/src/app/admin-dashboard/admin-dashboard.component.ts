import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  single: any[];
  multi: any[];
  totalSubmissionByTeam: any[];
  date = new Date();

  view: any[] = undefined;
  showDataLabel = true;
  show = true;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = 'Recruiters';
  showYAxisLabel = true;
  yAxisLabel = 'Submissions';

  colorScheme = {
    domain: ['#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed']
  };

  colorSchemeMulti = {
    domain: ['#0386a4', '#A10A28', '#5AA454']
  };
  constructor() { }

  ngOnInit() {
    this.single = [
      {
        'name': 'Sugan',
        'value': 4
      },
      {
        'name': 'Aji',
        'value': 3
      },
      {
        'name': 'Sudhakar',
        'value': 2
      },
      {
        'name': 'Dinesh',
        'value': 4
      },
      {
        'name': 'Sundar',
        'value': 1
      },
      {
        'name': 'Karthick',
        'value': 3
      },
      {
        'name': 'Amudhan',
        'value': 5
      },
      {
        'name': 'Pavithran',
        'value': 6
      },
    ];

    this.multi = [
      {
        'name': 'Karthic',
        'series': [
          {
            'name': 'Submitted',
            'value': 4
          },
          {
            'name': 'Rejected',
            'value': 2
          },
          {
            'name': 'Closed',
            'value': 1
          }
        ]
      }, {
        'name': 'Dinesh',
        'series': [
          {
            'name': 'Submitted',
            'value': 6
          },
          {
            'name': 'Rejected',
            'value': 2
          },
          {
            'name': 'Closed',
            'value': 2
          }
        ]
      },
      {
        'name': 'Raj Mohan',
        'series': [
          {
            'name': 'Submitted',
            'value': 18
          },
          {
            'name': 'Rejected',
            'value': 1
          },
          {
            'name': 'Closed',
            'value': 10
          }
        ]
      },
      {
        'name': 'Nitin',
        'series': [
          {
            'name': 'Submitted',
            'value': 15
          },
          {
            'name': 'Rejected',
            'value': 4
          },
          {
            'name': 'Closed',
            'value': 8
          }
        ]
      }
    ];

    this.totalSubmissionByTeam = [
      {
        'name': 'TCS',
        'value': 8
      },
      {
        'name': 'Virtusa',
        'value': 12
      }
    ];


  }

  onSelect(event) {
    console.log(event);
  }
}
