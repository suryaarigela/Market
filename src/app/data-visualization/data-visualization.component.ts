import { Component, OnInit, ViewChild } from '@angular/core';
import { DataServiceService } from '../Services/data-service.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.css']
})
export class DataVisualizationComponent implements OnInit {

  results: any[];
  profiles: any[] = [];
  keys: Set<string> = new Set;
  displayedColumns = ['time', 'CRM', 'ADSK'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  constructor(private readonly dataServ: DataServiceService) {
    this.dataServ.listResults$.subscribe(data => {
      this.results = data;
      console.log('initial....', data)
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
        this.dataSource.data.push(temp);
      })

      console.log('final data....', this.dataSource.data);
      this.results.forEach(row => {
        this.profiles.push(row.symbol);
      })




      this.dataSource.data = this.dataSource.data.sort();
      console.log('setting data to table....')
    })


  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataServ.fetchData()
  }

}
