import { Component, OnInit, ViewChild } from '@angular/core';
import { DataServiceService } from '../Services/data-service.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.css']
})
export class DataVisualizationComponent implements OnInit {
  displayData = false;
  map: Map<any, any> = new Map;
  results: any[];
  profiles: any[] = [];
  keys: Set<string> = new Set;
  displayedColumns = ['time'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private readonly dataServ: DataServiceService) {
    this.dataServ.listResults$.subscribe(data => {
      this.results = data;
      this.profiles = [];
      this.results.forEach(row => {

        Object.keys(row).forEach(key => {
          this.keys.add(key);
        })

        let temp: any = {};
        this.keys.forEach(key => {
          temp[key] = row[key];

        })
        // this.dataSource.data.push(temp);

      })

      Array.from(this.keys).sort((a, b) => b.localeCompare(a)).forEach(key => {
        let temp: any = {};
        if (key == 'symbol') {
          return;
        }
        temp.source = key;
        this.results.forEach(row => {
          temp[row.symbol] = row[key];

        })
        this.map.set(temp.source, temp);
        this.dataSource.data.push(temp);
      })

      this.results.forEach(row => {
        this.profiles.push(row.symbol);
      })

      this.profiles.forEach(profile => {
        this.displayedColumns.push(profile);
      })
      this.displayData = true;

      this.dataSource.data = this.dataSource.data.sort();

    })


  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    this.dataServ.fetchData()
  }

  getHighightedClass(cellValue: string, source: any, profile: any): string {
    let crossBreak = false;
    if (cellValue) {
      let values: string[] = cellValue.split(',');
      if (values.length > 1) {
        let temp = this.map.get(source.source);
        let currValue = temp[profile].split(',')[2]
        let time = source.source.trim();
        let pieces = time.split(':')
        let nextTime = Number(pieces[1]) + 1;
        let previousTemp = this.map.get(pieces[0] + ':' + nextTime.toString());
        if (previousTemp) {
          let previousProf = previousTemp[profile];
          if (previousProf) {

            let preValue = previousProf.split(',')[2]
            let finalValue: number = Number(preValue) - Number(currValue)
            if (finalValue > 0.3) {
              crossBreak = true;
            }

          }

        }

        if (Number(values[0].trim()) > Number(values[1].trim())) {
          if (crossBreak) {
            return 'greenClass_crossBreak'
          } else {
            return 'greenClass'
          }

        } else {
          if (crossBreak) {
            return 'blueClass_crossBreak'
          } else {
            return 'blueClass'
          }

        }
      } else {
        return 'blueClass'
      }
    } else {
      return 'blueClass'
    }



  }

}
